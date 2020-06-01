import React from 'react';
import Blog from './Blog';
import PropTypes from 'prop-types';

const BlogList = ({ blogs, onBlogLiked, onBlogDeleted, currentUserName }) => (
  <div id="blogList">
    {blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        canRemove={
          (blog.user || false) && blog.user.userName === currentUserName
        }
        onBlogLiked={onBlogLiked}
        onBlogDeleted={onBlogDeleted}
      />
    ))}
  </div>
);

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  currentUserName: PropTypes.string.isRequired,
  onBlogLiked: PropTypes.func.isRequired,
  onBlogDeleted: PropTypes.func.isRequired,
};

export default BlogList;
