function getVideoList () {
	var videos;
	var sqlString = "SELECT * FROM videoList";
	pool.query(sqlString, (err, result) => {
		if (err) {
			console.log("error in query: ", err);
		}
		else {
			//log to console
			console.log("Back from db with result: ", result.rows);
			vidoes = result.rows;
			return videos;
		}
	});
};

require('dotenv').config();
const { Pool } = require('pg');

const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

app.locals.videos = getVideoList();

express()
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
  	.set('view engine', 'ejs')
  	.get('/', (req, res) => res.render('landing', {videos: videos}))
  	.get('/*', (req, res) => res.render('video not found', 404))
  	.listen(process.env.PORT, () => {
  		console.log("Express listening");
  	})