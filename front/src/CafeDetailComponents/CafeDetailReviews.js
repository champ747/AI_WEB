import React, { useState, useEffect } from 'react';
import profileImage from '../assets/images/cafe_chuchu_profile.png';
import starIcon from '../assets/images/cafe_chuchu_star.png';
import emptyStar from "../assets/images/cafe_chuchu_empty_star.png"; 
import halfStar from "../assets/images/cafe_chuchu_half_star.png";
import './CafeDetailReviews.css';

const CafeDetailReviews = ({ cafeId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [error, setError] = useState('');
  const [hoverRating, setHoverRating] = useState(null);

  // 리뷰 목록 조회
  const fetchReviews = async () => {
    console.log("Fetching reviews for cafeId:", cafeId);
    try {
      const response = await fetch(
        `https://port-0-back-m341pqyi646021b2.sel4.cloudtype.app/reviews/${cafeId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        }
      );
      console.log("Response status:", response.status); 
      if (!response.ok) {
        throw new Error(`Error fetching reviews: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Fetched reviews data:", data); 
      setReviews(data.reviews);
    } catch (err) {
      console.error("Fetch reviews error:", err.message);
      setError("리뷰를 불러오는 중 오류가 발생했습니다.");
    }
  };

  // 리뷰 작성
  const handleCreateReview = async () => {
    if (newReview.length < 5 || newRating === 0) {
      setError('리뷰 내용과 별점을 모두 입력해주세요.');
      return;
    }
  
    try {
      const response = await fetch(
        `https://port-0-back-m341pqyi646021b2.sel4.cloudtype.app/reviews/${cafeId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ content: newReview, rating: newRating }),
        }
      );
  
      if (!response.ok) {
        throw new Error('리뷰 작성에 실패했습니다.');
      }
  
      await fetchReviews();
      setNewReview('');
      setNewRating(0);
      setError(''); // 에러 메시지 초기화
    } catch (err) {
      console.error(err);
      setError('리뷰 작성 중 오류가 발생했습니다.');
    }
  };
  

  // 리뷰 수정
  const handleEditReview = async (reviewId, updatedContent, updatedRating) => {
    try {
      const response = await fetch(
        `https://port-0-back-m341pqyi646021b2.sel4.cloudtype.app/reviews/${reviewId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ content: updatedContent, rating: updatedRating }),
        }
      );

      if (!response.ok) {
        throw new Error('리뷰 수정에 실패했습니다.');
      }

      await fetchReviews();
      setEditingReviewId(null);
    } catch (err) {
      console.error(err);
      setError('리뷰 수정 중 오류가 발생했습니다.');
    }
  };

  // 리뷰 삭제
  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(
        `https://port-0-back-m341pqyi646021b2.sel4.cloudtype.app/reviews/${reviewId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('리뷰 삭제에 실패했습니다.');
      }

      await fetchReviews();
    } catch (err) {
      console.error(err);
      setError('리뷰 삭제 중 오류가 발생했습니다.');
    }
  };

  // 별점 선택 핸들러
  const handleRatingSelect = (rating) => {
    setNewRating(rating);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="reviews-container">
      <span className="review-title">리뷰 작성하기</span>
      <textarea
        className="input-review"
        placeholder="리뷰 내용을 입력하세요"
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
      />

      <div className="star-rating-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            className="star-wrapper"
            onClick={(e) => {
              const rect = e.target.getBoundingClientRect();
              const clickPosition = e.clientX - rect.left;
              const isHalf = clickPosition < rect.width / 2; // 클릭 위치가 별의 중간보다 왼쪽인지 확인
              handleRatingSelect(isHalf ? star - 0.5 : star);
            }}
          >
            {/* 반 채워진 별 */}
            {newRating >= star - 0.5 && newRating < star ? (
              <img src={halfStar} alt="Half Star" className="star" />
            ) : null}
            {/* 채워진 별 */}
            {newRating >= star ? (
              <img src={starIcon} alt="Full Star" className="star" />
            ) : null}
            {/* 빈 별 */}
            {newRating < star - 0.5 ? (
              <img src={emptyStar} alt="Empty Star" className="star" />
            ) : null}
          </div>
        ))}
      </div>


      <button
      className={`create-button ${newReview.length >= 5 && newRating > 0 ? '' : 'disabled'}`}
      onClick={handleCreateReview}
      disabled={newReview.length < 5 || newRating === 0}
      >
        작성
      </button>

      <h3>리뷰 목록</h3>
      {reviews.map((review) => (
        <div key={review._id} className="review-item">
          <img src={profileImage} alt="프로필" className="profile-image" />
          <div className="review-content">
            <div className="review-header">
              <span className="review-username">{review.user_id.name}</span>
              <span className="review-rating">{review.rating} <img src={starIcon} alt="별점" /></span>
            </div>
            {editingReviewId === review._id ? (
              <>
                <textarea
                  defaultValue={review.content}
                  onChange={(e) => setNewReview(e.target.value)}
                />
                <input
                  type="number"
                  defaultValue={review.rating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  min="0"
                  max="5"
                />
                <button onClick={() => handleEditReview(review._id, newReview, newRating)}>저장</button>
                <button onClick={() => setEditingReviewId(null)}>취소</button>
              </>
            ) : (
              <p>{review.content}</p>
            )}
          </div>
          <div className="review-actions">
            <button onClick={() => setEditingReviewId(review._id)}>수정</button>
            <button onClick={() => handleDeleteReview(review._id)}>삭제</button>
          </div>
        </div>
      ))}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CafeDetailReviews;