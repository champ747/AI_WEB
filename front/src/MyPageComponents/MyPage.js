import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/cafe_chuchu_logo.png';
import profileImage from '../assets/images/cafe_chuchu_profile.png';
import wishlistImage from '../assets/images/cafe_chuchu_wishlist.png';
import myListImage from '../assets/images/cafe_chuchu_mylist.png';
import visitHistoryImage from '../assets/images/cafe_chuchu_visithistory.png';
import './MyPage.css';

const MyPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const goToHome = () => {
    navigate('/home');
  };

  const goToProfile = () => {
    navigate('/mypage/profile');
  };

  const goToWishlist = () => {
    navigate('/mypage/wishlist');
  };

  const goToMyList = () => {
    navigate('/mypage/my-list');
  };

  const goToVisitHistory = () => {
    navigate('/mypage/visit-history');
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="mypage-container">
      <img src={logo} alt="Cafe ChuChu" className="logo" onClick={goToHome} />
      <div className="profile-picture" onClick={openModal}></div>
      <div className="nickname">닉네임</div>
      <div className="profile-link" onClick={goToProfile}>내 프로필 &gt;</div>
      <div className="line line1"></div>
      <div className="points">내 적립금</div>
      <div className="points-value">원</div>
      <div className="points-link">내역 확인하기 &gt;</div>
      <div className="line line2"></div>
      
      {/* 내 리스트 */}
      <div className="mylist-icon" onClick={goToMyList}>
        <img src={myListImage} alt="My List" />
      </div>
      <div className="my-list" onClick={goToMyList}>내 리스트</div>
      
      {/* 찜 목록 */}
      <div className="wishlist-icon" onClick={goToWishlist}>
        <img src={wishlistImage} alt="Wishlist" />
      </div>
      <div className="wishlist" onClick={goToWishlist}>찜 목록</div>
      
      {/* 방문 기록 */}
      <div className="visit-history-icon" onClick={goToVisitHistory}>
        <img src={visitHistoryImage} alt="Visit History" />
      </div>
      <div className="visit-history" onClick={goToVisitHistory}>방문 기록</div>
      
      <div className="line line3"></div>
      <div className="divider-vertical divider1"></div>
      <div className="divider-vertical divider2"></div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <img src={profileImage} alt="Profile" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
