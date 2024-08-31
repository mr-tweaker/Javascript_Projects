const API_BASE_URL = 'http://localhost:5000/api';

export default API_BASE_URL;

export const getPosts = async () => {
    const response = await fetch('http://localhost:5000/api/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
};

export const getUserInfo = async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }
    return response.json();
};
  
export const getUserPosts = async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user posts');
    }
    return response.json();
};

// ... other existing functions