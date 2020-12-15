import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../layout/Loader';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileBio from './ProfileBio';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import GithubRepos from './GithubRepos';

const Profile = ({
	match,
	getProfileById,
	profile: { profile, loading, repos },
	auth,
}) => {
	useEffect(() => {
		getProfileById(match.params.id);
	}, [getProfileById, match.params.id]);

	return (
		<Fragment>
			{profile === null || loading ? (
				<Loader />
			) : (
				<Fragment>
					<div className='back'>
						<Link to='/profiles'>
							<i className='fas fa-hand-point-left'></i>
						</Link>
						<div className='popup'>
							<div className='popuptext'>Powrót</div>
						</div>
					</div>
					{auth.isAuthenticated &&
						!auth.loading &&
						auth.user._id === profile.user._id && (
							<Link
								to='/edit-profile'
								className='edit-profile-button'
								style={{ marginTop: '5vh' }}>
								Edytuj profil
							</Link>
						)}
					<ProfileTop profile={profile} />
					<ProfileBio profile={profile} />
					<div className='experience-informations'>
						<ProfileExperience profile={profile} />
						<ProfileEducation profile={profile} />
					</div>
					<GithubRepos />
				</Fragment>
			)}
		</Fragment>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
