import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './KeywordSearchPage.css';

const KeywordSearchPage = () => {
  const navigate = useNavigate();

  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const handleBack = () => {
    navigate('/home');
  };

  const toggleKeyword = (keyword) => {
    setSelectedKeywords((prev) => 
      prev.includes(keyword) ? prev.filter((item) => item !== keyword) : [...prev, keyword]
    );
  };

  const isSelected = (keyword) => selectedKeywords.includes(keyword);

  const handleRecommendClick = () => {
    navigate('/search-results');
  };

  return (
    <div className="keyword-search-container">
      <span className="back-button" onClick={handleBack}>&lt;</span>
      <p className="keword-instruction">찾고 싶은 카페의 키워드를 선택해주세요!</p>

      <div className="keyword-section1">
        <h3 className="keyword-type1">카페 환경 키워드</h3>
        <div className="keyword-group">
          
          <span 
            className={`keyword ${isSelected('주차 편리') ? 'selected' : ''}`} 
            onClick={() => toggleKeyword('주차 편리')}
          >
            주차 편리
          </span>
          <span 
            className={`keyword ${isSelected('노키즈존') ? 'selected' : ''}`} 
            onClick={() => toggleKeyword('노키즈존')}
          >
            노키즈존
          </span>
          <span 
            className={`keyword ${isSelected('예스키즈존') ? 'selected' : ''}`} 
            onClick={() => toggleKeyword('예스키즈존')}
          >
            예스키즈존
          </span>
          <span 
            className={`keyword ${isSelected('반려동물 동반 가능') ? 'selected' : ''}`} 
            onClick={() => toggleKeyword('반려동물 동반 가능')}
          >
            반려동물 동반 가능
          </span>
          <span 
            className={`keyword ${isSelected('반려동물 동반 불가능') ? 'selected' : ''}`} 
            onClick={() => toggleKeyword('반려동물 동반 불가능')}
          >
            반려동물 동반 불가능
          </span>
        </div>
      </div>

      <div className="keyword-line"></div>

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
            className={`keyword ${isSelected('혼공하기 좋은') ? 'selected' : ''}`} 
            onClick={() => toggleKeyword('혼공하기 좋은')}
          >
            혼공하기 좋은
          </span>
          <span 
            className={`keyword ${isSelected('단체 모임하기 좋은') ? 'selected' : ''}`} 
            onClick={() => toggleKeyword('단체 모임하기 좋은')}
          >
            단체 모임하기 좋은
          </span>
          <span 
            className={`keyword ${isSelected('조용한') ? 'selected' : ''}`} 
            onClick={() => toggleKeyword('조용한')}
          >
            조용한
          </span>
          <span 
            className={`keyword ${isSelected('특이 테마') ? 'selected' : ''}`} 
            onClick={() => toggleKeyword('특이 테마')}
          >
            특이 테마
          </span>
        </div>
      </div>

      <button className="keyword-recommend-button" onClick={handleRecommendClick}>
        카페 추천 받기
      </button>
    </div>
  );
};

export default KeywordSearchPage;
