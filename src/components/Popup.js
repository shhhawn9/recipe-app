import React from 'react';
import './Popup.css';

const Popup = (props) => {
	return (
		<div className="popup-box">
			<div className="box">
				<span className="close-icon" onClick={props.handleClose}>
					x
				</span>
				<div className="box-content">
					<h2>{props.title}</h2>
					<p className="sign">
						posted by {props.content.creator}
						<br />
					</p>
					<p>Completion time: {props.content.completionTime}</p>
					<h3>Steps to cook</h3>
					<ol>
						{props.content.steps?.map(function (step, i) {
							return <li key={i}>{step}</li>;
						})}
					</ol>
					<br />
				</div>
			</div>
		</div>
	);
};

export default Popup;
