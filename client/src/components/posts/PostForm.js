import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
	const [text, setText] = useState('');
	const onSubmit = (e) => {
		e.preventDefault();
		addPost({ text });
		setText('');
	};
	return (
		<Fragment>
			<h2>
				<i className='fas fa-user-friends'></i>Witaj na naszym forum
			</h2>
			<h3>Co u Ciebie słychać? ...</h3>
			<form onSubmit={(e) => onSubmit(e)}>
				<textarea
					name='text'
					required
					placeholder='Napisz post'
					value={text}
					onChange={(e) => setText(e.target.value)}></textarea>
				<button>Wyślij</button>
			</form>
		</Fragment>
	);
};

PostForm.propTypes = {
	post: PropTypes.object.isRequired,
	addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
