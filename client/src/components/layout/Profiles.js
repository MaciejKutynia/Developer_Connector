import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';
import Loader from './Loader';

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
	useEffect(() => {
		getAllProfiles();
	}, [getAllProfiles]);
	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					{profiles.length > 0 ? (
						profiles.map((prof) => (
							<div className='profile-wrapper' key={prof._id}>
								<div className='credential'>
									<div className='image-wrapper'>
										<img src={prof.user.avatar} alt='avatar' />
									</div>
									<div className='profile-info'>
										<h2>{prof.user.name}</h2>
										<h4>{prof.status}</h4>
										<h4>{prof.location}</h4>
										<Link to={`/profile/${prof.user._id}`}>
											<button className='show-profile'>Pokaż profil</button>
										</Link>
									</div>
								</div>
								<ul className='skills-wrapper'>
									{prof.skills.slice(0, 4).map((skill, index) => (
										<li key={index}>
											<i className='fas fa-check'></i>
											{skill}
										</li>
									))}
								</ul>
							</div>
						))
					) : (
						<h4 style={{ marginTop: '5vh', fontSize: '2rem' }}>
							Brak profili do wyświetlenia
						</h4>
					)}
				</Fragment>
			)}
		</Fragment>
	);
};

Profiles.propTypes = {
	getAllProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
