import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
	auth,
	post: { _id, avatar, name, date, text, comments, likes, user },
	addLike,
	removeLike,
	deletePost,
	showActions,
}) => {
	return (
		<Fragment>
			<div className='single-post'>
				<div className='personal-informations'>
					<Link to={`/profile/${user}`}>
						<div className='image-wrapper'>
							<img src={avatar} alt='Avatar' />
						</div>
					</Link>
					<h4>{name}</h4>
				</div>
				<div className='single-post-content'>{text}</div>
				<div className='single-post-posted-date'>
					Dodano &nbsp; <Moment format='DD.MM.YYYY'>{date}</Moment>
				</div>
				{showActions && (
					<div className='single-post-buttons'>
						<div className='likeButton' onClick={() => addLike(_id)}>
							<i className='fas fa-thumbs-up'></i>
							{likes.length > 0 && likes.length}
						</div>
						<div className='unlikeButton' onClick={() => removeLike(_id)}>
							<i className='fas fa-thumbs-down'></i>
						</div>
						<div className='discussionButton'>
							<Link to={`/post/${_id}`}>
								Dyskusja{comments.length > 0 ? <p>{comments.length}</p> : ''}
							</Link>
						</div>
						{!auth.loading && user === auth.user._id && (
							<div
								className='delete-post-button'
								onClick={() => deletePost(_id)}>
								<i className='fas fa-times'></i>
							</div>
						)}
					</div>
				)}
			</div>
		</Fragment>
	);
};

PostItem.defaultProps = {
	showActions: true,
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
	PostItem
);
