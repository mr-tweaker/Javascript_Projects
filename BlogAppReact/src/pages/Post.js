import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { getPost } from '../services/api';

function Post() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    getPost(id).then(setPost).catch(err => setError('Failed to fetch post'));
  }, [id]);

  if (error) return <div className="error">{error}</div>;
  if (!post) return <div>Loading...</div>;

  return (
    <article>
      <h1>{post.title}</h1>
      <div 
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.content)
        }}
      />
    </article>
  );
}

export default Post;