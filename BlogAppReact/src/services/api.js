import API_BASE_URL from '../config/api';

const getToken = () => localStorage.getItem('token');

const handleResponse = async (response) => {
  if (response.ok) {
    return response.json();
  } else {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
};

const handleError = (error) => {
  console.error('API call failed:', error);
  if (error instanceof Response) {
    console.error('Response status:', error.status);
  }
  throw error;
};

const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    return await handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const login = (email, password) =>
  apiCall(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

export const register = (name, email, password) =>
  apiCall(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

export const getPosts = () =>
  apiCall(`${API_BASE_URL}/posts`);

export const getPost = (id) =>
  apiCall(`${API_BASE_URL}/posts/${id}`);

export const createPost = (postData) =>
  apiCall(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(postData),
  });

export const updatePost = (id, postData) =>
  apiCall(`${API_BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(postData),
  });

export const deletePost = (id) =>
  apiCall(`${API_BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

export const getUserProfile = () =>
  apiCall(`${API_BASE_URL}/auth/profile`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

export const apiLogin = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseText = await response.text();
    console.log('Full server response:', responseText);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
    }

    try {
      return JSON.parse(responseText);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      throw new Error(`Invalid JSON response from server: ${responseText}`);
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getUserData = async (userId, token) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
};