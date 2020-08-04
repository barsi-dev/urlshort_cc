const mongoose = require('mongoose');
const config = require('./config.json');

const db = config.mongoURI;

const connectDB = async () => {
	try {
		console.log('Trying to connect do MongoDB');
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
