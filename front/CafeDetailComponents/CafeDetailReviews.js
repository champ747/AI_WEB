import React, { useState, useEffect } from 'react';
import './CafeDetailReviews.css';

const CafeDetailReviews = ({ cafeId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`https://port-0-back-m341pqyi646021b2.sel4.cloudtype.app/cafes/${cafeId}`);
        const data = await response.json();
        setReviews(data.cafe.reviews);
      } catch (error) {
        console.error('리뷰를 가져오는 데 실패했습니다:', error);
      }
    };
    fetchReviews();
  }, [cafeId]);

  return (
    <div className="reviews-container">
      <h3>리뷰 작성하기</h3>
      <div className="review-list">
        {reviews.map((review) => (
          <div key={review._id} className="review-item">
            <p>아이디: {review.user.name}</p>
            <p>평점: {review.rating} ⭐</p>
            <p>{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CafeDetailReviews;
