import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/cafe_chuchu_logo.png';
import myPageIcon from '../assets/images/cafe_chuchu_mypage.png';
import shareIcon from '../assets/images/cafe_chuchu_share.png';
import filledHeartIcon from '../assets/images/filled_heart_icon.png';
import emptyHeartIcon from '../assets/images/empty_heart_icon.png';
import starIcon from '../assets/images/cafe_chuchu_star.png';
import moreIcon from '../assets/images/cafe_chuchu_more.png';
import './SearchResults.css';

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [likedItems, setLikedItems] = useState({});

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch('http://localhost:5000/searchresults');
        const data = await response.json();
        setSearchResults(data);
        const initialLikes = data.reduce((acc, item) => {
          acc[item.id] = false; 
          return acc;
        }, {});
        setLikedItems(initialLikes);
      } catch (error) {
        console.error('검색 결과를 불러오는 중 오류 발생:', error);
      }
    };

    fetchSearchResults();
  }, []);

  const toggleLike = (id) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const goToHome = () => {
    navigate('/home');
  };

  const goToMyPage = () => {
    navigate('/mypage');
  };

  return (
    <div className="search-results-container">
      <img src={logo} alt="Cafe ChuChu" className="search-results-logo" onClick={goToHome} />
      <img src={myPageIcon} alt="My Page" className="search-results_menu-icon" onClick={goToMyPage} />

      <div className="search-results-items">
        {searchResults.map((cafe) => (
          <div key={cafe.id} className="search-results-box">
            <div className="search-results-image-container">
              {cafe.image && (
                <img
                  src={cafe.image}
                  alt={cafe.name}
                  className="search-results-cafe-image"
                />
              )}
            </div>

            <div className="search-results-info">
              <div className="search-results-info-name">{cafe.name}</div>
              <div>
                <img src={starIcon} alt="Star" className="search-results-star-icon" />
                <div className="search-results-info-rating">{cafe.rating.toFixed(1)}</div>
                <div className="search-results-info-review"> 리뷰 {cafe.reviews > 999 ? '999+' : cafe.reviews}개 </div>
              </div>
              <div className={cafe.status === '영업 중' ? 'search-results-info-status_open' : 'search-results-info-status_close'}>
                {cafe.status}
              </div>
              <div className="search-results-line"></div>
              <div className="search-results-info-location"> {cafe.location}</div>
            </div>

            <div className="search-results-icons">
              <img src={shareIcon} alt="Share" className="search-results-icon-share" />
              <img src={moreIcon} alt="More" className="search-results-icon-more" />
            </div>
            <img
              src={likedItems[cafe.id] ? filledHeartIcon : emptyHeartIcon}
              alt="Heart"
              className="search-results-icon-heart"
              onClick={() => toggleLike(cafe.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
