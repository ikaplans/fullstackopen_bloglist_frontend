import React from 'react';
const UserInfo = ({ user, onLogout }) => (
  <div>
    <div>
      {user.name + ' logged in'} <button onClick={onLogout}>logout</button>
    </div>
  </div>
);

export default UserInfo;
