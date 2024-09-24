import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate 훅 추가
import logo from '../assets/images/cafe_chuchu_logo.png';
import myPageIcon from '../assets/images/cafe_chuchu_mypage.png';
import shareIcon from '../assets/images/cafe_chuchu_share.png';
import filledHeartIcon from '../assets/images/filled_heart_icon.png';
import emptyHeartIcon from '../assets/images/empty_heart_icon.png';
import starIcon from '../assets/images/cafe_chuchu_star.png';  // 별 아이콘 추가
import moreIcon from '../assets/images/cafe_chuchu_more.png';
import './VisitHistoryPage.css';

const VisitHistoryPage = () => {
  const navigate = useNavigate();  // useNavigate 훅 초기화
  const [visitHistory, setVisitHistory] = useState([]);
  const [likedItems, setLikedItems] = useState({});

  useEffect(() => {
    const fetchVisitHistory = async () => {
      try {
        const response = await fetch('http://localhost:5001/visit-history'); // API 경로 수정
        const data = await response.json();
        setVisitHistory(data);
        const initialLikes = data.reduce((acc, item) => {
          acc[item.id] = false;  // 처음에는 하트가 비워져 있도록 설정
          return acc;
        }, {});
        setLikedItems(initialLikes);
      } catch (error) {
        console.error('방문 기록을 불러오는 중 오류 발생:', error);
      }
    };

    fetchVisitHistory();
  }, []);

  const toggleLike = (id) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const goToHome = () => {
    navigate('/home');  // '/home' 경로로 이동
  };

  const goToMyPage = () => {
    navigate('/mypage');  // '/mypage' 경로로 이동
  };

  return (
    <div className="visit-history-container">
      <img src={logo} alt="Cafe ChuChu" className="visit-history-logo" onClick={goToHome} />
      <img src={myPageIcon} alt="My Page" className="visit-history_menu-icon" onClick={goToMyPage} />

      <span className="visit-history-count"> 방문한 카페 {visitHistory.length}개 </span>
      <button className="visit-history-edit">편집</button>

      <div className="visit-history-items">
        {visitHistory.map((cafe) => (
          <div key={cafe.id} className="visit-history-box">
            <div className="visit-history-image-container">
              {cafe.image && (
                <img
                  src={cafe.image}
                  alt={cafe.name}
                  className="visit-history-cafe-image"
                />
              )}
            </div>

            <div className="visit-history-info">
              <div className="visit-history-info-name">{cafe.name}</div>
              <div>
                <img src={starIcon} alt="Star" className="visit-history-star-icon" />
                <div className="visit-history-info-rating">{cafe.rating.toFixed(1)}</div>
                <div className="visit-history-info-review"> 리뷰 {cafe.reviews > 999 ? '999+' : cafe.reviews}개 </div>
              </div>
              <div className="visit-history-info-status">{cafe.status}</div>
              <div className="visit-history_line1"></div>
              <div className="visit-history-info-distance">{cafe.distance}</div>
              <div className="visit-history_line2"></div>
              <div className="visit-history-info-location"> {cafe.location}</div>
            </div>

            <div className="visit-history-icons">
              <img src={shareIcon} alt="Share" className="visit-history-icon-share" />
              <img src={moreIcon} alt="More" className="visit-history-icon-more" />
            </div>
            <img
              src={likedItems[cafe.id] ? filledHeartIcon : emptyHeartIcon}
              alt="Heart"
              className="visit-history-icon-heart"
              onClick={() => toggleLike(cafe.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default VisitHistoryPage;
