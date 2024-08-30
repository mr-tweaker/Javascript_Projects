// src/components/SearchResults.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function SearchResults() {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  useEffect(() => {
    // This is where you'd typically fetch search results from your API
    // For this example, we'll use mock data
    const mockSearch = (q) => {
      const allPosts = [
        { id: 1, title: 'First Blog Post', content: 'This is the first blog post content.' },
        { id: 2, title: 'Second Blog Post', content: 'This is the second blog post content.' },
        { id: 3, title: 'Third Blog Post', content: 'This is the third blog post content.' },
      ];
      return allPosts.filter(post => 
        post.title.toLowerCase().includes(q.toLowerCase()) || 
        post.content.toLowerCase().includes(q.toLowerCase())
      );
    };

    setResults(mockSearch(query));
  }, [query]);

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map(post => (
            <li key={post.id}>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
              <p>{post.content.substring(0, 100)}...</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;