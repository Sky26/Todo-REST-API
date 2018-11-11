const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

// mongoose schema (useful when we want to add methods to the schema)
// we replace var User = mongoose.model("User", { email:, password:, tokens:}) with this, to add methods
var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: "{VALUE} is not a valid email"
			/*
				Equivalent to the above
				validator: value => {
					return validator.isEmail(value)
				}
			*/
		}
	},

	password: {
		type: String,
		require: true,
		minlength: 1
	},

	// tokens is an array, it's a feature available with mangodb and not available in sql database like postgress
	tokens: [
		{
			access: {
				type: String,
				required: true
			},
			token: {
				type: String,
				required: true
			}
		}
	]
});

// override the method toJSON (determine what we send back when a mangoose model is converted into a json value)
// to return only some specific data
UserSchema.methods.toJSON = function() {
	var user = this;
	var userObject = user.toObject(); // take the mangoose variable (user) and converting it into a regular object where only the properties available on the document exist

	return _.pick(userObject, ["_id", "email"]);
};

// INSTANCE METHOD | method for the instance (for each user)
// We don't use arrow function because we want to use this
UserSchema.methods.generateAuthToken = function() {
	// called with individual document "user"
	var user = this;
	var access = "auth";
	var token = jwt
		.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET)
		.toString();

	// push to the array tokens
	user.tokens.push({
		access,
		token
	});

	// when we chain 2 return in a promise, we automatically return another promise
	// we return the promise instead of just token because we need to use it in server.js
	return user.save().then(() => {
		return token;
	});
};

// * statics is an object
// * everything added to statics turn into a model method
// * everything added to methods turn into an instance method
UserSchema.statics.findByToken = function(token) {
	// called with the model, this binding "User"
	var User = this;
	var decoded; // is undefined, not null

	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		return Promise.reject();

		/*
			return new Promise((resolve, reject) => {
				reject();
			});
		*/
	}

	return User.findOne({
		_id: decoded._id,
		"tokens.token": token,
		"tokens.access": "auth"
	});
};

UserSchema.statics.findByCredentials = function(email, password) {
	var User = this;

	return User.findOne({ email }).then(user => {
		if (!user) return Promise.reject();

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if (res) resolve(user);
				else reject();
			});
		});
	});
};

UserSchema.methods.removeToken = function(token) {
	// $pull is a mangodb operator, it lets you remove items from an array that match certain criteria
	var user = this;

	return user.update({
		$pull: {
			tokens: {
				token
			}
		}
	});
};

// middleware
UserSchema.pre("save", function(next) {
	var user = this;

	if (user.isModified("password")) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next(); // to complete the program
			});
		});
	} else {
		next(); // to complete the program
	}
});

// MODEL METHOD | User model (we can't add method to this model, but we can add methods to the schema)
var User = mongoose.model("User", UserSchema);

module.exports = { User };
