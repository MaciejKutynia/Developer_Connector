import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ profile: { education } }) => {
	return (
		<Fragment>
			{education.length > 0 ? (
				<div className='education'>
					<h1>Edukacja</h1>
					{education.map((edu) => (
						<div className='school-informations' key={edu._id}>
							<h2>{edu.school}</h2>
							<h3>
								<Moment format='DD.MM.YYYY'>{edu.from}</Moment> -{' '}
								{edu.current ? (
									' Nadal'
								) : (
									<Moment format='DD.MM.YYYY'>{edu.to}</Moment>
								)}
							</h3>
							<h2 className='degree'>
								Stopień: <p>{edu.degree}</p>
							</h2>
							<h2 className='field-of-study'>
								Kierunek studiów: <p>{edu.fieldofstudy}</p>
							</h2>
							{edu.description !== '' ? (
								<h4>
									Opis:
									<p>{edu.description}</p>
								</h4>
							) : (
								''
							)}
						</div>
					))}
				</div>
			) : (
				<div className='education'>
					<h1>Edukacja</h1>
					<h3>Brak dodanej edukacji</h3>
				</div>
			)}
		</Fragment>
	);
};

ProfileEducation.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileEducation;
