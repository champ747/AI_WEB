import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn }) {
  return (
    <nav>
      <Link to="/">
        <button>홈화면</button>
      </Link>
      {!isLoggedIn && <Link to="/login">
        <button>로그인</button>
      </Link>}
      {!isLoggedIn && <Link to="/register">
        <button>회원가입</button>
      </Link>}
      {isLoggedIn && <Link to="/mypage">
        <button>마이페이지</button>
      </Link>}
    </nav>
  );
}

export default Navbar;