var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var recipesRouter = require('./routes/recipes');
var mongoose = require('mongoose');
var loadPresetData = require('./db/presetData');
var app = express();

connect();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);
app.use(cors());

async function connect() {
	try {
		await mongoose.connect(
			'mongodb+srv://shawngu12:009447880ghulK$@cluster0.jmvcq.mongodb.net/?retryWrites=true&w=majority'
		);
		// loadPresetData();
	} catch (err) {
		throw err;
	}
}

module.exports = app;
