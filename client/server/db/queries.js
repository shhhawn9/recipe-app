const Recipe = require('./model');

const queries = {
	getAllRecipes: async function (filter) {
		const recipes = await Recipe.find(filter);
		return recipes;
	},
	addOneRecipe: async function (filter) {
		const newRecipe = await Recipe.create(filter);
		return newRecipe;
	},
	deleteOneRecipe: async function (filter) {
		const deleteRecipe = await Recipe.deleteOne(filter);
		return deleteRecipe;
	},
	updateOneRecipe: async function (filter) {
		const updatedRecipe = await Recipe.updateOne(filter);
		return updatedRecipe;
	},
	deleteAllRecipes: async function (filter) {
		const updatedRecipes = await Recipe.remove(filter);
		return updatedRecipes;
	},
	sortAllRecipes: async function (filter) {
		const sortedRecipes = await Recipe.sort({ title: '' });
		return sortedRecipes;
	},
};

module.exports = queries;
