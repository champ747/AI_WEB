import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import cafeLogo from '../assets/images/cafe_chuchu_logo.png';
import naverLogo from '../assets/images/naver_icon.png';
import kakaoLogo from '../assets/images/kakao_icon.png';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home'); // 로그인 후 홈 화면으로 이동
  };  

  return (
    <div className="login-container">
      <img src={cafeLogo} alt="Cafe ChuChu" className="loginpage-logo" />
      <h2 className="login-title">로그인</h2>
      <input type="text" className="input-label_1" placeholder="아이디 입력" />
      <input type="password" className="input-label_2" placeholder="비밀번호 입력" />
      <button className="login-button login" onClick={handleLogin}>로그인</button>
      
      <Link to="/find-id" className="link_1">아이디 찾기</Link>
      <div className="login-line_1"></div>
      <Link to="/find-password" className="link_2">비밀번호 찾기</Link>
      <div className="login-line_2"></div>
      <Link to="/signup" className="link_3">회원가입</Link>
      
      <button className="login-button naver">
        <img src={naverLogo} alt="Naver" className="icon naver" />
        <span>네이버로 로그인</span>
      </button>
      <button className="login-button kakao">
        <img src={kakaoLogo} alt="Kakao" className="icon kakao" />
        <span>카카오톡으로 로그인</span>
      </button>
    </div>
  );
}

export default LoginPage;
