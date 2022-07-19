import './App.css';
import Header from './components/Header.js';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home.js';
import About from './Pages/About.js';

export default function App() {
	return (
		<BrowserRouter basename="/">
			<div className="App">
				<Header />
				<Routes>
					<Route path="/" element={<Home />} exact />
					<Route path="/about" element={<About />} exact />
				</Routes>
			</div>
		</BrowserRouter>
	);
}
