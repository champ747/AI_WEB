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
  const [categoriesInput, setCategoriesInput] = useState({ categories: [] });
  const [error, setError] = useState('');

  // 토큰 가져오기 및 만료 검사
  const getToken = () => {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    // 토큰 만료 시간 검사
    if (tokenExpiration && Date.now() > tokenExpiration) {
      console.error('토큰이 만료되었습니다.');
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      navigate('/login');
      return null;
    }

    if (!token) {
      console.error('토큰이 없습니다.');
      navigate('/login');
      return null;
    }
    return token;
  };

  // 사용자 선호 키워드 가져오기
  const fetchUserPreferences = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await fetch('https://port-0-back-m341pqyi646021b2.sel4.cloudtype.app/users/auth', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.cafe_preferences) {
          setCategoriesInput({ categories: data.cafe_preferences });
        } else {
          setError('사용자 선호 키워드를 찾을 수 없습니다.');
        }
      } else if (response.status === 401) {
        console.error('토큰이 만료되었습니다.');
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        navigate('/login');
      } else {
        setError('사용자 정보를 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('사용자 선호 키워드 가져오기 오류:', error);
      setError('서버 오류 발생');
    }
  };

  // 카페 목록 가져오기
  const fetchCafes = async () => {
    if (categoriesInput.categories.length === 0) {
      setError('카페 선호 키워드를 불러오지 못했습니다.');
      return;
    }

    try {
      const response = await fetch('https://port-0-flask-m39ixlhha27ce70c.sel4.cloudtype.app/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoriesInput)
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setHomecafelist(data);
        } else if (data.home && Array.isArray(data.home)) {
          setHomecafelist(data.home);
        } else {
          setError('카페 목록 형식이 올바르지 않습니다.');
        }
      } else {
        setError(`서버 오류: ${response.status}`);
      }
    } catch (error) {
      console.error('카페 목록 가져오기 오류:', error);
      setError('서버 오류로 인해 카페 목록을 불러오지 못했습니다.');
    }
  };

  // 찜 목록 가져오기
  const fetchFavorites = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await fetch('https://port-0-back-m341pqyi646021b2.sel4.cloudtype.app/favorites', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        const favoritesMap = data.favorites.reduce((acc, item) => {
          acc[item.cafe_id] = true;
          return acc;
        }, {});
        setLikedItems(favoritesMap);
      } else {
        console.error('찜 목록을 불러오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('찜 목록 가져오기 오류:', error);
    }
  };

  // 찜 상태 토글
  const toggleLike = async (cafeId) => {
    const updatedLikedStatus = !likedItems[cafeId];
    setLikedItems((prev) => ({
      ...prev,
      [cafeId]: updatedLikedStatus
    }));

    const token = getToken();
    if (!token) return;

    try {
      await fetch(`https://port-0-back-m341pqyi646021b2.sel4.cloudtype.app/favorites/${cafeId}`, {
        method: updatedLikedStatus ? 'POST' : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('찜 상태 업데이트 오류:', error);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    const initializeData = async () => {
      await fetchUserPreferences();
      await fetchFavorites();
      await fetchCafes();
    };
    initializeData();
  }, [categoriesInput]);

  const goToMyPage = () => navigate('/mypage');
  const goToKeywordSearch = () => navigate('/keyword-search');
  const goToChatbotSearch = () => navigate('/chatbot-search');
  const goToCafeDetail = (id) => navigate(`/cafe-detail/${id}`);

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

      {error && <p className="error-message">{error}</p>}
      
      <div className="homecafelist-items">
        {homecafelist.length > 0 ? (
          homecafelist.map((cafe, index) => (
            <div key={index} className="homecafelist-box" onClick={() => goToCafeDetail(cafe.id)}>
              <img src={cafe.image} alt={cafe.name} className="homecafelist-cafe-image" />
              <div className="homecafelist-info">
                <div className="homecafelist-info-name">{cafe.name}</div>
                <div>{cafe.rating.toFixed(1)}</div>
                <div>리뷰 {cafe.reviews}개</div>
              </div>
              <img
                src={likedItems[cafe.id] ? filledHeartIcon : emptyHeartIcon}
                alt="Heart"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(cafe.id);
                }}
                className="homecafelist-icon-heart"
              />
            </div>
          ))
        ) : (
          <p>카페 목록이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
