import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '7e0d4edd3ff052f65c9e2ecf5036a5c8';

export const fetchMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    return response.data.results;  // Fetch and return the list of movies
  } catch (error) {
    throw new Error('Failed to fetch movies. Please try again later.');
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
    return response.data.results;  // Fetch and return the list of movies based on search
  } catch (error) {
    throw new Error('Failed to fetch search results. Please try again later.');
  }
};
