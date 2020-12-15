import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { GuestItems } from './GuestItems';
import { AuthItems } from './AuthItems';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const [state, setState] = useState({ isOpen: false });
	const clickHandle = () => {
		setState({ isOpen: !state.isOpen });
	};
	const closeNav = () => {
		setState({ isOpen: false });
	};

	const authLinks = (
		<ul className='nav-links'>
			{AuthItems.map((item, index) => (
				<Link to={item.link} key={index} onClick={item.onClick ? logout : ''}>
					<li onClick={closeNav}>
						<i className={item.iClass}></i>
						{item.title}
					</li>
				</Link>
			))}
		</ul>
	);

	const guestLinks = (
		<ul className='nav-links'>
			{GuestItems.map((item, index) => (
				<Link to={item.link} key={index}>
					<li onClick={closeNav}>
						<i className={item.iClass}></i>
						{item.title}
					</li>
				</Link>
			))}
		</ul>
	);

	return (
		<Fragment>
			<div className='hamburger' onClick={clickHandle}>
				<div className={state.isOpen ? 'line open' : 'line'}></div>
				<div className={state.isOpen ? 'line open' : 'line'}></div>
				<div className={state.isOpen ? 'line open' : 'line'}></div>
			</div>
			<nav className={state.isOpen ? 'open' : ''}>
				<div className='logo' onClick={closeNav}>
					<Link to='/'>
						<i className='fab fa-connectdevelop'></i>Developer Connector
					</Link>
				</div>
				{!loading && (
					<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
				)}
			</nav>
		</Fragment>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
