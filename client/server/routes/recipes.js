const express = require('express');
const router = express.Router();
const Recipe = require('../db/model');

// GET REQUESTS
// get test
router.get('/test', async (req, res, next) => {
	return res.send('respond with a resource');
});

// get all recipes and sort
router.get('/', async (req, res, next) => {
	const recipes = await Recipe.find({}).sort({ title: 'asc' });
	return res.setHeader('Content-Type', 'application/json').send(recipes);
});

// get one recipe
router.get('/:id', async (req, res, next) => {
	try {
		const getRecipe = await Recipe.findById(req.params.id).exec();
		if (!getRecipe) {
			return res.status(404).send({ mesasge: "recipe can't be found" });
		}
		const data = {
			steps: getRecipe.steps,
			creator: getRecipe.creator,
			completionTime: getRecipe.completionTime,
		};
		return res.setHeader('Content-Type', 'application/json').send(data);
	} catch (error) {
		return res.status(400).send({ message: error });
	}
});

// POST REQUESTS
// add new recipe
router.post('/', async (req, res, next) => {
	const newRecipe = new Recipe({
		title: req.body.title,
		ingredients: req.body.ingredients,
		steps: req.body.steps,
		completionTime: req.body.completionTime,
		creator: req.body.creator,
	});
	await Recipe.create(newRecipe);
	return res.setHeader('Content-Type', 'application/json').send(newRecipe);
});

// PUT REQUESTS
// edit
router.put('/:id', async (req, res, next) => {
	try {
		var editedRecipe = req.body;
		await Recipe.findByIdAndUpdate(req.params.id, editedRecipe);
		const updatedRecipe = await Recipe.findById(req.params.id);
		updatedRecipe._id = req.params.id;
		return res.setHeader('Content-Type', 'application/json').send(updatedRecipe);
	} catch {
		return res.status(400).send({ message: 'error!' });
	}
});

// sort
// router.put('/', async (req, res, next) => {
// 	const sortedRecipes = await Recipe.sort({ title: 'asc' });
// 	return res.status(200).setHeader('Content-Type', 'application/json').send(sortedRecipes);
// });

// DELETE REQUESTS
// delete all
router.delete('/', async (req, res, next) => {
	await Recipe.deleteMany({});
	return res.setHeader('Content-Type', 'application/json').send([]);
});

//delete single recipe
router.delete('/:id', async (req, res, next) => {
	try {
		const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
		if (!deletedRecipe) {
			return res.status(404).send({ message: 'recipe not found' });
		}
		return res.setHeader('Content-Type', 'application/json').send({ id: req.params.id });
	} catch {
		return res.status(400).send({ message: 'error' });
	}
});

// const sortRecipes = () => {
// 	recipes.sort(function (a, b) {
// 		var x = a.title.toLowerCase();
// 		var y = b.title.toLowerCase();
// 		if (x > y) return 1;
// 		if (x <= y) return -1;
// 		return 0;
// 	});
// };
module.exports = router;
