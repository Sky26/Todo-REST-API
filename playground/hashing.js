const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var password = "123abc";
// 10 = number of round
bcrypt.genSalt(10, (err, salt) => {
	bcrypt.hash(password, salt, (err, hash) => {
		console.log("hash", hash); // the hash contains the number of round + the salt built in, so no need to store the salt alone
	});
});

const hashedPassword = "kvhnjfvvndfjvdfnjdfj";

bcrypt.compare(password, hashedPassword, (err, res) => {
	console.log(res); // res == boolean
});

const message = "I am user number 3";
const hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

var data = {
	id: 4
};

var token = {
	data,
	hash: SHA256(JSON.stringify(data) + "somesecret").toString()
};

// HACKER:
token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

var resultHash = SHA256(JSON.stringify(token.data) + "somesecret").toString();

if (resultHash === token.hash) {
	console.log("Data was not changed");
} else {
	console.log("Data was changed. Do not trust!"); // we will detected a change of data, because the hacker doesn't have the salt (sometsecret)
}

/**
 * All this concept is called JSON WEB TOEKN (JWT)
 */
var data = {
	id: 10
};

var token = jwt.sign(data, "somesecret");
console.log(token);

var decoded = jwt.verify(token, "somesecret");
console.log("decoded", decoded);
