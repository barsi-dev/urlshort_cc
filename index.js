const config = require('./config.json');
const express = require('express');
const connectDB = require('./db');

const app = express();
connectDB();

app.use(express.json({ extended: false }));
app.set('trust proxy', true);

app.use(express.static('public'));

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
