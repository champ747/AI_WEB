import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/cafe_chuchu_logo.png';
import profileImage from '../assets/images/cafe_chuchu_profile.png';
import wishlistImage from '../assets/images/cafe_chuchu_wishlist.png';
import myProfileIcon from '../assets/images/cafe_chuchu_myprofile.png';
import maleIcon from '../assets/images/male_icon.png';  
import femaleIcon from '../assets/images/female_icon.png'; 
import './MyPage.css';

const MyPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const goToHome = () => {
    navigate('/home');
  };

  const goToProfileModify = () => {
    navigate('/mypage/profilemoodify');
  };

  const goToWishlist = () => {
    navigate('/mypage/wishlist');
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
      <div className="mypage-id">아이디</div>
      <div className="profilemodify-link" onClick={goToProfileModify}>프로필 수정 &gt;</div>

      <div className="line1"></div>

      {/* 찜 목록 */}
      <img className="wishlist-icon" onClick={goToWishlist} src={wishlistImage} alt="Wishlist" />
      <div className="wishlist-linkname" onClick={goToWishlist}>찜 목록</div>

      <div className="line2"></div>

      {/* 내 프로필 */}
      <img className="myprofile-icon" src={myProfileIcon} alt="My Profile" />
      <div className="myprofile">내 프로필</div>
        
      <span className="profile-title_name">이름</span>
      <div className="myprofile-line1"></div>
      <span className="profile-details_name">홍길동</span>
      <img src={maleIcon} alt="male" className="gender-icon" />

      <span className="profile-title_birth">생년월일</span>
      <div className="myprofile-line2"></div>
      <span className="profile-details_birth">0000년 00월 00일</span>

      <span className="profile-title_phone">전화번호</span>
      <div className="myprofile-line3"></div>
      <span className="profile-details_phone">010-1234-5678</span>

      <span className="profile-title_email">이메일</span>
      <div className="myprofile-line4"></div>
      <span className="profile-details_email">abcd1234@naver.com</span>

      <span className="profile-title_job">직업</span>
      <div className="myprofile-line5"></div>
      <span className="profile-details_job">직장 O</span>

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
