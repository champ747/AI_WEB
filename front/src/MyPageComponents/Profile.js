import React from 'react';
import { Link } from 'react-router-dom';

function Profile({ isMyPageIn }) {
    return (
      <nav>
        {isMyPageIn && <Link to="/profilemodify">프로필 수정</Link>}
      </nav>
    );
  }
  
  export default Profile;