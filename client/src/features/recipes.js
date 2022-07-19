import { createSlice } from '@reduxjs/toolkit';
import {
	getRecipesAsync,
	addRecipeAsync,
	deleteAllRecipesAsync,
	deleteRecipeAsync,
	getRecipeByIDAsync,
	sortAllRecipesAsync,
	editRecipeByIDAsync,
} from './thunks';
import { REQUEST_STATE } from './requestStates';
const INITIAL_STATE = {
	recipes: [],
	displayContent: {
		creator: '',
		steps: [],
		completionTime: -1,
	},
	getRecipes: REQUEST_STATE.IDLE,
	getRecipeByID: REQUEST_STATE.IDLE,
	addRecipe: REQUEST_STATE.IDLE,
	deleteAllRecipes: REQUEST_STATE.IDLE,
	deleteRecipe: REQUEST_STATE.IDLE,
	sortAllRecipes: REQUEST_STATE.IDLE,
	editRecipeByID: REQUEST_STATE.IDLE,
};
export const recipesSlice = createSlice({
	name: 'recipes',
	initialState: INITIAL_STATE,

	reducers: {
		addRecipe: (state, action) => {
			const recipe = parseRecipe(action.payload);
			state.recipes.push(recipe);
		},
		deleteRecipe: (state, action) => {
			var newRecipes = state.value.recipes.filter(function (recipe) {
				return recipe.UUID !== action.payload;
			});
			state.recipes = newRecipes;
		},
		clearRecipe: (state, action) => {
			state.recipes = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getRecipesAsync.pending, (state, action) => {
			state.getRecipes = REQUEST_STATE.PENDING;
			state.error = null;
		});
		builder.addCase(getRecipesAsync.fulfilled, (state, action) => {
			state.getRecipes = REQUEST_STATE.FULFILLED;
			state.recipes = action.payload;
		});
		builder.addCase(getRecipesAsync.rejected, (state, action) => {
			state.getRecipes = REQUEST_STATE.REJECTED;
			state.error = action.error;
		});
		builder.addCase(getRecipeByIDAsync.pending, (state, action) => {
			state.getRecipeByID = REQUEST_STATE.PENDING;
			state.error = null;
		});
		builder.addCase(getRecipeByIDAsync.fulfilled, (state, action) => {
			state.getRecipeByID = REQUEST_STATE.FULFILLED;
			state.displayContent = action.payload;
		});
		builder.addCase(getRecipeByIDAsync.rejected, (state, action) => {
			state.getRecipeByID = REQUEST_STATE.REJECTED;
			state.error = action.error;
		});
		builder.addCase(addRecipeAsync.pending, (state, action) => {
			state.addRecipe = REQUEST_STATE.PENDING;
			state.error = null;
		});
		builder.addCase(addRecipeAsync.fulfilled, (state, action) => {
			state.addRecipe = REQUEST_STATE.FULFILLED;
			state.recipes.push(action.payload);
			state.recipes.sort(function (a, b) {
				var x = a.title.toLowerCase();
				var y = b.title.toLowerCase();
				if (x > y) return 1;
				if (x <= y) return -1;
				return 0;
			});
		});
		builder.addCase(addRecipeAsync.rejected, (state, action) => {
			state.addRecipe = REQUEST_STATE.REJECTED;
			state.error = action.error;
		});
		builder.addCase(deleteAllRecipesAsync.pending, (state, action) => {
			state.deleteAllRecipes = REQUEST_STATE.PENDING;
			state.error = null;
		});
		builder.addCase(deleteAllRecipesAsync.fulfilled, (state, action) => {
			state.deleteAllRecipes = REQUEST_STATE.FULFILLED;
			state.recipes = action.payload;
		});
		builder.addCase(deleteAllRecipesAsync.rejected, (state, action) => {
			state.deleteAllRecipes = REQUEST_STATE.REJECTED;
			state.error = action.error;
		});
		builder.addCase(deleteRecipeAsync.pending, (state, action) => {
			state.deleteRecipe = REQUEST_STATE.PENDING;
			state.error = null;
		});
		builder.addCase(deleteRecipeAsync.fulfilled, (state, action) => {
			state.deleteRecipe = REQUEST_STATE.FULFILLED;
			for (var i = 0; i < state.recipes.length; i++) {
				if (state.recipes[i]._id === action.payload.id) {
					state.recipes.splice(i, 1);
					break;
				}
			}
		});
		builder.addCase(deleteRecipeAsync.rejected, (state, action) => {
			state.deleteRecipe = REQUEST_STATE.REJECTED;
			state.error = action.error;
		});
		builder.addCase(sortAllRecipesAsync.pending, (state, action) => {
			state.sortAllRecipes = REQUEST_STATE.PENDING;
			state.error = null;
		});
		builder.addCase(sortAllRecipesAsync.fulfilled, (state, action) => {
			state.sortAllRecipes = REQUEST_STATE.FULFILLED;
			state.recipes = action.payload;
		});
		builder.addCase(sortAllRecipesAsync.rejected, (state, action) => {
			state.sortAllRecipes = REQUEST_STATE.REJECTED;
			state.error = action.error;
		});
		builder.addCase(editRecipeByIDAsync.pending, (state, action) => {
			state.editRecipeByID = REQUEST_STATE.PENDING;
			state.error = null;
		});
		builder.addCase(editRecipeByIDAsync.fulfilled, (state, action) => {
			state.editRecipeByID = REQUEST_STATE.FULFILLED;
			const id = action.payload._id;
			for (var i = 0; i < state.recipes.length; i++) {
				if (state.recipes[i]._id === id) {
					state.recipes[i] = action.payload;
					break;
				}
			}
			state.recipes.sort(function (a, b) {
				var x = a.title.toLowerCase();
				var y = b.title.toLowerCase();
				if (x > y) return 1;
				if (x <= y) return -1;
				return 0;
			});
			// state.recipes = action.payload;
		});
		builder.addCase(editRecipeByIDAsync.rejected, (state, action) => {
			state.editRecipeByID = REQUEST_STATE.REJECTED;
			state.error = action.error;
		});
	},
});

// function loadData() {
// 	const preset =
// 		'{"Recipes":[{"UUID": 1, "title":"Steak","ingredients":["Top Sirloin Steak","Butter","Aromatics"],"steps":["Pat dry","Season generously","Preheat the pan","Sear steaks","Add butter and aromatics","Remove steak"]},{"UUID":2,"title":"Milk Shake","ingredients":["4 large scoops (about 1 1/2 c.) vanilla ice cream","1/4 c. milk","Whipped topping","Sprinkles","Maraschino cherry"],"steps":["blend together ice cream and milk","Pour into a glass and garnish with whipped topping sprinkles and a cherry"]}]}';
// 	const presetData = JSON.parse(preset);
// 	const loadRecipes = [];
// 	presetData.Recipes.forEach((recipe) => {
// 		const currRecipe = {
// 			UUID: recipe.UUID,
// 			title: recipe.title,
// 			ingredients: recipe.ingredients,
// 			steps: recipe.steps,
// 		};
// 		loadRecipes.push(recipe);
// 	});
// 	return loadRecipes;
// }

function parseRecipe(newRecipe) {
	const recipe = {
		title: '',
		ingredients: [],
		steps: [],
	};
	recipe.title = newRecipe.title;
	recipe.ingredients = newRecipe.ingredients.split('\n');
	recipe.steps = newRecipe.steps.split('\n');
	return recipe;
}
export const { addRecipe, deleteRecipe, clearRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;
