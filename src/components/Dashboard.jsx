import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    console.log(userData);
  }, [])

  return (
    <>
      <h2>Dashboard</h2>
      {userData ? (
        <div>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
      ) : (
        <p>No user data found. Please log in.</p>
      )}
    </>
  );
};

export default Dashboard;
