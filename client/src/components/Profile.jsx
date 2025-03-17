// /src/pages/Profile.js
import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  if (!isAuthenticated) {
    return <p>Please log in.</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
