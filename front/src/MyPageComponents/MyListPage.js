import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/cafe_chuchu_logo.png';
import myPageIcon from '../assets/images/cafe_chuchu_mypage.png';
import shareIcon from '../assets/images/cafe_chuchu_share.png';
import moreIcon from '../assets/images/cafe_chuchu_more.png';
import './MyListPage.css';

const MyListPage = () => {
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);  // 리스트 데이터를 위한 상태

  // 백엔드에서 데이터를 불러오는 함수
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await fetch('http://localhost:5000/lists');  // 실제 API URL
        const data = await response.json();
        setLists(data);  // 리스트 데이터를 상태로 설정
      } catch (error) {
        console.error('리스트를 불러오는 중 오류 발생:', error);
      }
    };

    fetchLists();
  }, []);

  // 홈으로 이동하는 함수
  const goToHome = () => {
    navigate('/home');
  };

  // 마이페이지로 이동하는 함수
  const goToMyPage = () => {
    navigate('/mypage');
  };

  return (
    <div className="mylist_container">
      <img src={logo} alt="Cafe ChuChu" className="mylist_logo" onClick={goToHome} />
      <img src={myPageIcon} alt="My Page" className="mylist_menu-icon" onClick={goToMyPage} />
      
      {/* 내 리스트 헤더 */}
      <span className="mylist_count"> 전체 리스트 {lists.length}개 </span>
      <span>
        <button className="mylist_add-list">+새 리스트</button>
        <div className="mulist_line"></div>
        <button className="mylist_edit">편집</button>
      </span>

      {/* 리스트 항목들 */}
      <div className="mylist_items">
        {lists.map((list) => (
          <div key={list.id} className="mylist_box">
            <div className="mylist_image-container">
              {/* 리스트에 이미지가 있으면 이미지 표시, 없으면 기본 회색 화면 */}
              {list.image ? (
                <img
                  src={list.image}
                  alt="리스트 이미지"
                  className="mylist_image"
                />
              ) : (
                <div className="mylist_default-image"></div>
              )}
            </div>
            <div className="mylist_info">
              <div className="mylist_info-name">{list.name}</div>
              <div className="mylist_info-count">저장된 카페 {list.count}개</div>
            </div>
            <div className="mylist_icons">
              <img src={shareIcon} alt="Share" className="mylist_icons-sharemore" />
              <img src={moreIcon} alt="More" className="mylist_icons-sharemore" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListPage;
