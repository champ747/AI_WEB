import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './KeywordSearchPage.css';

const KeywordSearchPage = () => {
  const navigate = useNavigate();
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [error, setError] = useState('');

  const handleBack = () => {
    navigate('/home');
  };

  const toggleKeyword = (keyword) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword) ? prev.filter((item) => item !== keyword) : [...prev, keyword]
    );
  };

  const isSelected = (keyword) => selectedKeywords.includes(keyword);

  const handleRecommendClick = async () => {
    // 키워드를 선택하지 않았을 경우, 메시지 표시
    if (selectedKeywords.length === 0) {
      setError('키워드를 하나 이상 선택하세요.');
      return;
    }

    try {
      const category = selectedKeywords.join(',');
      const limit = 10; // 페이지당 항목 수
      const page = 1; // 기본 페이지 설정

      const response = await fetch(
        `https://port-0-back-m341pqyi646021b2.sel4.cloudtype.app/cafes/search?category=${encodeURIComponent(category)}&limit=${limit}&page=${page}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (response.ok) {
        const data = await response.json();
        navigate('/keyword-search-results', { state: { results: data.cafes } });
        console.log('전달 완료');
      } else {
        setError('추천 결과를 불러오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('서버 오류:', error);
      setError('서버 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="keyword-search-container">
      <span className="back-button" onClick={handleBack}>&lt;</span>
      <p className="keword-instruction">찾고 싶은 카페의 키워드를 선택해주세요!</p>

      <div className="keyword-section2">
        <h3 className="keyword-type2">카페 분위기 키워드</h3>
        <div className="keyword-group">
          {['경치가 좋은', '넓은', '사람 많은', '인테리어가 예쁜', '사진 찍기 좋은', '조용한'].map((keyword, index) => (
            <span
              key={index}
              className={`keyword ${isSelected(keyword) ? 'selected' : ''}`}
              onClick={() => toggleKeyword(keyword)}
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {error && <p className="keyword-error-message">{error}</p>}
      <button className="keyword-recommend-button" onClick={handleRecommendClick}>
        카페 추천 받기
      </button>
    </div>
  );
};

export default KeywordSearchPage;
