import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileBio = ({
	profile: {
		user: { name },
		bio,
	},
}) => {
	return (
		<Fragment>
			{bio !== undefined ? (
				<div className='bio'>
					<h2>Informacje o {name}</h2>
					<p>{bio}</p>
				</div>
			) : (
				''
			)}
		</Fragment>
	);
};

ProfileBio.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileBio;
