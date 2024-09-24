import React, { useState } from 'react';
import CafeDetailInfo from './CafeDetailInfo';
import CafeDetailMenu from './CafeDetailMenu';
import CafeDetailReviews from './CafeDetailReviews';
import CafeDetailPhotos from './CafeDetailPhotos';
import './CafeDetailPage.css';

const CafeDetailPage = () => {
  const [selectedTab, setSelectedTab] = useState('info');

  return (
    <div className="cafe-detail-container">
      <span className="back-button" onClick={() => window.history.back()}>&lt;</span>
      <div className="cafe-header">
        <div className="cafe-name">카페 이름</div>
        <div className="cafe-rating">
          ★ 0.0 <span>리뷰 000개</span>
        </div>
      </div>

      <div className="cafe-tabs">
        <span onClick={() => setSelectedTab('info')} className={selectedTab === 'info' ? 'selected' : ''}>정보</span>
        <span onClick={() => setSelectedTab('menu')} className={selectedTab === 'menu' ? 'selected' : ''}>메뉴</span>
        <span onClick={() => setSelectedTab('reviews')} className={selectedTab === 'reviews' ? 'selected' : ''}>리뷰</span>
        <span onClick={() => setSelectedTab('photos')} className={selectedTab === 'photos' ? 'selected' : ''}>사진</span>
      </div>

      <div className="cafe-content">
        {selectedTab === 'info' && <CafeDetailInfo />}
        {selectedTab === 'menu' && <CafeDetailMenu />}
        {selectedTab === 'reviews' && <CafeDetailReviews />}
        {selectedTab === 'photos' && <CafeDetailPhotos />}
      </div>
    </div>
  );
};

export default CafeDetailPage;
