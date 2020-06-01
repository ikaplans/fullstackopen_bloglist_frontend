import React, { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import UserInfo from './components/UserInfo';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import NewBlogForm from './components/NewBlogForm';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const noteFormRef = React.createRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    async function getAll() {
      setBlogs(await blogService.getAllAsync());
    }
    getAll();
  }, []);

  const showErrorMessage = (text) => {
    setNotification(text ? { isSuccess: false, text } : null);
  };

  const showSuccessMessage = (text) => {
    setNotification(text ? { isSuccess: true, text } : null);
  };

  const onSubmitNewBlog = async (blog) => {
    try {
      const savedBlog = await blogService.createAsync(blog);
      setBlogs(blogs.concat(savedBlog));
      showSuccessMessage(
        `a blog ${savedBlog.title} by ${savedBlog.author} added`
      );
      setTimeout(() => {
        showSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      showErrorMessage('Error while submitting a new blog');
      setTimeout(() => {
        showErrorMessage(null);
      }, 5000);
    }
  };

  const onLogin = async () => {
    try {
      const user = await loginService.login(username, password);
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      showErrorMessage('Wrong credentials');
      setTimeout(() => {
        showErrorMessage(null);
      }, 5000);
    }
  };

  const onLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
  };

  const onBlogLiked = async (blog) => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      if (blog.user) {
        updatedBlog.user = blog.user.id;
      }
      await blogService.putAsync(updatedBlog);
      setBlogs(
        blogs.map((b) => {
          return b.id === updatedBlog.id ? updatedBlog : b;
        })
      );
      showSuccessMessage(
        `a blog ${updatedBlog.title} by ${updatedBlog.author} updated`
      );
      setTimeout(() => {
        showSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      showErrorMessage('Error while updating a blog');
      setTimeout(() => {
        showErrorMessage(null);
      }, 5000);
    }
  };

  const onBlogDeleted = async (blog) => {
    try {
      if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        return;
      }
      await blogService.deleteAsync(blog);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
      showSuccessMessage(`a blog ${blog.title} by ${blog.author} removed`);
      setTimeout(() => {
        showSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      showErrorMessage('Error while removing a blog');
      setTimeout(() => {
        showErrorMessage(null);
      }, 5000);
    }
  };

  return !user ? (
    <div>
      <Notification message={notification} />
      <LoginForm
        username={username}
        password={password}
        onUsernameChanged={setUsername}
        onPasswordChanged={setPassword}
        onLogin={onLogin}
      />
    </div>
  ) : (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <div id="userInfoPanel">
        <UserInfo user={user} onLogout={onLogout} />
      </div>
      <br />
      <div id="createNewBlogContainer">
        <Togglable
          buttonOpenLabel="create new blog"
          buttonCloseLabel="cancel"
          ref={noteFormRef}
        >
          <NewBlogForm
            onSubmitNewBlog={onSubmitNewBlog}
            noteFormRef={noteFormRef}
          />
        </Togglable>
      </div>
      <br />
      <BlogList
        blogs={blogs.sort((b1, b2) => b2.likes - b1.likes)}
        currentUserName={user.userName}
        onBlogLiked={onBlogLiked}
        onBlogDeleted={onBlogDeleted}
      />
    </div>
  );
};

export default App;
