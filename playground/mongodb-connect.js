// const MongoClient = require("mongodb").MongoClient;
// object destructuring to load MongoClient and ObjectID at the same time
const { MongoClient, ObjectID } = require("mongodb");

/**
 * object destructuring example
 * var user = {name: "andrew", age: 25}
 * var {name} = user;
 * console.log(name); // return andrew
 */

var obj = new ObjectID();
console.log(obj);

MongoClient.connect(
	"mongodb://localhost:27017/TodoApp",
	{ useNewUrlParser: true },
	(err, client) => {
		if (err) {
			return console.log("Unable to connect to MongoDB server");
		}

		// Client returned
		var db = client.db("mytestingdb");

		console.log("Connected to MongoDB server");

		db.collection("Todos").insertOne(
			{
				text: "Something to do",
				completed: false
			},
			(err, result) => {
				if (err) {
					return console.log("Unable to insert todo", err);
				}

				// ops gonna store all the docs that been inserted
				console.log(JSON.stringify(result.ops, undefined, 4));
			}
		);

		db.collection("Users").insertOne(
			{
				name: "MyName",
				age: 20,
				location: "MyLocation"
			},
			(err, result) => {
				if (err) {
					return console.log("Unable to insert todo", err);
				}

				console.log(result.ops[0]._id.getTimestamp());
			}
		);

		client.close();
	}
);
