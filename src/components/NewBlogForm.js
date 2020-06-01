import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewBlogForm = ({ onSubmitNewBlog, noteFormRef }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (noteFormRef) {
      noteFormRef.current.toggleVisibility();
    }
    await onSubmitNewBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };
  return (
    <div>
      <h2>create new</h2>
      <form id="newBlogForm" onSubmit={handleSubmit}>
        <div>
          title
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id="url"
            type="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" id="submitButton">
          create
        </button>
      </form>
    </div>
  );
};

NewBlogForm.propTypes = {
  onSubmitNewBlog: PropTypes.func.isRequired,
};

export default NewBlogForm;
