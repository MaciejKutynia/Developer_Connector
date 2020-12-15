import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';
import Loader from '../layout/Loader';

const GithubRepos = ({
	getGithubRepos,
	profile: {
		profile: { githubusername },
		repos,
	},
}) => {
	useEffect(() => {
		getGithubRepos(githubusername);
	}, [getGithubRepos]);
	return (
		<Fragment>
			{githubusername !== undefined ? (
				<Fragment>
					{repos === null ? (
						<Loader />
					) : (
						<Fragment>
							{repos.length > 0 ? (
								<div className='github-repository'>
									<h1>
										<i className='fab fa-github'></i>Repozytorium Github
									</h1>
									{repos.map((repo) => (
										<div className='single-github-repo' key={repo.id}>
											<div className='single-repository-informations'>
												<h2>
													<a
														href={repo.html_url}
														target='_blank'
														rel='noopener noreferrer'
														style={{ color: 'black' }}>
														{repo.name}
													</a>
												</h2>
												<p>{repo.description}</p>
											</div>
											<div className='single-repository-statistics'>
												<div className='stars'>
													Stars: {repo.stargazers_count}
												</div>
												<div className='watchers'>
													Watchers: {repo.watchers_count}
												</div>
												<div className='forks'>Forks: {repo.forks_count}</div>
											</div>
										</div>
									))}
								</div>
							) : (
								''
							)}
						</Fragment>
					)}
				</Fragment>
			) : (
				''
			)}
		</Fragment>
	);
};

GithubRepos.propTypes = {
	profile: PropTypes.object.isRequired,
	repos: PropTypes.array.isRequired,
	getGithubRepos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getGithubRepos })(GithubRepos);
