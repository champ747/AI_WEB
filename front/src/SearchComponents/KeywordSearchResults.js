import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/images/cafe_chuchu_logo.png';
import myPageIcon from '../assets/images/cafe_chuchu_mypage.png';
import shareIcon from '../assets/images/cafe_chuchu_share.png';
import filledHeartIcon from '../assets/images/filled_heart_icon.png';
import emptyHeartIcon from '../assets/images/empty_heart_icon.png';
import starIcon from '../assets/images/cafe_chuchu_star.png';
import './KeywordSearchResults.css';

const KeywordSearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [likedItems, setLikedItems] = useState({});
  const [error, setError] = useState('');
  const requestData = location.state?.requestData;

  console.log('받은 데이터:', requestData);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!requestData) {
        setError('요청 데이터가 없습니다.');
        return;
      }

      try {
        const response = await fetch(
          `https://port-0-back-m341pqyi646021b2.sel4.cloudtype.app/cafes/search?category=${encodeURIComponent(
            requestData.categories.join(',')
          )}&limit=10&page=1`
        );

        if (!response.ok) {
          throw new Error('검색 결과를 불러오는 데 실패했습니다.');
        }

        const data = await response.json();
        console.log('API 응답 데이터:', data);

        setSearchResults(data.cafes); 

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
  }, [requestData]);

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

  const closestOrder = () => {

  }

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

      {/* 가까운 순 정령 버튼 */}
      <button className="closest_order-button_X" onClick={closestOrder}>가까운 순으로 정렬하기</button>

      {/* 오류 메시지 */}
      {error && <p className="kresults-error-message">{error}</p>}

      {/* 검색 결과 목록 */}
      <div className="search-results-items">
        {searchResults.map((cafe) => (
          <div key={cafe._id} className="search-results-box">
            <div className="search-results-image-container">
              {cafe.image_url ? (
                <img
                  src={cafe.image_url}
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
              <div className="search-results-info-review">리뷰 {cafe.reviewCount || 0}개</div>
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

export default KeywordSearchResults;
