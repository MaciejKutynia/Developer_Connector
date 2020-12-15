import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
	const [formData, setFormData] = useState({
		company: '',
		title: '',
		location: '',
		from: '',
		current: false,
		to: '',
		description: '',
	});

	const { company, title, location, from, to, current, description } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onChecked = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.checked });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		addExperience(formData, history);
	};

	return (
		<Fragment>
			<div className='back'>
				<Link to='/dashboard'>
					<i className='fas fa-hand-point-left'></i>
				</Link>
				<div className='popup'>
					<div className='popuptext'>Powrót</div>
				</div>
			</div>
			<form onSubmit={onSubmit}>
				<input
					type='text'
					placeholder='Podaj nazwę firmy'
					name='company'
					required
					value={company}
					onChange={onChange}
				/>
				<input
					type='text'
					placeholder='Podaj Stanowisko'
					name='title'
					required
					value={title}
					onChange={onChange}
				/>
				<input
					type='text'
					placeholder='Podaj lokalizację firmy'
					name='location'
					value={location}
					onChange={onChange}
				/>
				<input
					type='date'
					name='from'
					required
					value={from}
					onChange={onChange}
				/>
				<small>Podaj datę rozpoczęcia pracy</small>
				<input type='date' name='to' value={to} onChange={onChange} />
				<small>Podaj datę zakończenia pracy</small>
				<span className='current'>
					<input
						type='checkbox'
						name='current'
						value={current}
						onChange={onChecked}
					/>
					<small>Nadal</small>
				</span>
				<input
					type='text'
					name='description'
					placeholder='Napisz coś o swojej pracy'
					value={description}
					onChange={onChange}
				/>
				<small>Opisz np. czym się zajmujesz :)</small>
				<button>Dodaj</button>
			</form>
		</Fragment>
	);
};

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired,
};
export default connect(null, { addExperience })(withRouter(AddExperience));
