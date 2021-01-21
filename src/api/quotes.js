const url = require('url');
const querystring = require('querystring');
const { Router, response } = require('express');
const fetch = require('node-fetch');
const { getCard } = require('../helpers/card');

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

router.get('/image/random', (req, res) => {
	fetch('http://localhost:6245/api/quotes/v1')
		.then((response) => response.json())
		.then((data) => {
			res.redirect(
				`../image?theme=dracula&title=${encodeURI(
					data.text
				)}&author=${encodeURI(data.author)}`
			);
		})
		.catch((err) => console.error(err));
});

router.get('/image', async (req, res) => {
	const parsedQuery = querystring.parse(url.parse(req.originalUrl).query);
	const theme = parsedQuery.theme || 'default',
		title = parsedQuery.title || 'Title',
		author = parsedQuery.author || 'Author';
	const card = await getCard(title, author, theme);
	res.set('Content-Type', 'image/svg+xml');
	res.send(card);
});

router.get('/', (req, res) => {
	res.json({
		message: 'Welcome to Quotes API',
	});
});

module.exports = router;
