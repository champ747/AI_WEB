import React from 'react';
import './CafeDetailInfo.css';

const CafeDetailInfo = () => {
  return (
    <div className="cafe-info">
      <div className="info-item">
        <span className="label">카페 주소</span>
        <span>지도로 보기 &gt;</span>
      </div>
      <div className="info-item">
        <span className="label">영업 시간</span>
        <span className="status">영업 중</span>
      </div>
      <div className="info-item">
        <span className="label">매일 00:00 - 00:00</span>
      </div>
    </div>
  );
};

export default CafeDetailInfo;
