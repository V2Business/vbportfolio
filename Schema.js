const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
	name: {
		type: String,
		required: true,
		maxLength: 50,
	},
	email: { type: String, required: true, unique: true },
	description: { type: String, required: true, maxLength: 200 },
	topics: [{ type: String }],
});

module.exports.Projects = mongoose.model("Project", ProjectSchema);
