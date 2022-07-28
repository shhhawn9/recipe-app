import './AddRecipe.css';
import Button from './Button.js';
import Input from './Input';
import Textfield from './Textfield';
import Label from './Label';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRecipeAsync } from '../features/thunks';

export default function Form() {
	const originalState = '';
	const dispatch = useDispatch();
	const [title, setTitle] = useState(originalState);
	const [ingredients, setIngredients] = useState(originalState);
	const [steps, setSteps] = useState(originalState);
	const [completionTime, setCompletionTime] = useState(originalState);
	const [creator, setCreator] = useState(originalState);
	function addRecipe() {
		const parsedRecipe = parseRecipe();
		dispatch(addRecipeAsync(parsedRecipe));
		resetValue();
	}
	function resetValue() {
		setTitle(originalState);
		setIngredients(originalState);
		setSteps(originalState);
		setCompletionTime(originalState);
		setCreator(originalState);
	}
	function parseRecipe() {
		const processedTitle = title.charAt(0).toUpperCase() + title.slice(1);
		const recipe = {
			title: processedTitle,
			ingredients: ingredients.split('\n'),
			steps: steps.split('\n'),
			completionTime: completionTime,
			creator: creator,
		};
		return recipe;
	}

	return (
		<div className="AddRecipe">
			<form>
				<Label name="Add Recipe - 1" />
				<Input
					size="Input"
					type="text"
					name="Title"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>
				<Textfield
					size="Textfield"
					type="text"
					name="Ingredients"
					value={ingredients}
					onChange={(event) => setIngredients(event.target.value)}
				/>
				<Textfield
					size="Textfield"
					type="text"
					name="Steps"
					value={steps}
					onChange={(event) => setSteps(event.target.value)}
				/>
				<Input
					size="Input"
					type="number"
					name="Completion Time"
					value={completionTime}
					onChange={(event) => setCompletionTime(event.target.value)}
				/>
				<Input
					size="Input"
					type="text"
					name="Your Name"
					value={creator}
					onChange={(event) => setCreator(event.target.value)}
				/>
				<Button
					type="AddButton"
					name="Add"
					onClick={() => {
						if (
							title === '' ||
							ingredients === '' ||
							steps === '' ||
							completionTime === '' ||
							creator === ''
						) {
							alert('please fill in all info');
						} else {
							addRecipe();
						}
					}}
				/>
				<Button type="ClearButton" name="Clear" onClick={() => resetValue()} />
			</form>
		</div>
	);
}
