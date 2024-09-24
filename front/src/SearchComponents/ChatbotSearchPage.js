import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatbotSearchPage.css';
import logo from '../assets/images/cafe_chuchu_logo.png';  // 로고 이미지 경로
import searchIcon from '../assets/images/cafe_chuchu_search.png';  // 서치 아이콘 경로

const ChatbotSearchPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <div className="chatbot-container">
      <span className="back-button" onClick={handleBack}>&lt;</span>
      <p className="-instruction">어떤 카페를 찾고 싶은지 알려주세요!</p>
      <div className="chatbot-speech-bubble">
        <span>카페 추천해줘</span>
      </div>

      <div className="recommended-section">
        <h3 className="section-title">아래 카페를 추천드려요!</h3>
        <div className="cafe-card">
          <div className="cafe-image" />
          <div className="cafe-info">
            <span className="cafe-name">카페 이름</span>
            <span className="cafe-rating">★ 0.0 | 리뷰 000개</span>
            <span className="cafe-status">영업 전 | 000m | 대구 북구</span>
          </div>
        </div>
        <div className="cafe-card">
          <div className="cafe-image" />
          <div className="cafe-info">
            <span className="cafe-name">카페 이름</span>
            <span className="cafe-rating">★ 0.0 | 리뷰 999+개</span>
            <span className="cafe-status">영업 중 | 000m | 대구 북구</span>
          </div>
        </div>
      </div>

      <h3 className="section-title">이런 카페는 어떠세요?</h3>
      <div className="alternative-section">
        <div className="cafe-card">
          <div className="cafe-image" />
          <div className="cafe-info">
            <span className="cafe-name">카페 이름</span>
            <span className="cafe-rating">★ 0.0 | 리뷰 000개</span>
            <span className="cafe-status">영업 전 | 000m | 대구 북구</span>
          </div>
        </div>
        <div className="cafe-card">
          <div className="cafe-image" />
          <div className="cafe-info">
            <span className="cafe-name">카페 이름</span>
            <span className="cafe-rating">★ 0.0 | 리뷰 999+개</span>
            <span className="cafe-status">영업 중 | 000m | 대구 북구</span>
          </div>
        </div>
      </div>

      <div className="chatbot-search-bar">
        <input type="text" placeholder=" " className="chatbot-search-input" />
        <img src={searchIcon} alt="Search" className="chatbot-search-icon" />
      </div>
    </div>
  );
};

export default ChatbotSearchPage;
