import React from 'react';

function Home({ isLoggedIn }) {
  return (
    <div>
      <h2>{isLoggedIn ? '홈 화면' : '로그인 전 화면'}</h2>
      <p>{isLoggedIn ? '로그인 되었습니다' : '로그인이 필요합니다'}</p>
    </div>
  );
}

export default Home;