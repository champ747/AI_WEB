import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchResults.css';
import filledHeartIcon from '../assets/images/filled_heart_icon.png';
import emptyHeartIcon from '../assets/images/empty_heart_icon.png';

const SearchResults = () => {
  const navigate = useNavigate();
  const [cafes, setCafes] = useState([]);
  const [likedCafes, setLikedCafes] = useState(new Set());

  useEffect(() => {
    fetch('http://localhost:5000/cafes')
      .then(response => response.json())
      .then(data => setCafes(data))
      .catch(error => console.error('Error fetching cafes:', error));
  }, []);

  const toggleLike = (cafeId) => {
    setLikedCafes((prev) => {
      const newLikes = new Set(prev);
      if (newLikes.has(cafeId)) {
        newLikes.delete(cafeId);
      } else {
        newLikes.add(cafeId);
      }
      return newLikes;
    });
  };

  return (
    <div className="cafes-container">
      {cafes.map((cafe) => (
        <div key={cafe.id} className="cafe-card">
          <div className="cafe-details">
            <div className="cafe-name">{cafe.name}</div>
            <div className="cafe-info">
              ★ {cafe.rating.toFixed(1)} | 리뷰 {cafe.reviews > 999 ? '999+' : cafe.reviews}개
              <span className="cafe-distance">{cafe.distance}</span>
            </div>
          </div>
          <img 
            src={likedCafes.has(cafe.id) ? filledHeartIcon : emptyHeartIcon}
            alt="Like"
            className="like-icon"
            onClick={() => toggleLike(cafe.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
