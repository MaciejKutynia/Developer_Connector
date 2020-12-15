import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Loader from '../layout/Loader';
import DashboardButtons from './DashboardButtons';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
	deleteAccount,
	auth: { isAuthenticated, user },
	getCurrentProfile,
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);
	return loading && profile === null ? (
		<Loader />
	) : (
		<Fragment>
			<h2>
				<i className='fas fa-user-alt'></i>
				Witaj {user && user.name}
			</h2>
			{profile !== null ? (
				<Fragment>
					<DashboardButtons />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />
					<button className='delete-account' onClick={() => deleteAccount()}>
						<i className='fas fa-times'></i>Usuń konto
					</button>
				</Fragment>
			) : (
				<Fragment>
					Nie masz jeszcze profilu, proszę stwórz swój własny profil{' '}
					<Link to='/create-profile' className='edit-profile-button'>
						Stwórz profil
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});
export default connect(mapStateToProps, {
	getCurrentProfile,
	deleteAccount,
})(Dashboard);
