const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

// Schemas
const { Projects } = require("./Schema");

const app = express();
const cors = require("cors"); // Import the cors package
require("dotenv").config();

app.use(express.json());
app.use(cors()); // Enable CORS

const connectDb = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connected to DB");
	} catch (error) {
		console.error("Error connecting to DB:", error);
	}
};

app.post("/dataSend", async (req, res) => {
	const { name, email, description, topics } = req.body;

	if (
		name !== null &&
		name !== undefined &&
		email !== undefined &&
		email !== null &&
		description !== null &&
		description !== undefined
	) {
		await connectDb();

		try {
			const newProject = new Projects({
				name: name,
				email: email,
				description: description,
				topics: [...topics],
			});

			const done = await newProject.save();
			console.log(done);
			res.status(200).json("done");
		} catch (e) {
			res.status(400).json("Email already in use");
		}
	} else {
		res.status(400).json("Can't leave fields empty");
	}
});

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
