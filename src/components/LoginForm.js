import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
  username,
  password,
  onUsernameChanged,
  onPasswordChanged,
  onLogin,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => onUsernameChanged(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => onPasswordChanged(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onUsernameChanged: PropTypes.func.isRequired,
  onPasswordChanged: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
