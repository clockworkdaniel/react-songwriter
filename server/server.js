// import express from 'express';
// import parser  from 'body-parser';
// import router from './models/song.js';
const express = require('express');
const parser = require('body-parser');
const router = require('./routes/song.routes.js');
const path = require('path');

var app = express(),
		DIST_DIR = path.join(__dirname, "/../dist"),  
    PORT = 8080;


// require('./database');
// require('./seed');

app.use('/', express.static(DIST_DIR));
app.use(parser.json());


app.use('/api', router);

app.listen(PORT, function() {
    console.log("The server is running on port 8080!");
});