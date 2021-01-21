const url = require('url');
const querystring = require('querystring');
const { Router, response } = require('express');
const fetch = require('node-fetch');
const { renderCard } = require('../helpers/card');

const router = Router();

router.get('/v1', (req, res) => {
	fetch('https://type.fit/api/quotes')
		.then((response) => response.json())
		.then((data) => {
			res.json(data[Math.floor(Math.random() * data.length)]);
		})
		.catch((e) => console.error(e));
});

router.get('/v2', (req, res) => {
	fetch('https://api.quotable.io/random')
		.then((response) => response.json())
		.then((data) => {
			res.json(data);
		})
		.catch((e) => console.error(e));
});

router.get('/v3', (req, res) => {
	fetch('https://quote-garden.herokuapp.com/api/v3/quotes/random')
		.then((response) => response.json())
		.then((data) => {
			res.json(data['data']);
		})
		.catch((e) => console.error(e));
});

router.get('/game-of-thornes', (req, res) => {
	fetch('https://game-of-thrones-quotes.herokuapp.com/v1/random')
		.then((response) => response.json())
		.then((data) => {
			res.json(data);
		})
		.catch((e) => console.error(e));
});

router.get('/image', (req, res) => {
	let query = querystring.parse(url.parse(req.originalUrl).query);
	console.log(query.quote);
	res.set('Content-Type', 'image/svg+xml');
	// res.json({
	// 	message: 'Welcome to Quotes API',
	// });
	res.send(renderCard());
});

router.get('/', (req, res) => {
	res.json({
		message: 'Welcome to Quotes API',
	});
});

module.exports = router;
