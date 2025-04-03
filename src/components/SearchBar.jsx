import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleClear = () => {
    setSearchQuery('');
  };

  const searchBarContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '10px',
  };

  const searchInputStyle = {
    width: '100%',
    padding: '12px 15px',
    border: '2px solid #ccc',
    borderRadius: '30px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  };

  const searchInputFocusStyle = {
    ...searchInputStyle,
    borderColor: '#007bff',
    boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)',
  };

  const clearButtonStyle = {
    position: 'absolute',
    right: '15px',
    background: 'none',
    border: 'none',
    color: '#888',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '0',
    transition: 'color 0.3s ease',
  };

  const clearButtonHoverStyle = {
    ...clearButtonStyle,
    color: '#ff0000',
  };

  const searchInputPlaceholderStyle = {
    color: '#888',
    fontStyle: 'italic',
  };

  return (
    <div style={searchBarContainerStyle}>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={searchInputStyle}
        onFocus={(e) => (e.target.style = searchInputFocusStyle)}
        onBlur={(e) => (e.target.style = searchInputStyle)}
      />
      {searchQuery && (
        <button
          style={clearButtonStyle}
          onClick={handleClear}
          onMouseEnter={(e) => (e.target.style = clearButtonHoverStyle)}
          onMouseLeave={(e) => (e.target.style = clearButtonStyle)}
        >
          ✖
        </button>
      )}
    </div>
  );
};

export default SearchBar;
