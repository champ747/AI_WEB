import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CafeDetailInfo from './CafeDetailInfo';
import CafeDetailReviews from './CafeDetailReviews';
import CafeDetailPhotos from './CafeDetailPhotos';
import starIcon from './assets/images/cafe_chuchu_star.png';
import filledHeartIcon from './assets/images/filled_heart_icon.png';
import emptyHeartIcon from './assets/images/empty_heart_icon.png';
import shareIcon from './assets/images/cafe_chuchu_share.png';
import './CafeDetailPage.css';

const CafeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');

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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <button onClick={() => navigate(-1)} className="back-button">&lt;</button>

      <div className="cafedetail-titleimage-container">
        {cafe.image_url && <img src={cafe.image_url} alt={cafe.name} className="cafedetail-titleimag" />}
      </div>

      <div className="cafedetail-name">
        <span className={cafe.name.length > 10 ? 'long-text' : ''}>{cafe.name}</span>
      </div>
      
      <img src={starIcon} alt="Star" className="cafedetail-star-icon" />
      <div className="cafedetail-rating">{cafe.rating}</div>
      <div className="cafedetail-review">리뷰 {cafe.reviews > 999 ? '999+' : cafe.reviews}개</div>
        
      <img src={filledHeartIcon} alt="Heart" className="homecafelist-icon-heart" />
      <img src={shareIcon} alt="Share" className="cafedetail-share-icon" />
      

      <div className="cafedetail-line1"></div>
      <div className="cafedetail-line2"></div>




      <div className="cafe-detail-container">
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

        {activeTab === 'info' && <CafeDetailInfo cafeId={id} />}
        {activeTab === 'reviews' && <CafeDetailReviews cafeId={id} />}
        {activeTab === 'photos' && <CafeDetailPhotos cafeId={id} />}
      </div>
    </div>
  );
};

export default CafeDetailPage;
