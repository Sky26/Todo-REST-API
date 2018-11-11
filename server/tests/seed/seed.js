const { ObjectID } = require("mongodb");
const jwt = require("jsonwebtoken");

const { Todo } = require("../../models/todo");
const { User } = require("../../models/user");

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
	{
		_id: userOneId,
		email: "user01@example.com",
		password: "userOnePass",
		tokens: [
			{
				access: "auth",
				token: jwt
					.sign(
						{ _id: userOneId, access: "auth" },
						process.env.JWT_SECRET
					)
					.toString()
			}
		]
	},
	{
		_id: userTwoId,
		email: "user02@example.com",
		password: "userTwoPass",
		tokens: [
			{
				access: "auth",
				token: jwt
					.sign(
						{ _id: userTwoId, access: "auth" },
						process.env.JWT_SECRET
					)
					.toString()
			}
		]
	}
];

const todos = [
	{
		_id: new ObjectID(),
		text: "First test todo",
		_creator: userOneId
	},
	{
		_id: new ObjectID(),
		text: "Second test todo",
		completed: true,
		completedAt: 333,
		_creator: userTwoId
	}
];

const populateTodos = done => {
	Todo.remove({})
		.then(() => {
			return Todo.insertMany(todos);
		})
		.then(() => done());
};

const populateUsers = done => {
	User.remove({})
		.then(() => {
			// by calling save() we are calling the middleware because we are having a pre hook on user.js for save()
			var userOne = new User(users[0]).save();
			var userTwo = new User(users[1]).save();

			// we need to wait for both promise (userOne and userTwo) to resolve
			// so we use Promise.all which take an array of promise
			// the then callback of Promise will not be executed ONLY when all the promises RESOLVE
			return Promise.all([userOne, userTwo]);
		})
		.then(() => done());
};

module.exports = { todos, populateTodos, users, populateUsers };
