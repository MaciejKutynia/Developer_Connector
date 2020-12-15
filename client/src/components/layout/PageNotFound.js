import React, { Fragment } from 'react';

const PageNotFound = (props) => {
	return (
		<Fragment>
			<h2>
				<i className='fas fa-exclamation-triangle'></i>Nie znaleziono strony
			</h2>
			Przepraszamy strona o podanym adresie nie istnieje
		</Fragment>
	);
};

PageNotFound.propTypes = {};

export default PageNotFound;
