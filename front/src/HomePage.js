import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/images/cafe_chuchu_logo.png';
import myPageIcon from './assets/images/cafe_chuchu_mypage.png';
import searchIcon from './assets/images/cafe_chuchu_search.png';
import starIcon from './assets/images/cafe_chuchu_star.png';
import filledHeartIcon from './assets/images/filled_heart_icon.png';
import emptyHeartIcon from './assets/images/empty_heart_icon.png';
import shareIcon from './assets/images/cafe_chuchu_share.png';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [homecafelist, setHomecafelist] = useState([]);
  const [likedItems, setLikedItems] = useState({});

  // 찜 목록을 가져오는 함수
  const fetchFavorites = async () => {
    try {
      const response = await fetch('https://port-0-back-m341pqyi646021b2.sel4.cloudtype.app/favorites', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        const favoritesMap = data.favorites.reduce((acc, item) => {
          acc[item.cafe_id] = true;
          return acc;
        }, {});
        setLikedItems(favoritesMap);
      }
    } catch (error) {
      console.error('찜 목록을 불러오는 중 오류 발생:', error);
    }
  };

  // 카페 목록 가져오기
  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const response = await fetch('http://localhost:5001/home');
        const data = await response.json();
        setHomecafelist(data.home || []);
      } catch (error) {
        console.error('카페 목록을 불러오는 중 오류 발생:', error);
      }
    };

    fetchCafes();
    fetchFavorites();
  }, []);

  // 찜 상태 변경 함수
  const toggleLike = async (cafeId) => {
    const updatedLikedStatus = !likedItems[cafeId];
    setLikedItems((prev) => ({
      ...prev,
      [cafeId]: updatedLikedStatus
    }));

    try {
      const response = await fetch(`https://port-0-back-m341pqyi646021b2.sel4.cloudtype.app/favorites/${cafeId}`, {
        method: updatedLikedStatus ? 'POST' : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('찜 상태 업데이트 실패');
      }
    } catch (error) {
      console.error('찜 상태 업데이트 중 오류 발생:', error);
    }
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

  const goToCafeDetail = (id) => {
    navigate(`/cafe-detail/${id}`);
  };

  return (
    <div className="home-container">
      <img src={logo} alt="Cafe ChuChu" className="home-logo" />

      <div className="search-bar">
        <input type="text" placeholder="어떤 카페를 추천해드릴까요?" className="search-input" />
      </div>

      <img src={searchIcon} alt="Search" className="search-icon" />
      <img src={myPageIcon} alt="My Page" className="menu-icon" onClick={goToMyPage} />

      <button className="keyword-search" onClick={goToKeywordSearch}>키워드로 카페 찾기</button>
      <button className="chatbot-search" onClick={goToChatbotSearch}>챗봇으로 카페 찾기</button>

      <div className="homecafelist-items">
        {homecafelist.map((cafe) => (
          <div
            key={cafe.id}
            className="homecafelist-box"
            onClick={(e) => {
              if (!e.target.closest('.homecafelist-icon-heart') && !e.target.closest('.homecafelist-icon-share')) {
                goToCafeDetail(cafe.id);
              }
            }}
          >
            <div className="homecafelist-image-container">
              {cafe.image && <img src={cafe.image} alt={cafe.name} className="homecafelist-cafe-image" />}
            </div>

            <div className="homecafelist-info">
              <div className="homecafelist-info-name">
                <span className={cafe.name.length > 14 ? 'long-text' : ''}>{cafe.name}</span>
              </div>
              <div>
                <img src={starIcon} alt="Star" className="homecafelist-star-icon" />
                <div className="homecafelist-info-rating">{cafe.rating.toFixed(1)}</div>
                <div className="homecafelist-info-review">리뷰 {cafe.reviews > 999 ? '999+' : cafe.reviews}개</div>
              </div>
              <div className="homecafelist-info-location">{cafe.location}</div>
            </div>

            <div className="homecafelist-icons">
              <img src={shareIcon} alt="Share" className="homecafelist-icon-share" onClick={(e) => e.stopPropagation()} />
            </div>
            <img
              src={likedItems[cafe.id] ? filledHeartIcon : emptyHeartIcon}
              alt="Heart"
              className="homecafelist-icon-heart"
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(cafe.id);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;