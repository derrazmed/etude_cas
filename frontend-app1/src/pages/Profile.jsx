import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminEvents from '../components/AdminEvents';

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  const userData = user.user || user;

  return (
    <div>
      <h2>My Profile</h2>
      <p><strong>Full Name:</strong> {userData.fullName}</p>
      <p><strong>Email:</strong> {userData.email}</p>

      {userData.isAdmin && (
        <div>
          <h3>Admin Panel</h3>
          <AdminEvents />
        </div>
      )}
    </div>
  );
}

export default Profile;
