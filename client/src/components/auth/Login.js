import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
	const [invalidClassName, setInvalidClassName] = useState(true);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const onChangePassword = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		e.target.value.length >= e.target.minLength
			? setInvalidClassName(false)
			: setInvalidClassName(true);
	};

	const onMouseDown = (e) => {
		e.target.previousElementSibling.type = 'text';
	};

	const onMouseUp = (e) => {
		e.target.previousElementSibling.type = 'password';
	};

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	//Redirect if loged in

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Fragment>
			<h1>Zaloguj się</h1>
			<form
				className='loginForm'
				onSubmit={(e) => {
					e.preventDefault();
					login(email, password);
				}}>
				<input
					type='email'
					name='email'
					required
					placeholder='Podaj adres email'
					value={email}
					onChange={onChange}
				/>
				<div className={invalidClassName ? 'input invalid' : 'input'}>
					<input
						type='password'
						name='password'
						required
						placeholder='Podaj hasło'
						minLength='6'
						value={password}
						onChange={onChangePassword}
					/>
					<i
						className='fas fa-eye'
						onMouseDown={onMouseDown}
						onMouseUp={onMouseUp}
						onTouchStart={onMouseDown}
						onTouchEnd={onMouseUp}></i>
				</div>
				<button type='submit'>Zaloguj się</button>
			</form>
			<h3>
				Nie posiadasz jeszcze konta? <Link to='/register'>Zarejestruj się</Link>
			</h3>
		</Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
