import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';
import checkIcon from '../assets/images/cafe_chuchu_check.png';  // 체크 아이콘
import maleIcon from '../assets/images/male_icon.png';  // 남자 아이콘
import femaleIcon from '../assets/images/female_icon.png';  // 여자 아이콘
import cafeLogo from '../assets/images/cafe_chuchu_logo.png';
import checkIconO from '../assets/images/cafe_chuchu_password_check-O.png';
import checkIconX from '../assets/images/cafe_chuchu_password_check-X.png';

const SignupPage = () => {
  const navigate = useNavigate();
  const [isIdChecked, setIsIdChecked] = useState(false);  // 중복확인 상태
  const [isIdDuplicate, setIsIdDuplicate] = useState(null); // 중복 여부
  const [idValue, setIdValue] = useState(''); // 아이디 값 상태
  const [password, setPassword] = useState('');                      //비밀번호 확인
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');  // 성별 선택 상태
  const [selectedJob, setSelectedJob] = useState('');  // 직업 선택 상태
  const [birth_year, setBirthYear] = useState(2000);
  const [birth_month, setBirthMonth] = useState(1);
  const [brith_day, setBirthDay] = useState(1);

  const handleIdCheck = () => {
    // 중복확인 로직
    const isDuplicate = true; 
    setIsIdDuplicate(isDuplicate); 
    setIsIdChecked(!isDuplicate); // 중복이 아닐 때만 중복확인 완료 상태로 설정
  };

  const handleIdChange = (e) => {
    setIdValue(e.target.value);
    if (isIdChecked) {
      setIsIdChecked(false);
      setIsIdDuplicate(null);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsPasswordMatched(e.target.value === passwordCheck);
  };

  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
    setIsPasswordMatched(password === e.target.value);
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  const yearChange = (event) => {
    const value = event.target.value;
    setBirthYear(value);
  };

  const monthChange = (event) => {
    const value = event.target.value;
    setBirthMonth(value);
  };

  const dayChange = (event) => {
    const value = event.target.value;
    setBirthDay(value);
  };

  return (
    <div className="signup-container">
      <img src={cafeLogo} alt="Cafe ChuChu" className="signuppage-logo" onClick={() => navigate('/login')} />

      <p className="text-id">아이디</p>
      <input
        type="text"
        placeholder="아이디"
        className="input-box_id"
        value={idValue || ''}  // 초기값을 빈 문자열로 설정
        onChange={handleIdChange}
      />

      {/* 중복확인 버튼 */}
      {!isIdChecked && (
        <button className="check-button" onClick={handleIdCheck}>중복확인</button>
      )}

      {/* 아이디 중복 여부에 따라 메시지와 아이콘 표시 */}
      {isIdChecked && !isIdDuplicate && (
        <div className="check-complete">
          중복확인
        </div>
      )}

      {isIdChecked && isIdDuplicate && (
        <p className="check-duplicate">*중복된 아이디입니다</p>
      )}

      {isIdChecked && !isIdDuplicate && (
        <img src={checkIcon} alt="중복확인 Check" className="check-complete_icon" />
      )}

      <p className="text-password">비밀번호</p>
      <input
        type="password"
        placeholder="비밀번호"
        className="input-box_password"
        value={password || ''}  // 초기값을 빈 문자열로 설정
        onChange={handlePasswordChange}
      />
      <p className="text-passwordcheck">비밀번호 확인</p>
      <input
        type="password"
        placeholder="비밀번호 확인"
        className="input-box_passwordcheck"
        value={passwordCheck || ''}  // 초기값을 빈 문자열로 설정
        onChange={handlePasswordCheckChange}
      />
      {passwordCheck && (
        <img
          src={isPasswordMatched ? checkIconO : checkIconX}
          alt={isPasswordMatched ? "비밀번호 일치" : "비밀번호 불일치"}
          className="password_check-icon"
        />
      )}

      <p className="text-name">이름</p>
      <input type="text" placeholder="이름" className="input-box_name" />

      <p className="text-gender">성별</p>  
      <img src={maleIcon} alt="Male" className="male-icon" />
      <img src={femaleIcon} alt="Female" className="female-icon" />

      <button
        className={`male-button ${selectedGender === 'male' ? 'select-male-button' : ''}`}
        onClick={() => handleGenderSelect('male')}
      ></button>
      <span className={`male-button_span ${selectedGender === 'male' ? 'select-male-button_span' : ''}`}
        onClick={() => handleGenderSelect('male')}
      >남</span>

      <button
        className={`female-button ${selectedGender === 'female' ? 'select-female-button' : ''}`}
        onClick={() => handleGenderSelect('female')}
      ></button>
      <span className={`female-button_span ${selectedGender === 'female' ? 'select-female-button_span' : ''}`}
        onClick={() => handleGenderSelect('female')}
      >여</span>
      
      
      <p className="text-birth">생년월일</p>
      <input type="number" min="1900" max="2050" value={birth_year} onChange={yearChange} className="input-box_birth_year" />
      <p className="text-birth_year">년</p>
      <input type="number" min="1" max="12" value={birth_month} onChange={monthChange} className="input-box_birth_month" />
      <p className="text-birth_month">월</p>
      <input type="number" min="1" max="31" value={brith_day} onChange={dayChange} className="input-box_birth_day" />
      <p className="text-birth_day">일</p>

      <p className="text-phonenumber">전화번호</p>
      <input type="tel" placeholder="전화번호" className="input-box_phonenumber" />
      <button className="phonecheck-button">인증</button>


      <p className="text-certifynumber">인증번호</p>
      <input type="text" placeholder="인증번호" className="input-box_certifynumber" />
      <button className="certifycheck-button">확인</button>

      <p className="text-email">이메일</p>
      <input type="email" placeholder="이메일" className="input-box_email" />
     
      <p className="text-job">직업</p>
      <button
        className={`job_O-button ${selectedJob === '직장O' ? 'select-job_O-button' : ''}`}
        onClick={() => handleJobSelect('직장O')}
      >
        직장 O
      </button>
      <button
        className={`job_X-button ${selectedJob === '직장X' ? 'select-job_X-button' : ''}`}
        onClick={() => handleJobSelect('직장X')}
      >
       직장 X
      </button>
      <button
        className={`job_student-button ${selectedJob === '학생' ? 'select-job_student-button' : ''}`}
        onClick={() => handleJobSelect('학생')}
      >
       학생
      </button>

      

      <button className="signup-button">회원가입 하기</button>
    </div>
  );
};

export default SignupPage;
