import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';

const Experience = ({ experience, deleteExperience }) => {
	const experiences = experience.map((exp, index) => (
		<tr key={index}>
			<td>{exp.company}</td>
			<td className='hidden'>{exp.title}</td>
			<td className='hidden'>
				<Moment format='DD.MM.YYYY'>{exp.from}</Moment> -{' '}
				{exp.current ? ' Nadal' : <Moment format='DD.MM.YYYY'>{exp.to}</Moment>}
			</td>
			<td>
				<button
					className='delete-button'
					onClick={() => deleteExperience(exp._id)}>
					<i className='fas fa-trash-alt'></i>Usuń
				</button>
			</td>
		</tr>
	));
	return (
		<Fragment>
			<h3>Doświadczenie</h3>
			<table className='experience-preview'>
				<thead>
					<tr>
						<th>Firma</th>
						<th className='hidden'>Stanowisko</th>
						<th className='hidden'>Lata</th>
						<th>Skasuj</th>
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</Fragment>
	);
};

Experience.propTypes = {
	experience: PropTypes.array.isRequired,
	deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
