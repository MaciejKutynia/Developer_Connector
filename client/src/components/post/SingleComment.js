import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import Loader from '../layout/Loader';
import { removeComment } from '../../actions/post';

const { Link } = require('react-router-dom');

const SingleComment = ({
	post,
	auth,
	removeComment,
	comment: { text, avatar, date, name, user, _id },
}) => {
	return (
		<Fragment>
			{post !== null ? (
				<div className='singleComment'>
					<div className='personal-informations'>
						<Link to={`/profile/${user}`}>
							<div className='image-wrapper'>
								<img src={avatar} alt='Avatar' />
							</div>
						</Link>
						<h4>{name}</h4>
					</div>
					<div className='comment-content'>{text}</div>
					<div className='comment-posted-date'>
						Dodano <Moment format='DD.MM.YYYY'>{date}</Moment>
					</div>
					{!auth.loading && user === auth.user._id && (
						<div
							className='comment-delete-button'
							onClick={() => removeComment(post._id, _id)}>
							<i className='fas fa-times'></i>
						</div>
					)}
				</div>
			) : (
				<Loader />
			)}
		</Fragment>
	);
};

SingleComment.propTypes = {
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	removeComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { removeComment })(SingleComment);
