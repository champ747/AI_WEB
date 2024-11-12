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
    try {
      const response = await fetch('https://port-0-back-m341pqyi646021b2.sel4.cloudtype.app/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords: selectedKeywords })
      });

      if (response.ok) {
        const data = await response.json();
        navigate('/search-results', { state: { results: data.results } });
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
          <span 
            className={`keyword ${isSelected('경치가 좋은') ? 'selected' : ''}`} 
            onClick={() => toggleKeyword('경치가 좋은')}
          >
            경치가 좋은
          </span>
          <span 
            className={`keyword ${isSelected('넓은') ? 'selected' : ''}`} 
            onClick={() => toggleKeyword('넓은')}
          >
            넓은
          </span>
          <span 
            className={`keyword ${isSelected('사람 많은') ? 'selected' : ''}`} 
            onClick={() => toggleKeyword('사람 많은')}
          >
            사람 많은
          </span>
          <span 
            className={`keyword ${isSelected('인테리어가 예쁜') ? 'selected' : ''}`} 
            onClick={() => toggleKeyword('인테리어가 예쁜')}
          >
            인테리어가 예쁜
          </span>
          <span 
            className={`keyword ${isSelected('사진 찍기 좋은') ? 'selected' : ''}`} 
            onClick={() => toggleKeyword('사진 찍기 좋은')}
          >
            사진 찍기 좋은
          </span>
          <span 
            className={`keyword ${isSelected('조용한') ? 'selected' : ''}`} 
            onClick={() => toggleKeyword('조용한')}
          >
            조용한
          </span>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}
      <button className="keyword-recommend-button" onClick={handleRecommendClick}>
        카페 추천 받기
      </button>
    </div>
  );
};

export default KeywordSearchPage;
