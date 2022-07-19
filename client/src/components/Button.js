import React from 'react';
import './Button.css';
export default function Button(props) {
	return (
		<button type="button" className={props.type} onClick={() => props.onClick()}>
			{props.name}
		</button>
	);
}
