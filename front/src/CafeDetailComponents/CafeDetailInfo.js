import React from 'react';
import './CafeDetailInfo.css';

const CafeDetailInfo = ({ cafe }) => {
  if (!cafe) {
    return <div>카페 정보를 불러오는 중입니다...</div>;
  }

  const { address, category, sns_link } = cafe;

  return (
    <div className="cafe-detail-info">
      {/* 카페 주소 */}
      <div className="info-item">
        <span className="info-address-title">카페 주소</span>
        <span className="info-address">{address || '주소 정보 없음'}</span>
      </div>

      <div className="info-line1"></div>

      {/* 카페 키워드 */}
      <div className="info-item">
        <span className="info-keyword-title">카페 키워드</span>
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

      <div className="info-line2"></div>

      {/* SNS 링크 */}
      <span className="info-sns-title">SNS</span>
      {sns_link && sns_link[0] !== '링크 없음' ? (
        <a
          href={sns_link[0]} // SNS 링크
          target="_blank" // 새 탭에서 열기
          rel="noopener noreferrer" // 보안 설정
          className="info-sns-link"
        >
          {sns_link[0]}
        </a>
      ) : (
        <span className="info-sns-disabled">링크 없음</span>
      )}

      <div className="info-line3"></div>
    </div>
  );
};

export default CafeDetailInfo;
