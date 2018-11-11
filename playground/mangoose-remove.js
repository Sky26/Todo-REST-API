const { Todo } = require("../server/models/todo");

// Todo.remove({}) // can't pass an empty argument
Todo.remove({}).then(result => {
	console.log(result);
});

// Todo.findOneAndRemove()
Todo.findOneAndRemove({ _id: "5b737332f4126a4b84581c82" }).then(todo => {
	console.log(todo);
});

// Todo.findByIdAndRemove()
Todo.findByIdAndRemove("5b737332f4126a4b84581c82").then(todo => {
	console.log(todo);
});
