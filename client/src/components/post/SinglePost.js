import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from '../layout/Loader';
import { getPostById } from '../../actions/post';
import PropTypes from 'prop-types';
import CommentForm from './CommentForm';
import PostItem from '../posts/PostItem';
import SingleComment from './SingleComment';

const SinglePost = ({ getPostById, match, post: { post } }) => {
	useEffect(() => {
		getPostById(match.params.id);
	}, [getPostById]);

	return (
		<Fragment>
			{post !== null ? (
				<Fragment>
					<div className='back'>
						<a href='/posts'>
							<i className='fas fa-hand-point-left'></i>
						</a>
						<div className='popup'>
							<div className='popuptext'>Powrót</div>
						</div>
					</div>
					<PostItem post={post} showActions={false} />
					<CommentForm id={match.params.id} />
					{post.comments.map((comment) => (
						<SingleComment post={post} comment={comment} key={comment._id} />
					))}
				</Fragment>
			) : (
				<Loader />
			)}
		</Fragment>
	);
};

SinglePost.propTypes = {
	post: PropTypes.object.isRequired,
	getPostById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getPostById })(SinglePost);
