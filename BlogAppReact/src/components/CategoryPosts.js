// src/components/CategoryPosts.js
import React from 'react';
import { useParams } from 'react-router-dom';
import BlogList from './BlogList';

function CategoryPosts() {
  const { category } = useParams();

  // In a real app, you would fetch posts for this category from your API
  const posts = [
    // Filtered posts for the category would go here
  ];

  return (
    <div className="category-posts">
      <h2>Posts in category: {category}</h2>
      <BlogList posts={posts} />
    </div>
  );
}

export default CategoryPosts;