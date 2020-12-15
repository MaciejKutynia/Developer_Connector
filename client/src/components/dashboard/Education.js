import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
	const educations = education.map((edu, index) => (
		<tr key={index}>
			<td>{edu.school}</td>
			<td className='hidden'>{edu.degree}</td>
			<td className='hidden'>
				<Moment format='DD.MM.YYYY'>{edu.from}</Moment> -{' '}
				{edu.current ? ' Nadal' : <Moment format='DD.MM.YYYY'>{edu.to}</Moment>}
			</td>
			<td>
				<button
					className='delete-button'
					onClick={() => deleteEducation(edu._id)}>
					<i className='fas fa-trash-alt'></i>Usuń
				</button>
			</td>
		</tr>
	));
	return (
		<Fragment>
			<h3>Edukacja</h3>
			<table className='education-preview'>
				<thead>
					<tr>
						<th>Szkoła</th>
						<th className='hidden'>Stopień</th>
						<th className='hidden'>Lata</th>
						<th>Skasuj</th>
					</tr>
				</thead>
				<tbody>{educations}</tbody>
			</table>
		</Fragment>
	);
};

Education.propTypes = {
	education: PropTypes.array.isRequired,
	deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
