// src/components/BlogPost.js
import React from 'react';
import { Link } from 'react-router-dom';

function BlogPost({ id, title, content, categories, tags }) {
  return (
    <article>
      <h1>{title}</h1>
      <div className="metadata">
        <div className="categories">
          {categories.map((category, index) => (
            <Link key={index} to={`/category/${category}`} className="category">
              {category}
            </Link>
          ))}
        </div>
        <div className="tags">
          {tags.map((tag, index) => (
            <Link key={index} to={`/tag/${tag}`} className="tag">
              #{tag}
            </Link>
          ))}
        </div>
      </div>
      <p>{content}</p>
    </article>
  );
}

export default BlogPost;