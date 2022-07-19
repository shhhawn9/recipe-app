import './ShowRecipe.css';
import deleteImg from '../img/deleteImg.jpg';
import goImg from '../img/goarrow.jpg';
import React, { useState, useEffect } from 'react';
import Label from './Label.js';
import Button from './Button.js';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Input from './Input';
import Textfield from './Textfield';
import Popup from './Popup.js';
import './Popup.css';
import './Button.css';
import {
	deleteAllRecipesAsync,
	deleteRecipeAsync,
	getRecipesAsync,
	getRecipeByIDAsync,
	sortAllRecipesAsync,
	editRecipeByIDAsync,
} from '../features/thunks';

export default function ShowRecipe() {
	const dispatch = useDispatch();
	const recipes = useSelector((state) => state.recipes.recipes);
	const content = useSelector((state) => state.recipes.displayContent);
	const [popupIsOpen, setPopupIsOpen] = useState(false);
	const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
	const [currTitle, setCurrTitle] = useState('');
	const [idOnEdit, setIdOnEdit] = useState('');
	const [editTitle, setEditTitle] = useState('');
	const [editIngredients, setEditIngredients] = useState('');
	const [editSteps, setEditSteps] = useState('');
	const [editCompletionTime, setEditCompletionTime] = useState(0);
	const [editCreator, setEditCreator] = useState('');

	function togglePopUp(id, title) {
		if (!popupIsOpen) {
			dispatch(getRecipeByIDAsync(id));
		}
		setCurrTitle(title);
		setPopupIsOpen(!popupIsOpen);
	}

	function toggleEditPopup(id) {
		if (!editPopupIsOpen) {
			setIdOnEdit(id);
		}
		resetValue();
		setEditPopupIsOpen(!editPopupIsOpen);
	}

	function resetValue() {
		setEditTitle('');
		setEditIngredients('');
		setEditSteps('');
		setEditCompletionTime(0);
		setEditCreator('');
	}

	function editRecipe(newRecipe) {
		const parsedRecipe = parseRecipe(idOnEdit, newRecipe);
		dispatch(editRecipeByIDAsync(parsedRecipe));
		resetValue();
		toggleEditPopup(-1);
	}

	function handleOnClickDeleteRecipe(id) {
		dispatch(deleteRecipeAsync(id));
	}

	function handleOnClickDeleteAllRecipes() {
		dispatch(deleteAllRecipesAsync());
	}

	function handleOnClickSortRecipes() {
		dispatch(sortAllRecipesAsync());
	}

	function parseRecipe(id) {
		const title = editTitle.charAt(0).toUpperCase() + editTitle.slice(1);
		const recipe = {
			_id: id,
			title: title,
			ingredients: editIngredients.split('\n'),
			steps: editSteps.split('\n'),
			completionTime: editCompletionTime,
			creator: editCreator,
		};
		return recipe;
	}

	useEffect(() => {
		dispatch(getRecipesAsync());
	}, [dispatch]);

	const displayRecipe = recipes?.map((recipe) => (
		<tr key={recipe._id}>
			<td>
				<strong>{recipe.title}</strong>
			</td>
			<td>
				<ul key="ingredients">
					{recipe.ingredients?.map((ingredient, i) => {
						return <li key={i}>{ingredient}</li>;
					})}
				</ul>
			</td>
			<td className="icon" width="40px">
				<img
					src={goImg}
					alt={recipe._id}
					onClick={() => {
						togglePopUp(recipe._id, recipe.title);
					}}
				></img>
			</td>
			<td className="icon">
				<img
					src={deleteImg}
					alt={recipe._id}
					onClick={() => {
						handleOnClickDeleteRecipe(recipe._id);
					}}
				></img>
			</td>
			<td>
				<button
					onClick={() => {
						toggleEditPopup(recipe._id);
					}}
				>
					Edit
				</button>
			</td>
		</tr>
	));
	return (
		<div className="ShowRecipe">
			<Label name="Show Recipe" />

			<table id="table">
				<thead>
					<tr>
						<th width="90px">Name</th>
						<th width="370px">Ingredienst</th>
						<th width="20px">Steps</th>
						<th width="20px">Delete</th>
						<th width="20px">Edit</th>
					</tr>
				</thead>
				<tbody id="tbody">{displayRecipe}</tbody>
			</table>

			{/* <Button
				type="SortButton"
				name="Sort All"
				onClick={handleOnClickSortRecipes}
				extra="disabled"
			/> */}
			<Button type="DeleteButton" name="Delete All" onClick={handleOnClickDeleteAllRecipes} />

			{popupIsOpen && <Popup title={currTitle} content={content} handleClose={togglePopUp} />}
			{editPopupIsOpen && (
				<div className="popup-box">
					<div className="box-large">
						<span
							className="close-icon"
							onClick={() => {
								toggleEditPopup(-1);
							}}
						>
							x
						</span>
						<div className="box-content">
							<form>
								<Input
									size="Input"
									type="text"
									name="Edit Title"
									value={editTitle}
									onChange={(event) => setEditTitle(event.target.value)}
								/>
								<Textfield
									size="Textfield"
									type="text"
									name="Edit Ingredients"
									value={editIngredients}
									onChange={(event) => setEditIngredients(event.target.value)}
								/>
								<Textfield
									size="Textfield"
									type="text"
									name="Steps"
									value={editSteps}
									onChange={(event) => setEditSteps(event.target.value)}
								/>
								<Input
									size="Input"
									type="number"
									name="Completion Time"
									value={editCompletionTime}
									onChange={(event) => setEditCompletionTime(event.target.value)}
								/>
								<Input
									size="Input"
									type="text"
									name="Your Name"
									value={editCreator}
									onChange={(event) => setEditCreator(event.target.value)}
								/>
								<Button
									type="AddButton"
									name="Edit"
									onClick={() => {
										if (
											editTitle === '' ||
											editIngredients === '' ||
											editSteps === ''
										) {
											alert('please fill in all info');
										} else {
											editRecipe();
										}
									}}
								/>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
