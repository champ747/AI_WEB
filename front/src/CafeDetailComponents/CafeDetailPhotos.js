import React, { useState, useEffect } from 'react';
import './CafeDetailPhotos.css';

const CafeDetailPhotos = ({ cafeId }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`https://port-0-back-m341pqyi646021b2.sel4.cloudtype.app/cafes/${cafeId}`);
        const data = await response.json();
        setPhotos(data.cafe.photos);
      } catch (error) {
        console.error('사진을 가져오는 데 실패했습니다:', error);
      }
    };
    fetchPhotos();
  }, [cafeId]);

  return (
    <div className="photos-container">
      {photos.map((photo, index) => (
        <img key={index} src={photo.url} alt={`Cafe photo ${index}`} className="cafe-photo" />
      ))}
    </div>
  );
};

export default CafeDetailPhotos;
