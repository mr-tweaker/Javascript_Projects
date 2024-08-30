import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/api';

function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <h1>Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
      <Link to="/create-post">Create New Post</Link>
    </div>
  );
}

export default Home;