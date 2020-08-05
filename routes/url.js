const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('../config.json');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000,
	max: 10,
});

const Url = require('../models/Url');

// @route   POST /api/url/shorten
// @desc    Creates short URL
router.post('/shorten', limiter, async (req, res) => {
	let { longUrl, slug } = req.body;
	const baseUrl = config.baseUrl;

	if (!validUrl.isUri(baseUrl)) {
		return res.status(401).json('Invalid base url');
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
			// Checks if SLUG is available
			let getSlug = await Url.findOne({ urlCode: slug });
			if (getSlug) {
				return res.json({ res: 'Slug has already been used...' });
			}
			let url;
			if (!slug) {
				url = await Url.findOne({ longUrl });
			}

			if (url) {
				res.json({ shortUrl: `${baseUrl}/${url.urlCode}` });
			} else {
				const shortUrl = baseUrl + '/' + urlCode;

				url = new Url({
					longUrl,
					urlCode,
					date: new Date(),
				});

				await url.save();

				res.json({ shortUrl: shortUrl });
			}
		} catch (err) {
			console.error(err);
			res.status(500).json('Server Error...');
		}
	} else {
		res.json({ res: 'Invalid long URL...' });
	}
});

module.exports = router;
