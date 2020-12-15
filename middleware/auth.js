const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
	// Pobierz token z HEADER
	const token = req.header('x-auth-token');

	//Sprawdzanie czy nie ma tokena
	if (!token) {
		return res
			.status(401)
			.json({ msg: 'Brak tokena, autoryzacja niedozwolona' });
	}

	//Weryfikacja tokena
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));

		req.user = decoded.user;
		next();
	} catch (err) {
		return res.status(401).json({ msg: 'Token nie prawidłowy' });
	}
};
