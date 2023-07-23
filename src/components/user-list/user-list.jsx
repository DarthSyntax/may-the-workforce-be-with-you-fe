import React from 'react';
import './user-list.css';
import User from '../user/user';

const UserList = ({ users }) => {
  return (
    <div className='user-list'>
      {users?.map((user) => (
        <User key={user.id} userInfo={user} />
      ))}
    </div>
  );
};

export default UserList;
