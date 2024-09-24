import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import logo from './assets/images/cafe_chuchu_logo.png';
import myPageIcon from './assets/images/cafe_chuchu_mypage.png'; // 마이페이지 아이콘 이미지 경로
import searchIcon from './assets/images/cafe_chuchu_search.png'; // 서치 아이콘 이미지 경로

const HomePage = () => {
  const navigate = useNavigate();

  const goToMyPage = () => {
    navigate('/mypage');
  };

  const goToKeywordSearch = () => {
    navigate('/keyword-search'); // 키워드 검색 페이지로 이동
  };

  const goToChatbotSearch = () => {
    navigate('/chatbot-search'); // 챗봇 검색 페이지로 이동
  };

  return (
    <div className="home-container">      
      <img src={logo} alt="Cafe ChuChu" className="home-logo" />

      <div className="search-bar">
        <input type="text" placeholder=" " className="search-input" />  
      </div>

      <img src={searchIcon} alt="Search" className="search-icon" />
      <img src={myPageIcon} alt="My Page" className='menu-icon' onClick={goToMyPage} />
  
      <button className="keyword-search"onClick={goToKeywordSearch}>키워드로 카페 찾기</button>
      <button className="chatbot-search"onClick={goToChatbotSearch}>챗봇으로 카페 찾기</button>
      
    </div>
  );
};

export default HomePage;
