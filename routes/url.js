const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('../config.json');

const Url = require('../models/Url');

// @route   POST /api/url/shorten
// @desc    Creates short URL
router.post('/shorten', async (req, res) => {
	let { longUrl, slug } = req.body;
	const baseUrl = config.baseUrl;

	if (!validUrl.isUri(baseUrl)) {
		return res.status(401).json('Invalid base url');
	}

	if (!longUrl.startsWith('http')) {
		longUrl = `http://${longUrl}`;
	}

	// Create url code
	let urlCode;
	if (slug) {
		urlCode = slug;
	} else {
		urlCode = shortid.generate();
	}

	if (validUrl.isUri(longUrl)) {
		try {
			let url = await Url.findOne({ longUrl });

			if (url) {
				res.json(url);
			} else {
				const shortUrl = baseUrl + '/' + urlCode;

				url = new Url({
					longUrl,
					shortUrl,
					urlCode,
					date: new Date(),
				});

				await url.save();
				res.json(url);
			}
		} catch (err) {
			console.error(err);
			res.status(500).json('Server Error...');
		}
	} else {
		res.status(401).json('Invalud long url');
	}
});

module.exports = router;
