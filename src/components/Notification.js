import React from 'react';

const Notification = ({ message }) => {
  if (message === null || message === undefined) {
    return null;
  }

  return (
    <div className={message.isSuccess ? 'successMessage' : 'errorMessage'}>
      {message.text}
    </div>
  );
};

export default Notification;
