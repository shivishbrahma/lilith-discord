const express = require('express');

const quotes = require('./api/quotes');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

app.use('/api/quotes', quotes);

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to Lilith API', version: '0.0.1' });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
