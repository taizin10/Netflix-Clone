import React, { useState, useEffect } from 'react';
import axios from '../axios';
import requests from '../requests';
import YouTube from 'react-youtube';
import '../styles/Banner.css';

function Banner() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovies(request.data.results);
    }
    fetchData();
  }, []);

  const handleClick = async () => {
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
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
  };

  const opts = {
    height: '500',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const movie = movies[currentIndex];

  return (
    <header className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button" onClick={handleClick}>
            {trailerUrl ? 'Close Trailer' : 'Play'}
          </button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      {trailerUrl && (
        <div className="banner__video">
          <div className="banner__video-container">
            <button className="banner__close-trailer" onClick={() => setTrailerUrl('')}>X</button>
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        </div>
      )}
      <button className="banner__nav banner__nav--left" onClick={handlePrev}>&#10094;</button>
      <button className="banner__nav banner__nav--right" onClick={handleNext}>&#10095;</button>
    </header>
  );
}

export default Banner;