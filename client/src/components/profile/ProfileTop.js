import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
	profile: {
		status,
		company,
		location,
		website,
		social,
		user: { name, avatar },
		skills,
	},
}) => {
	return (
		<div className='personal-information-wrapper'>
			<div className='personal-information'>
				<div className='image-wrapper'>
					<img src={avatar} alt='avatar' />
				</div>
				<h2>{name}</h2>
				<h4>
					{status} {company && <span>w {company}</span>}
				</h4>
				<h4>{location && <span>{location}</span>}</h4>
			</div>
			<div className='social'>
				{website && (
					<button>
						<a
							href={
								!website.includes('http://') || !website.includes('https://')
									? `http://${website}`
									: website
							}
							target='_blank'
							rel='noopener noreferrer'>
							<i className='fas fa-globe'></i>
						</a>
					</button>
				)}
				{social &&
					Object.entries(social).map(([key, value]) => (
						<button key={key}>
							<a href={value} target='_blank' rel='noopener noreferrer'>
								<i className={`fab fa-${key}`}></i>
							</a>
						</button>
					))}
			</div>
			<ul className='skills'>
				{skills.map((skill, index) => (
					<li key={index}>
						<i className='fas fa-check'></i>
						{skill}
					</li>
				))}
			</ul>
		</div>
	);
};

ProfileTop.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileTop;
