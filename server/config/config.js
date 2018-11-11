var env = process.env.NODE_ENV || "development";

// env type: development, test, production
console.log("env:", env);

if (env === "development" || env === "test") {
	// the json file is parsed into a javascript object automatically
	var config = require("./config.json");
	var envConfig = config[env];

	// Object.keys take an object and get all the keys and return them as an array
	Object.keys(envConfig).forEach(key => {
		process.env[key] = envConfig[key];
	});
}

// The NODE_ENV in Heroku is by default set to production

/*
	if (env === "development") {
		process.env.PORT = 3000;
		process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp";
	} else if (env === "test") {
		process.env.PORT = 3000;
		process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest";
	} else if (env === "production") {
		process.env.PORT = 3000;
		process.env.MONGODB_URI = "";
	}
*/
