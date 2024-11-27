import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/cafe_chuchu_logo.png';
import myPageIcon from '../assets/images/cafe_chuchu_mypage.png';
import './BlogReviewSummary.css';

const BlogReviewSummary = () => {
  const navigate = useNavigate();
  const [summarylist, setSummarylist] = useState([]); 
  const [error, setError] = useState('');

  const goToHome = () => navigate('/home');
  const goToMyPage = () => navigate('/mypage');

  // 토큰 가져오기
  const getToken = () => {
    return localStorage.getItem('token');
  };

  useEffect(() => {
    const fetchBlogSummary = async () => {
      const token = getToken();
      if (!token) {
        setError('로그인이 필요합니다.');
        return;
      }
  
      try {
        const response = await fetch(
          `https://port-0-flask-m39ixlhha27ce70c.sel4.cloudtype.app/api/random-blogs?n=50`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (!response.ok) {
          throw new Error('카페 정보를 불러오는 데 실패했습니다.');
        }
  
        const data = await response.json();
        console.log('내돈내산 리뷰 요약:', data);
  
        // 각 항목에 고유 id 추가
        if (data) {
          const dataWithIds = data.map((item, index) => ({
            ...item,
            id: index, // 배열 인덱스를 id로 추가
          }));
          setSummarylist(dataWithIds);
          console.log('내돈내산 리뷰 요약(id 추가):', dataWithIds);
        } else {
          setError('리뷰 데이터가 비어있습니다.');
        }
      } catch (error) {
        console.error('내돈내산 리뷰 요약을 가져오는 중 오류 발생:', error);
        setError('내돈내산 리뷰 요약을 불러오는 중 오류가 발생했습니다.');
      }
    };
  
    fetchBlogSummary();
  }, []);  

  return (
    <div className="blog-summary-container">
      <img src={logo} alt="Cafe ChuChu" className="blog-summary-logo" onClick={goToHome} />
      <p className="blog-summary-instruction">내돈내산 카페 리뷰 AI 요약 모음</p>
      <img src={myPageIcon} alt="My Page" className="blog-summary-menu-icon" onClick={goToMyPage} />

      {/* 리뷰 목록 */}
      {summarylist.length > 0 ? (
        summarylist.map((blogreview) => (
          <div
            key={blogreview.id}
            className="blog-summary-item"
            onClick={() => window.open(blogreview.url, '_blank')} // 클릭 시 새 탭에서 링크 열기
            style={{ cursor: 'pointer' }} // 커서를 포인터로 변경
          >
            <div className="blog-summary-header">
              <span className="blog-summary-title">{blogreview.title}</span>
            </div>
            <div className="blog-summary-content">{blogreview.summary}</div>
          </div>
        ))
      ) : (
        !error && <p className="no-data-message">리뷰 데이터가 없습니다.</p>
      )}
      
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default BlogReviewSummary;
