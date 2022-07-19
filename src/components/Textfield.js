import React from 'react';
import './Textfield.css';

export default function Textfield(props) {
	return (
		<div>
			<label>{props.name}</label>
			<textarea
				className={props.size}
				type="text"
				value={props.value}
				onChange={(event) => props.onChange(event)}
			/>
			<br />
		</div>
	);
}
