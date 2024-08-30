import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserProfile, getPosts } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function UserDashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user && user.userId) {
          const info = await getUserProfile(user.userId);
          setUserInfo(info);
          const posts = await getPosts();
          setUserPosts(posts.filter(post => post.userId === user.userId));
        } else {
          setError('User information is not available');
        }
      } catch (err) {
        setError('Failed to fetch user data');
        console.error(err);
      }
    };

    fetchUserData();
  }, [user]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-dashboard">
      <h1>Welcome to Your Dashboard</h1>
      <div className="user-info">
        <h2>Your Information</h2>
        <p>Name: {userInfo.name}</p>
        <p>Email: {userInfo.email}</p>
      </div>
      <div className="user-posts">
        <h2>Your Posts</h2>
        {userPosts.length === 0 ? (
          <p>You haven't created any posts yet.</p>
        ) : (
          <ul>
            {userPosts.map(post => (
              <li key={post._id}>
                <Link to={`/post/${post._id}`}>{post.title}</Link>
                <Link to={`/edit-post/${post._id}`}>Edit</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Link to="/create-post">Create New Post</Link>
    </div>
  );
}

export default UserDashboard;