import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({ profile: { experience } }) => {
	return (
		<Fragment>
			{experience.length > 0 ? (
				<div className='experience'>
					<h1>Doświadczenie</h1>
					{experience.map((exp) => (
						<Fragment>
							<div className='single-company-informations'>
								<h2>{exp.company}</h2>
								<h3>
									<Moment format='DD.MM.YYYY'>{exp.from}</Moment> -{' '}
									{exp.current ? (
										' Nadal'
									) : (
										<Moment format='DD.MM.YYYY'>{exp.to}</Moment>
									)}
								</h3>
								<h2 className='position'>
									Stanowisko: <p>{exp.status}</p>
								</h2>
								{exp.description !== '' ? (
									<h4>
										Opis:
										<p>{exp.description}</p>
									</h4>
								) : (
									''
								)}
							</div>
						</Fragment>
					))}
				</div>
			) : (
				<div className='experience'>
					<h1>Doświadczenie</h1>
					<h3>Brak dodanego doświadczenia</h3>
				</div>
			)}
		</Fragment>
	);
};

ProfileExperience.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileExperience;
