import React from 'react';
import './CafeDetailInfo.css';

const CafeDetailInfo = ({ cafe }) => {
  if (!cafe) {
    return <div>카페 정보를 불러오는 중입니다...</div>;
  }

  const { address, category, sns_link } = cafe; // 데이터 구조에서 필요한 정보를 추출

  return (
    <div className="cafe-detail-info">
      {/* 카페 주소 */}
      <div className="info-item">
        <span className="info-title">카페 주소</span>
        <span className="info-value">{address || '주소 정보 없음'}</span>
      </div>

      {/* 카페 키워드 */}
      <div className="info-item">
        <span className="info-title">카페 키워드</span>
        <div className="info-keywords">
          {category && category.length > 0 ? (
            category.map((keyword, index) => (
              <span key={index} className="keyword-item">
                {keyword}
              </span>
            ))
          ) : (
            <span className="info-value">키워드 정보 없음</span>
          )}
        </div>
      </div>

      {/* SNS 링크 */}
      <div className="info-item">
        <span className="info-title">SNS</span>
        <span className="info-value">{sns_link?.[0] || 'SNS 정보 없음'}</span>
      </div>
    </div>
  );
};

export default CafeDetailInfo;
