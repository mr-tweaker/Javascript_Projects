// src/components/TagPosts.js
import React from 'react';
import { useParams } from 'react-router-dom';
import BlogList from './BlogList';

function TagPosts() {
  const { tag } = useParams();

  // In a real app, you would fetch posts for this tag from your API
  const posts = [
    // Filtered posts for the tag would go here
  ];

  return (
    <div className="tag-posts">
      <h2>Posts tagged with: #{tag}</h2>
      <BlogList posts={posts} />
    </div>
  );
}

export default TagPosts;