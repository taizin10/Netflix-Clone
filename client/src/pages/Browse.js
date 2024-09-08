import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Browse() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/videos');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div>
      <h1>Browse Videos</h1>
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video._id} className="video-card">
            <img src={video.thumbnail} alt={video.title} />
            <h3>{video.title}</h3>
            <Link to={`/watch/${video._id}`}>Watch Now</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Browse;
