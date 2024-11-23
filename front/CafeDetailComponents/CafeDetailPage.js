import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CafeDetailInfo from './CafeDetailInfo';
import CafeDetailReviews from './CafeDetailReviews';
import CafeDetailPhotos from './CafeDetailPhotos';
import starIcon from '../assets/images/cafe_chuchu_star.png';
import filledHeartIcon from '../assets/images/filled_heart_icon.png';
import emptyHeartIcon from '../assets/images/empty_heart_icon.png';
import shareIcon from '../assets/images/cafe_chuchu_share.png';
import './CafeDetailPage.css';

const CafeDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cafeId = location.state?.cafeId; 
  const [activeTab, setActiveTab] = useState('info');
  const [cafe, setCafe] = useState(null); 
  const [reviews, setReviews] = useState([]); 
  const [error, setError] = useState(''); 

  useEffect(() => {
    const fetchCafeInfo = async () => {
      try {
        // 백엔드에서 데이터 요청
        const response = await fetch(
          `https://port-0-back-m341pqyi646021b2.sel4.cloudtype.app/cafes/${cafeId}`
        );

        if (!response.ok) {
          throw new Error('카페 정보를 불러오는 데 실패했습니다.');
        }

        const data = await response.json();
        console.log('카페 상세 정보:', data);

        setCafe(data.cafe); 
        setReviews(data.reviews || []); 
      } catch (error) {
        console.error('카페 정보를 가져오는 중 오류 발생:', error);
        setError('카페 정보를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchCafeInfo();
  }, [cafeId]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (!cafe) {
    return <div>카페 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div>
      <div className="cafe-detail-container">
        <button onClick={() => navigate(-1)} className="back-button">&lt;</button>

        <div className="cafedetail-titleimage-container">
          {cafe.image_url && <img src={cafe.image_url[0]} alt={cafe.name} className="cafedetail-titleimag" />}
        </div>

        <div className="cafedetail-name">
          <span className={cafe.name.length > 10 ? 'long-text' : ''}>{cafe.name}</span>
        </div>

        <img src={starIcon} alt="Star" className="cafedetail-star-icon" />
        <div className="cafedetail-rating">
          {cafe.rating !== '평점 없음' ? cafe.rating : '평점 없음'}
        </div>
        <div className="cafedetail-review">리뷰 {cafe.reviewCount > 999 ? '999+' : cafe.reviewCount}개</div>

        <img src={filledHeartIcon} alt="Heart" className="cafedetail-heart-icon" />
        <img src={shareIcon} alt="Share" className="cafedetail-share-icon" />

        <div className="cafedetail-line1"></div>
        <div className="cafedetail-line2"></div>

        
        <div className="cafe-detail-header">
          <div className="cafe-detail-tabs">
            <span
              className={activeTab === 'info' ? 'active-tab' : ''}
              onClick={() => handleTabClick('info')}
            >
              정보
            </span>
            <span
              className={activeTab === 'reviews' ? 'active-tab' : ''}
              onClick={() => handleTabClick('reviews')}
            >
              리뷰
            </span>
            <span
              className={activeTab === 'photos' ? 'active-tab' : ''}
              onClick={() => handleTabClick('photos')}
            >
              사진
            </span>
          </div>
        </div>

        {/* 탭별 내용 표시 */}
        {activeTab === 'info' && <CafeDetailInfo cafe={cafe} />}
        {activeTab === 'reviews' && <CafeDetailReviews reviews={reviews} />}
        {activeTab === 'photos' && <CafeDetailPhotos photos={cafe.image_url} />}
        
      </div>
    </div>
  );
};

export default CafeDetailPage;
