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

		// deleteMany (delete all)
		db.collection("Todos")
			.deleteMany({ text: "Eat lunch" })
			.then(result => {
				console.log(result);
			});

		// deleteOne (delete only the first element)
		db.collection("Todos")
			.deleteOne({ text: "Eat lunch" })
			.then(result => {
				console.log(result);
			});

		// findOneAndDelete (search and delete + return what is deleted)
		db.collection("Todos")
			.findOneAndDelete({ completed: false })
			.then(result => {
				console.log(result);
			});

		db.collection("Users").deleteMany({ name: "andrew" });

		db.collection("Users")
			.findOneAndDelete({
				_id: new ObjectID("5b64af69d2f35a1b30aaddcb")
			})
			.then(results => {
				console.log(JSON.stringify(results, undefined, 4));
			});

		client.close();
	}
);
