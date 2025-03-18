import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuthStatus } from '../store/authSlice';

const getUserFromSessionStorage = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const Profile = () => {
  const dispatch = useDispatch();
  const [sessionUser, setSessionUser] = useState(null);  // Set initial state as null
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if the user is authenticated after page load (on refresh or URL change)
    if (isAuthenticated) {
      dispatch(checkAuthStatus());
    }

    // Get user from sessionStorage when the component mounts
    const u = getUserFromSessionStorage();
    if (u) {
      setSessionUser(u);  // Set the sessionUser state to the value from sessionStorage
      console.log(u);  // Optional: For debugging
    } else {
      console.log('No user in sessionStorage');
    }
  }, [dispatch, isAuthenticated]);

  // Render login message if the user is not authenticated
  if (!isAuthenticated && !sessionUser) {
    return <p>Please log in.</p>;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center my-5">
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={sessionUser?.imageUrl || "https://via.placeholder.com/150"}
        className="card-img-top rounded-circle mx-auto mt-3"
        alt="Profile"
        style={{ width: "150px", height: "150px", objectFit: "cover" }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{sessionUser}</h5>
      </div>
    </div>
  </div>
  );
};

export default Profile;
