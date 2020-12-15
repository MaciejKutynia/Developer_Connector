import React from 'react';
import { Link } from 'react-router-dom';

const DashboardButtons = () => {
	return (
		<div className='dashboard-buttons'>
			<Link to='/edit-profile'>
				<button className='edit-profile-button'>Edytuj profil</button>
			</Link>
			<Link to='/add-experience'>
				<button className='add-experience-button'>Dodaj doświadczenie</button>
			</Link>
			<Link to='/add-education'>
				<button className='add-education-button'>Dodaj szkołę</button>
			</Link>
		</div>
	);
};

export default DashboardButtons;
