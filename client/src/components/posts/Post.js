import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Loader from '../layout/Loader';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Post = ({ post: { posts, loading }, getPosts, auth }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return (
		<Fragment>
			{!loading ? (
				<Fragment>
					<PostForm />
					{posts.map((post) => (
						<PostItem key={post._id} post={post} />
					))}
				</Fragment>
			) : (
				<Loader />
			)}
		</Fragment>
	);
};

Post.propTypes = {
	post: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
	auth: state.auth,
});

export default connect(mapStateToProps, {
	getPosts,
})(Post);
