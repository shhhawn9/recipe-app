import dropdownMenuImg from '../img/dropdown.png';
import './DropdownMenu.css';
import React from 'react';
import { Link } from 'react-router-dom';
export default function DropdownMenu() {
	return (
		<div className="DropdownMenu">
			<span>
				<img src={dropdownMenuImg} alt="DropdownMenu-img" />
			</span>
			<div className="DropdownMenu-content">
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
			</div>
		</div>
	);
}
