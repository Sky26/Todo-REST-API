var mongoose = require("mongoose");

// Mongoose model of Todo
var Todo = mongoose.model("Todo", {
	text: {
		type: String, // even if we put a number of a boolean it will be accepted because mangoose do type casting
		required: true,
		minlength: 1,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	},
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
});

module.exports = { Todo };
