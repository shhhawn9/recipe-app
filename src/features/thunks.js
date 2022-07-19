import RecipeServices from './service';
import { actionTypes } from './actionTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const getRecipesAsync = createAsyncThunk(actionTypes.GET_RECIPES, async () => {
	return await RecipeServices.getRecipes();
});

export const getRecipeByIDAsync = createAsyncThunk(actionTypes.GET_RECIPE_BY_ID, async (id) => {
	return await RecipeServices.getRecipeByID(id);
});

export const addRecipeAsync = createAsyncThunk(actionTypes.ADD_RECIPE, async (recipe) => {
	return await RecipeServices.addRecipe(recipe);
});

export const deleteAllRecipesAsync = createAsyncThunk(actionTypes.DELETE_ALL_RECIPES, async () => {
	return await RecipeServices.deleteAllRecipes();
});

export const deleteRecipeAsync = createAsyncThunk(actionTypes.DELETE_RECIPE, async (id) => {
	return await RecipeServices.deleteRecipe(id);
});

export const sortAllRecipesAsync = createAsyncThunk(actionTypes.SORT_RECIPES, async () => {
	return await RecipeServices.sortAllRecipes();
});

export const editRecipeByIDAsync = createAsyncThunk(
	actionTypes.EDIT_RECIPE_BY_ID,
	async (recipe) => {
		const value = await RecipeServices.editRecipeByID(recipe);
		return value;
	}
);
