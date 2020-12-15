import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
	const [formData, setFormData] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const {
		school,
		degree,
		fieldofstudy,
		from,
		to,
		current,
		description,
	} = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onChecked = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.checked });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		addEducation(formData, history);
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
					placeholder='Podaj nazwę szkoły'
					name='school'
					value={school}
					onChange={onChange}
				/>
				<input
					type='text'
					placeholder='Podaj stopień'
					name='degree'
					value={degree}
					onChange={onChange}
				/>
				<input
					type='text'
					placeholder='Podaj kierunek studiów'
					name='fieldofstudy'
					value={fieldofstudy}
					onChange={onChange}
				/>
				<input type='date' name='from' value={from} onChange={onChange} />
				<small>Podaj datę rozpoczęcia szkoły</small>
				<input type='date' name='to' value={to} onChange={onChange} />
				<small>Podaj datę zakończenia szkoły</small>
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
					placeholder='Napisz coś o swojej uczelnii'
					value={description}
					onChange={onChange}
				/>
				<small>Opisz np. co Cię pasjonuje na studiach :)</small>
				<button>Dodaj</button>
			</form>
		</Fragment>
	);
};

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
