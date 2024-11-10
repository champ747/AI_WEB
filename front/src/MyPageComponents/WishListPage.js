import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import logo from '../assets/images/cafe_chuchu_logo.png';
import myPageIcon from '../assets/images/cafe_chuchu_mypage.png';
import shareIcon from '../assets/images/cafe_chuchu_share.png';
import filledHeartIcon from '../assets/images/filled_heart_icon.png';
import emptyHeartIcon from '../assets/images/empty_heart_icon.png';
import starIcon from '../assets/images/cafe_chuchu_star.png';  
import './WishListPage.css';

const WishListPage = () => {
  const navigate = useNavigate();  
  const [wishlist, setWishlist] = useState([]);
  const [likedItems, setLikedItems] = useState({});

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch('http://localhost:5000/wishlist');
        const data = await response.json();
        setWishlist(data);
        const initialLikes = data.reduce((acc, item) => {
          acc[item.id] = true;
          return acc;
        }, {});
        setLikedItems(initialLikes);
      } catch (error) {
        console.error('찜 목록을 불러오는 중 오류 발생:', error);
      }
    };

    fetchWishlist();
  }, []);

  const toggleLike = (id) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const goToHome = () => {
    navigate('/home'); 
  };

  const goToMyPage = () => {
    navigate('/mypage');  
  };

  const goToCafeDetail = (id) => {
    navigate(`/cafe-detail/${id}`);
  };

  return (
    <div className="wishlist-container">
      <img src={logo} alt="Cafe ChuChu" className="wishlist-logo" onClick={goToHome} />
      <img src={myPageIcon} alt="My Page" className="wishlist_menu-icon" onClick={goToMyPage} />

      <span className="wishlist-count"> 찜한 카페 {wishlist.length}개 </span>
      <button className="wishlist-edit">편집</button>

      <div className="wishlist-items">
        {wishlist.map((cafe) => (
          <div
            key={cafe.id}
            className="wishlist-box"
            onClick={(e) => {
              if (!e.target.closest('.wishlist-icon-heart') && !e.target.closest('.wishlist-icon-share')) {
                goToCafeDetail(cafe.id);
              }
            }}
          >
            <div className="wishlist-image-container">
              {cafe.image && (
                <img
                  src={cafe.image}
                  alt={cafe.name}
                  className="wishlist-cafe-image"
                />
              )}
            </div>

            <div className="wishlist-info">
              <div className="wishlist-info-name">{cafe.name}</div>
              <div>
                <img src={starIcon} alt="Star" className="wishlist-star-icon" />
                <div className="wishlist-info-rating">{cafe.rating.toFixed(1)}</div>
                <div className="wishlist-info-review"> 리뷰 {cafe.reviews > 999 ? '999+' : cafe.reviews}개 </div>
              </div>
              <div className={cafe.status === '영업 중' ? 'wishlist-info-status_open' : 'wishlist-info-status_close'}>
                {cafe.status}
              </div>
              <div className="wishlist_line"></div>
              <div className="wishlist-info-location"> {cafe.location}</div>
            </div>

            <div className="wishlist-icons">
              <img src={shareIcon} alt="Share" className="wishlist-icon-share" onClick={(e) => e.stopPropagation()} />
            </div>
            <img
              src={likedItems[cafe.id] ? filledHeartIcon : emptyHeartIcon}
              alt="Heart"
              className="wishlist-icon-heart"
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(cafe.id);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishListPage;
