import React from 'react';
import './user.css';

const User = ({ userInfo }) => {
  return (
    <div className='user-listing'>
      <span>{userInfo.full_name}</span>
      <br />
      <span>{userInfo.email}</span>
      <br />
      <br />
    </div>
  );
};

export default User;
