import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Index = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}
	return (
		<div className='index'>
			<div className='layer'>
				<div className='welcome-page'>
					<div className='welcome-text'>
						<p>
							Witaj na DEVELOPER CONNECTOR. Stronie gdzie znajdziesz społeczność
							programistów. Zarejestruj się i wymieniaj się doświadczeniami z
							innymi
						</p>
					</div>
					<div className='buttons'>
						<button className='RegisterButton'>
							<Link to='/register'>Zarejestruj się</Link>
						</button>
						<button className='LoginButton'>
							<Link to='/login'>Zaloguj się</Link>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

Index.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Index);
