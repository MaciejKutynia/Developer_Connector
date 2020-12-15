import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [invalidClassNamePassword, setInvalidClassNamePassword] = useState(
		true
	);
	const [invalidClassName, setInvalidClassName] = useState(true);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		repeatPassword: '',
	});

	const { name, email, password, repeatPassword } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onChangePassword = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		if (e.target.name === 'password') {
			e.target.value.length >= e.target.minLength
				? setInvalidClassNamePassword(false)
				: setInvalidClassNamePassword(true);
		} else {
			e.target.value.length >= e.target.minLength
				? setInvalidClassName(false)
				: setInvalidClassName(true);
		}
	};

	const onMouseDown = (evt) => {
		evt.target.previousElementSibling.type = 'text';
	};

	const onMouseUp = (evt) => {
		evt.target.previousElementSibling.type = 'password';
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== repeatPassword) {
			setAlert('Hasła nie są identyczne', 'danger', 2000);
		} else {
			register({
				name,
				email,
				password,
			});
		}
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Fragment>
			<h1>Zarejestruj się</h1>
			<form className='registrationForm' onSubmit={(e) => onSubmit(e)}>
				<input
					type='text'
					placeholder='Podaj imię'
					name='name'
					required
					value={name}
					onChange={onChange}
				/>
				<input
					type='email'
					required
					placeholder='podaj adres e-mail'
					name='email'
					value={email}
					onChange={onChange}
				/>
				<div className={invalidClassNamePassword ? 'input invalid' : 'input'}>
					<input
						type='password'
						required
						minLength='6'
						placeholder='Podaj hasło'
						name='password'
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
				<div className={invalidClassName ? 'input invalid' : 'input'}>
					<input
						type='password'
						required
						minLength='6'
						placeholder='Powtórz hasło'
						name='repeatPassword'
						value={repeatPassword}
						onChange={onChangePassword}
					/>
					<i
						className='fas fa-eye'
						onMouseDown={onMouseDown}
						onMouseUp={onMouseUp}
						onTouchStart={onMouseDown}
						onTouchEnd={onMouseUp}></i>
				</div>
				<button type='submit'>Zarejestruj się</button>
			</form>
			<h3>
				Masz już konto? <Link to='/login'>Zaloguj się</Link>
			</h3>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
