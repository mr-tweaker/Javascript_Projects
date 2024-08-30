import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/api';

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ul className="blog-list">
      {posts.map(post => (
        <li key={post._id}>
          <Link to={`/post/${post._id}`}>{post.title}</Link>
          <div className="post-metadata">
            <span className="author">By: {post.author.name}</span>
            <span className="categories">
              {post.categories.map((category, index) => (
                <Link key={index} to={`/category/${category}`} className="category">
                  {category}
                </Link>
              ))}
            </span>
            <span className="tags">
              {post.tags.map((tag, index) => (
                <Link key={index} to={`/tag/${tag}`} className="tag">
                  #{tag}
                </Link>
              ))}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default BlogList;