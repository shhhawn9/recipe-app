const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
	title: String,
	ingredients: [String],
	steps: [String],
	completionTime: Number,
	creator: String,
});

recipeSchema.methods.speak = function speak() {
	console.log(`this is a recipe ${this.name}`);
};

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
