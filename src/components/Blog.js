import React from 'react';
import Togglable from './Togglable';
import PropTypes from 'prop-types';

const Blog = ({ blog, onBlogLiked, onBlogDeleted, canRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle} id="blogRoot">
      <Togglable
        buttonOpenLabel="view"
        buttonCloseLabel="hide"
        buttonPosition="header"
        header={`${blog.title} by ${blog.author}`}
      >
        <div className="details">
          <div className="url">{blog.url}</div>
          <div className="likes">
            likes {blog.likes}
            <button className={'likeButton'} onClick={() => onBlogLiked(blog)}>
              like
            </button>
          </div>
          <div className="userName"> {blog.user ? blog.user.name : null}</div>
          {canRemove ? (
            <button
              className={'removeButton'}
              onClick={() => onBlogDeleted(blog)}
            >
              remove
            </button>
          ) : null}
        </div>
      </Togglable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onBlogLiked: PropTypes.func.isRequired,
  onBlogDeleted: PropTypes.func.isRequired,
  canRemove: PropTypes.bool.isRequired,
};

export default Blog;
