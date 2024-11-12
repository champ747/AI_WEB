import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/images/cafe_chuchu_logo.png';
import myPageIcon from '../assets/images/cafe_chuchu_mypage.png';
import shareIcon from '../assets/images/cafe_chuchu_share.png';
import filledHeartIcon from '../assets/images/filled_heart_icon.png';
import emptyHeartIcon from '../assets/images/empty_heart_icon.png';
import starIcon from '../assets/images/cafe_chuchu_star.png';
import './SearchResults.css';

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [likedItems, setLikedItems] = useState({});
  const [error, setError] = useState('');

  // location.state에서 카테고리를 가져오거나 기본값 설정
  const { category } = location.state || { category: '경치가 좋은' };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://port-0-back-m341pqyi646021b2.sel4.cloudtype.app/recommend/cafes/search?category=${encodeURIComponent(category)}`
        );

        if (!response.ok) {
          throw new Error('검색 결과를 불러오는 데 실패했습니다.');
        }

        const data = await response.json();
        setSearchResults(data.cafes); // 'cafes'에 필요한 정보가 들어있다고 가정합니다.

        const initialLikes = data.cafes.reduce((acc, item) => {
          acc[item._id] = false; 
          return acc;
        }, {});
        setLikedItems(initialLikes);
      } catch (error) {
        console.error('검색 결과를 불러오는 중 오류 발생:', error);
        setError('검색 결과를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchSearchResults();
  }, [category]);

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

  const goToKeywordSearch = () => {
    navigate('/keyword-search');
  };

  const goToChatbotSearch = () => {
    navigate('/chatbot-search');
  };

  return (
    <div className="search-results-container">
      {/* 상단 로고 및 메뉴 아이콘 */}
      <img src={logo} alt="Cafe ChuChu" className="search-results-logo" onClick={goToHome} />
      <img src={myPageIcon} alt="My Page" className="search-results_menu-icon" onClick={goToMyPage} />

      {/* 키워드 선택하기 & 챗봇 검색 버튼 */}
      <div className="search-results-buttons">
        <button className="keyword-search-button" onClick={goToKeywordSearch}>키워드 선택하기</button>
        <button className="chatbot-search-button" onClick={goToChatbotSearch}>챗봇에게 물어보기</button>
      </div>

      {/* 오류 메시지 */}
      {error && <p className="error-message">{error}</p>}

      {/* 검색 결과 목록 */}
      <div className="search-results-items">
        {searchResults.map((cafe) => (
          <div key={cafe._id} className="search-results-box">
            <div className="search-results-image-container">
              {cafe.image ? (
                <img
                  src={cafe.image}
                  alt={cafe.name}
                  className="search-results-cafe-image"
                />
              ) : (
                <div className="search-results-no-image">이미지 없음</div>
              )}
            </div>

            <div className="search-results-info">
              <div className="search-results-info-name">{cafe.name}</div>
              <div className="search-results-info-location">{cafe.location}</div>
              <div className="search-results-info-rating">
                {cafe.averageRating !== null && cafe.averageRating !== undefined 
                  ? `${cafe.averageRating.toFixed(1)}`
                  : 'N/A'}
              </div>
            </div>

            <div className="search-results-icons">
              <img src={shareIcon} alt="Share" className="search-results-icon-share" />
            </div>
            <img
              src={likedItems[cafe._id] ? filledHeartIcon : emptyHeartIcon}
              alt="Heart"
              className="search-results-icon-heart"
              onClick={() => toggleLike(cafe._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
