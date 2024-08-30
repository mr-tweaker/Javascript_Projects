import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, updatePost, getPost } from '../services/api';
import RichTextEditor from './RichTextEditor';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const post = await getPost(id);
          setTitle(post.title);
          setContent(post.content);
          setCategories(post.categories.join(', '));
          setTags(post.tags.join(', '));
        } catch (err) {
          setError('Failed to fetch post');
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const postData = {
      title,
      content,
      categories: categories.split(',').map(c => c.trim()),
      tags: tags.split(',').map(t => t.trim()),
    };
    try {
      if (id) {
        await updatePost(id, postData);
      } else {
        await createPost(postData);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="post-form">
      <h2>{id ? 'Edit Post' : 'Create New Post'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <RichTextEditor
            value={content}
            onChange={setContent}
          />
        </div>
        <div>
          <label htmlFor="categories">Categories (comma-separated):</label>
          <input
            type="text"
            id="categories"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="tags">Tags (comma-separated):</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button type="submit">{id ? 'Update Post' : 'Create Post'}</button>
      </form>
    </div>
  );
}

export default PostForm;