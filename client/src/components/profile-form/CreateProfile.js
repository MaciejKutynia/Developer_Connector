import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
	const [formData, setFormData] = useState({
		company: '',
		website: '',
		location: '',
		status: '',
		skills: '',
		githubusername: '',
		bio: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		youtube: '',
		instagram: '',
	});

	const [toggleSocial, setToggleSocial] = useState(false);

	const {
		company,
		website,
		location,
		status,
		skills,
		githubusername,
		bio,
		twitter,
		youtube,
		facebook,
		linkedin,
		instagram,
	} = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		createProfile(formData, history);
	};

	return (
		<Fragment>
			<div className='back'>
				<Link to='/dashboard'>
					<i className='fas fa-hand-point-left'></i>
				</Link>
				<div className='popup'>
					<div className='popuptext'>Powrót</div>
				</div>
			</div>
			<h1>Dodaj informacje o sobie żebyśmy mogli Cię lepiej poznać</h1>
			<form onSubmit={onSubmit}>
				<select name='status' value={status} onChange={onChange} required>
					<option value=''>Podaj Status Zawodowy</option>
					<option value='Developer'>Developer</option>
					<option value='Junior Developer'>Junior Developer</option>
					<option value='Senior Developer'>Senior Developer</option>
					<option value='Manager'>Manager</option>
					<option value='Uczeń'>Uczeń</option>
					<option value='Nauczyciel'>Nauczyciel</option>
					<option value='CEO'>CEO</option>
					<option value='Inne'>Inne</option>
				</select>
				<small>Powiedz nam na jakim etapie jest twoja kariera</small>
				<input
					type='text'
					name='skills'
					placeholder='Podaj umiejętności'
					required
					value={skills}
					onChange={onChange}
				/>
				<small>
					Podaj umiejętności oddzielone przecinkiem np.(HTML, CSS) etc.
				</small>
				<input
					type='text'
					name='company'
					placeholder='Podaj nazwę firmy'
					value={company}
					onChange={onChange}
				/>
				<small>
					Może być nazwa twojej własnej firmy lub firmy w której pracujesz
				</small>
				<input
					type='text'
					name='website'
					placeholder='Podaj adres swojej strony internetowej'
					value={website}
					onChange={onChange}
				/>
				<small>Np.(http://www.example.com) lub (www.example.com)</small>
				<input
					type='text'
					name='location'
					placeholder='Podaj miejsce zamieszkania'
					value={location}
					onChange={onChange}
				/>
				<input
					type='text'
					name='githubusername'
					placeholder='Podaj link do swojego repozytorium github'
					value={githubusername}
					onChange={onChange}
				/>
				<small>
					Jeśli chcesz wyświetlić na swoim profilu swoje repozutorium podaj nam
					link do swojego konta
				</small>
				<textarea
					type='text'
					name='bio'
					placeholder='Napisz coś o sobie'
					value={bio}
					onChange={onChange}></textarea>
				<h3 className='display-social-media'>
					<div
						className='add-social-media-button'
						onClick={() => setToggleSocial(!toggleSocial)}>
						Social media
					</div>{' '}
					[Opcjonalne]
				</h3>
				{toggleSocial && (
					<Fragment>
						<div className='add-social-media'>
							<span>
								<i className='fab fa-youtube resized'></i>
								<input
									type='text'
									name='youtube'
									placeholder='Podaj URL'
									value={youtube}
									onChange={onChange}
								/>
							</span>
							<span>
								<i className='fab fa-twitter resized'></i>
								<input
									type='text'
									name='twitter'
									placeholder='Podaj URL'
									value={twitter}
									onChange={onChange}
								/>
							</span>
							<span>
								<i className='fab fa-linkedin resized'></i>
								<input
									type='text'
									name='linkedin'
									placeholder='Podaj URL'
									value={linkedin}
									onChange={onChange}
								/>
							</span>
							<span>
								<i className='fab fa-facebook resized'></i>
								<input
									type='text'
									name='facebook'
									placeholder='Podaj URL'
									value={facebook}
									onChange={onChange}
								/>
							</span>
							<span>
								<i className='fab fa-instagram resized'></i>
								<input
									type='text'
									name='instagram'
									placeholder='Podaj URL'
									value={instagram}
									onChange={onChange}
								/>
							</span>
						</div>
					</Fragment>
				)}
				<button className='save-button'>Zapisz</button>
			</form>
		</Fragment>
	);
};

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
