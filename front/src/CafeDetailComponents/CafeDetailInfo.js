import React, { useState, useEffect } from 'react';
import './CafeDetailInfo.css';

const CafeDetailInfo = ({ cafeId }) => {
  const [cafe, setCafe] = useState(null);

  useEffect(() => {
    const fetchCafeInfo = async () => {
      try {
        const response = await fetch(`https://port-0-back-m341pqyi646021b2.sel4.cloudtype.app/cafes/${cafeId}`);
        const data = await response.json();
        setCafe(data.cafe);
      } catch (error) {
        console.error('카페 정보를 가져오는 데 실패했습니다:', error);
      }
    };
    fetchCafeInfo();
  }, [cafeId]);

  if (!cafe) return <p>로딩 중...</p>;

  return (
    <div className="cafe-info-container">
      <h2>{cafe.cafe_name}</h2>
      <p>카페 주소: {cafe.location}</p>
      <div className="cafe-keywords">
        {cafe.category.map((keyword, index) => (
          <span key={index} className="cafe-keyword">{keyword}</span>
        ))}
      </div>
      <p>SNS: {cafe.sns || '없음'}</p>
    </div>
  );
};

export default CafeDetailInfo;
