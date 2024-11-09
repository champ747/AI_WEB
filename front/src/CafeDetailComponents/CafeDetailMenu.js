import React from 'react';
import './CafeDetailMenu.css';

const CafeDetailMenu = () => {
  return (
    <div className="cafe-menu">
      <div className="menu-item">
        <div className="menu-image"></div>
        <div className="menu-name">메뉴 이름</div>
        <div className="menu-price">₩ 가격</div>
      </div>
    </div>
  );
};

export default CafeDetailMenu;
