import React, { useState, useEffect, useRef } from 'react';
import axios from '../axios';
import YouTube from 'react-youtube';
import '../styles/Row.css';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const rowRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      try {
        const response = await axios.get(
          `/movie/${movie.id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        if (response.data.results.length > 0) {
          setTrailerUrl(response.data.results[0].key);
        } else {
          console.log('No trailer found for this movie');
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    }
  };

  const scrollRow = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters-container">
        <button className="row__scroll-button left" onClick={() => scrollRow('left')}>‹</button>
        <div className="row__posters" ref={rowRef}>
          {movies.map(movie => (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name}
            />
          ))}
        </div>
        <button className="row__scroll-button right" onClick={() => scrollRow('right')}>›</button>
      </div>
      {trailerUrl && (
        <div className="row__trailer">
          <div className="row__trailer-container">
            <button className="row__close-trailer" onClick={() => setTrailerUrl('')}>
              ✕
            </button>
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Row;