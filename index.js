const config = require('./config.json');
const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());
app.set('trust proxy', true);
// app.enable('trust proxy');

app.use(express.json({ extended: false }));

app.use(express.static('public'));

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
