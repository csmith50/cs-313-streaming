const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;

//define functions here

express()
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
  	.set('view engine', 'ejs')
  	//gets go here