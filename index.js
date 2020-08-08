const config = require('./config.json');
const express = require('express');
const connectDB = require('./db');
const subdomain = require('express-subdomain');

const app = express();
connectDB();

app.set('trust proxy', true);

app.use(express.json({ extended: false }));

app.use(subdomain('url', express.static('public/url')));
app.use(express.static('public/barsi'));

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
