import React from 'react';
import './Input.css';

export default function Input(props) {
	return (
		<div>
			<label>{props.name}</label>
			<input
				className={props.size}
				type={props.type}
				value={props.value}
				onChange={(event) => props.onChange(event)}
			/>
			<br />
		</div>
	);
}
