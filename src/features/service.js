const getRecipes = async () => {
	const response = await fetch('http://localhost:3001/recipes', {
		method: 'GET',
	});
	return await response.json();
};

const getRecipeByID = async (id) => {
	const response = await fetch('http://localhost:3001/recipes/' + id, {
		method: 'GET',
	});
	return await response.json();
};

const addRecipe = async (recipe) => {
	// const josnrecipe = JSON.stringify(recipe);
	const response = await fetch('http://localhost:3001/recipes', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(recipe),
	});
	const data = await response.json();
	if (!response.ok) {
		const errorMsg = data?.message;
		throw new Error(errorMsg);
	}
	return data;
};

const deleteAllRecipes = async () => {
	const response = await fetch('http://localhost:3001/recipes', {
		method: 'DELETE',
	});
	return await response.json();
};

const deleteRecipe = async (id) => {
	const response = await fetch('http://localhost:3001/recipes/' + id, {
		method: 'DELETE',
	});
	return await response.json();
};

const sortAllRecipes = async () => {
	const response = await fetch('http://localhost:3001/recipes', {
		method: 'PUT',
	});
	return await response.json();
};

const editRecipeByID = async (recipe) => {
	const response = await fetch('http://localhost:3001/recipes/' + recipe._id, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(recipe),
	});
	return await response.json();
};
const RecipeServices = {
	getRecipes,
	getRecipeByID,
	addRecipe,
	deleteAllRecipes,
	deleteRecipe,
	sortAllRecipes,
	editRecipeByID,
};
export default RecipeServices;
