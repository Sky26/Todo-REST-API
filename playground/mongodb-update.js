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

		// findOneAndUpdate (will return the updated document)
		db.collection("Users")
			.findOneAndUpdate(
				{
					_id: new ObjectID("5b64af69d2f35a1b30aaddcb")
				},
				{
					$set: {
						completed: true
					}
				},
				{
					returnOriginal: false
				}
			)
			.then(result => {
				console.log(result);
			});

		db.collection("Users")
			.findOneAndUpdate(
				{
					_id: new ObjectID("5b64af69d2f35a1b30aaddcb")
				},
				{
					$set: {
						name: "andrew"
					},
					$inc: {
						age: 1
					}
				},
				{
					returnOriginal: false
				}
			)
			.then(result => {
				console.log(result);
			});

		client.close();
	}
);
