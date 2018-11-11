// const MongoClient = require("mongodb").MongoClient;
// object destructuring to load MongoClient and ObjectID at the same time
const { MongoClient, ObjectID } = require("mongodb");

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

		// find return a mongodb cursor, it's a pointer to the data
		// toArray, return a promise and give us the data in the shape or an array
		db.collection("Todos")
			// .find() will return all the data
			// .find({ completed: false }) will return the not completed task only
			.find({
				_id: new ObjectID("5b64af69d2f35a1b30aaddcb") // we need to create an ObjectID, because it's not a string
			})
			.toArray()
			.then(
				docs => {
					console.log("Todos");
					console.log(JSON.stringify(docs, undefined, 4));
				},
				err => {
					console.log("Unable to fetch todos", err);
				}
			);

		db.collection("Todos")
			.find()
			.count()
			.then(
				count => {
					console.log(`Todos count: ${count}`);
				},
				err => {
					console.log("Unable to fetch todos", err);
				}
			);

		db.collection("Users")
			.find({ name: "Andrew" })
			.toArray()
			.then(docs => {
				console.log(JSON.stringify(docs, undefined, 4));
			});

		client.close();
	}
);
