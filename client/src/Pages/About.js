import React from 'react';
import './About.css';
const About = () => {
	return (
		<div className="AboutContainer">
			<h2>This is CPSC 455 Assignment 5: Recipe App</h2>

			<p className="sign">
				made by Shawn Gu using React & Redux, Express, NoSQL with MongoDB
				<br />
				and deployed on Heroku.
			</p>
			<p>
				<br />I like watching movies, snowboarding, and programming.
			</p>
		</div>
	);
};

export default About;
