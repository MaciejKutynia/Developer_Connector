import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ id, addComment }) => {
	const [text, setText] = useState('');

	return (
		<Fragment>
			<div className='leaveComment'>Zostaw komentarz</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addComment({ text }, id);
					setText('');
				}}>
				<textarea
					name='comment'
					value={text}
					onChange={(e) => setText(e.target.value)}></textarea>
				<button>Wyślij</button>
			</form>
		</Fragment>
	);
};

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
