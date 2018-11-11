var mongoose = require("mongoose");

// active the built-in promise library
mongoose.Promise = global.Promise;
mongoose.connect(
	process.env.MONGODB_URI,
	{ useNewUrlParser: true }
);

/* mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost:27017/TodoApp",
	{ useNewUrlParser: true }
); */

module.exports = {
	mongoose
};
