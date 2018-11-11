const { ObjectID } = require("mongodb");
const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/models/todo");
const { User } = require("../server/models/user");

var id = "5b737332f4126a4b84581c82";

if (!ObjectID.isValid(id)) {
	console.log("ID not valid");
}

// mangoose doesn't require an objectID, we just pass a string and it gonna be converted to an objectID
Todo.find({
	_id: id
}).then(todos => {
	console.log("Todos", todos);
});

// findOne: return the first document that match the query
Todo.findOne({
	_id: id
}).then(todo => {
	console.log("Todo", todo);
});

Todo.findById(id)
	.then(todo => {
		if (!todo) {
			return console.log("Id not found");
		}

		console.log("Todo by id", todo);
	})
	.catch(e => console.log(e));

User.findById("5b7596c510fba0c671ede85f").then(
	user => {
		if (!user) {
			return console.log("User not found");
		}

		console.log(JSON.stringify(user, undefined, 4));
	},
	e => console.log(e)
);
