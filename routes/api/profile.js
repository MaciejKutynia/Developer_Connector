const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const request = require('request');
const config = require('config');

// @route       GET api/profile/me
// @desc        Pobierz obecny profil użytkownika (
// @desc 		Get current user profile)
// @access      Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate('user', ['name', 'avatar']);

		if (!profile) {
			return res
				.status(400)
				.json({ msg: 'Nie ma profilu podanego użytkownika' });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route       POST api/profile
// @desc        utworzenie albo aktualizacja profilu użytkownika
// @desc		(Create or update user profile)
// @access      Private
router.post(
	'/',
	[
		auth,
		[
			body('status', 'Status jest wymagany').not().isEmpty(),
			body('skills', 'Umiejętności są  wymagane').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin,
		} = req.body;

		//Budowa objektu profilu
		//(Build profile object)
		const profileFields = {};
		profileFields.user = req.user.id;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubusername) profileFields.githubusername = githubusername;
		if (skills) {
			profileFields.skills = skills.split(',').map((skill) => skill.trim());
		}

		//Budowa obiektu SocialMedia
		//(Build Social Media Project)
		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (facebook) profileFields.social.facebook = facebook;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (instagram) profileFields.social.instagram = instagram;

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			if (profile) {
				//Aktualizuj
				//(Update)
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);

				return res.json(profile);
			}

			//Tworzenie
			//(Create)

			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route       GET api/profile
// @desc        Pobranie wszystkich profili
// @desc		(Get all profiles)
// @access      Public
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route       GET api/profile/user/:user_id
// @desc        Pobranie profilu prze id użytkownika
// @desc		(Get Profile by user id)
// @access      Public
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate('user', ['name', 'avatar']);

		if (!profile)
			return res.status(400).json({ msg: 'Brak profilu danego użytkownika' });

		res.json(profile);
	} catch (error) {
		console.error(error.message);
		if (error.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Nie znaleziono profilu' });
		}
		res.status(500).send('Server Error');
	}
});

// @route       DELETE api/profile
// @desc        usunięcie profilu przez id użytkownika
// @desc		(Delete profile, user & posts)
// @access      Private
router.delete('/', auth, async (req, res) => {
	try {
		//Remove all user posts
		await Post.deleteMany({ user: req.user.id });
		//Remove profile
		await Profile.findOneAndRemove({ user: req.user.id });
		//Remove user
		await User.findByIdAndRemove({ _id: req.user.id });

		res.json({ msg: 'Użytkownik usunięty' });
	} catch (error) {
		console.error(error.message);
		res.status(500).json('Server Error');
	}
});

//EXPERIENCE

// @route       PUT api/profile/experience
// @desc        Dodawanie doświadczenia do profilu
// @desc		(Add profile experience)
// @access      Private
router.put(
	'/experience',
	[
		auth,
		[
			body('title', 'Stanowisko jest wymagane').not().isEmpty(),
			body('company', 'Nazwa firmy jest wymagana').not().isEmpty(),
			body('from', 'Data od kiedy jest wymagana').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			title,
			company,
			from,
			location,
			to,
			current,
			description,
		} = req.body;

		const newExperience = {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.experience.unshift(newExperience);
			await profile.save();
			res.json(profile);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route       DELETE api/profile/experience/:exp_id
// @desc        Usuwanie doświadczenia z profilu
// @desc		(Remove profile experience)
// @access      Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		//Get Remove index
		//Pobranie usuwanego indexu
		const removeIndex = profile.experience
			.map((item) => item.id)
			.indexOf(req.params.exp_id);

		profile.experience.splice(removeIndex, 1);
		await profile.save();
		res.json(profile);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

//EDUCATION

// @route       PUT api/profile/education/
// @desc        Dodawanie edukacji do profilu
// @desc		(Add profile education)
// @access      Private

router.put(
	'/education',
	[
		auth,
		body('school', 'Nazwa szkoły jest wymagana').not().isEmpty(),
		body('degree', 'Wykształcenie jest wymagane').not().isEmpty(),
		body('fieldofstudy', 'Kierunek studiów jest wymagany').not().isEmpty(),
		body('from', 'Data od kiedy jest wymagana').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		} = req.body;

		const newEducation = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.education.unshift(newEducation);
			await profile.save();
			res.json(profile);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route       DELETE api/profile/education/:edu_id
// @desc        Usuwanie edukacji do profilu
// @desc		(Remove profile education)
// @access      Private
router.delete('/education/:edu_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		const removeIndex = profile.education
			.map((item) => item.id)
			.indexOf(req.params.edu_id);
		profile.education.splice(removeIndex, 1);
		await profile.save();
		res.json(profile);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// @route       GET api/profile/github/:username
// @desc        Pobieranie repozytorium użytkownika z Github
// @desc		(Get user repos from github)
// @access      Public
router.get('/github/:username', (req, res) => {
	try {
		const options = {
			uri: `https://api.github.com/users/${
				req.params.username
			}/repos?per_page=5$sort=created:asc&client_id=${config.get(
				'githubclient'
			)}$client_secret=${config.get('githubSecret')}`,
			method: 'GET',
			headers: { 'user-agent': 'node.js' },
		};
		request(options, (error, response, body) => {
			if (error) console.error(error);
			if (response.statusCode !== 200) {
				return res.status(404).json({ msg: 'Nie znaleziono konta na Github' });
			}
			res.json(JSON.parse(body));
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
