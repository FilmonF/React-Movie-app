import React, { useEffect, useState } from 'react';
import { fetchMovies, searchMovies } from '../services/api';  // Importing the fetchMovies and searchMovies functions
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);  // Track current page for pagination

  useEffect(() => {
    const fetchAllMovies = async () => {
      setLoading(true);
      let allMovies = [];
      try {
        // Fetch movies across multiple pages
        for (let i = 1; i <= 5; i++) {  // Limit to 5 pages for now, can increase based on your requirement
          const data = await fetchMovies(i);
          allMovies = [...allMovies, ...data];  // Combine all pages' results
        }
        setMovies(allMovies);  // Store all the fetched movies
        setFilteredMovies(allMovies);  // Filtered movies will also be initialized with full data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);  // Only run on initial load

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      let allSearchResults = [];
      try {
        // Fetch search results across multiple pages
        for (let i = 1; i <= 5; i++) {  // Limiting search results to 5 pages for now
          const data = await searchMovies(searchQuery, i);
          allSearchResults = [...allSearchResults, ...data];  // Combine all pages' results
        }
        setMovies(allSearchResults);  // Set all search results to state
        setFilteredMovies(allSearchResults);  // Filtered movies will be initialized with full search results
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (searchQuery.trim()) {
      fetchSearchResults();  // Fetch search results if there's a search query
    } else {
      setMovies([]);  // Reset if no search query
    }
  }, [searchQuery]);  // Run when search query changes

  useEffect(() => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())  // TMDb uses 'title' instead of 'name'
    );
    setFilteredMovies(filtered);
  }, [searchQuery, movies]);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;