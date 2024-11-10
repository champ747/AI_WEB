import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';
import checkIcon from '../assets/images/cafe_chuchu_check.png';
import maleIcon from '../assets/images/male_icon.png';
import femaleIcon from '../assets/images/female_icon.png';
import cafeLogo from '../assets/images/cafe_chuchu_logo.png';
import checkIconO from '../assets/images/cafe_chuchu_password_check-O.png';
import checkIconX from '../assets/images/cafe_chuchu_password_check-X.png';

const SignupPage = () => {
  const navigate = useNavigate();
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [idValue, setIdValue] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);
  const [name, setName] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [birthYear, setBirthYear] = useState(2000);
  const [birthMonth, setBirthMonth] = useState(1);
  const [birthDay, setBirthDay] = useState(1);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [cafePreferences, setCafePreferences] = useState([]);

  const handleIdChange = (e) => setIdValue(e.target.value);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsPasswordMatched(e.target.value === passwordCheck);
  };
  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
    setIsPasswordMatched(password === e.target.value);
  };
  const handleCafePreferenceClick = (preference) => {
    setCafePreferences((prev) => 
      prev.includes(preference)
        ? prev.filter((item) => item !== preference)
        : [...prev, preference]
    );
  };

  const handleGenderSelect = (gender) => setSelectedGender(gender);
  const handleJobSelect = (job) => setSelectedJob(job);
  const handleBirthYearChange = (e) => setBirthYear(e.target.value);
  const handleBirthMonthChange = (e) => setBirthMonth(e.target.value);
  const handleBirthDayChange = (e) => setBirthDay(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  
  const handleSignup = async () => {
    const signupData = {
      userid: idValue,
      name: name,
      password: password,
      gender: selectedGender === 'male' ? 'M' : 'F',
      email: email,
      phone: phone,
      cafe_preferences: cafePreferences
    };
  
    console.log('Sending Request Body:', JSON.stringify(signupData));
  
    try {
      const response = await fetch('https://port-0-back-m341pqyi646021b2.sel4.cloudtype.app/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      });
  
      console.log('Request Headers:', {
        'Content-Type': 'application/json'
      });

      if (response.ok) {
        console.log('회원가입 성공');
        navigate('/login'); 
      } 
      else {
        const errorData = await response.json();
        setError(errorData.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('서버 오류 발생:', error);
      setError('서버 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="signup-container">
      <img src={cafeLogo} alt="Cafe ChuChu" className="signuppage-logo" onClick={() => navigate('/login')} />

      <p className="text-id">아이디</p>
      <input type="text" className="input-box_id" value={idValue || ''} onChange={handleIdChange} />

      <p className="text-password">비밀번호(5자 이상)</p>
      <input type="password" className="input-box_password" value={password || ''} onChange={handlePasswordChange} />
      <p className="text-passwordcheck">비밀번호 확인</p>
      <input type="password" className="input-box_passwordcheck" value={passwordCheck || ''} onChange={handlePasswordCheckChange} />
      {passwordCheck && (
        <img src={isPasswordMatched ? checkIconO : checkIconX} alt={isPasswordMatched ? "비밀번호 일치" : "비밀번호 불일치"} className="password_check-icon" />
      )}

      <p className="text-name">이름</p>
      <input type="text" className="input-box_name" value={name || ''} onChange={handleNameChange} />

      <p className="text-gender">성별</p>
      <img src={maleIcon} alt="Male" className="male-icon" />
      <img src={femaleIcon} alt="Female" className="female-icon" />
      <button className={`male-button ${selectedGender === 'male' ? 'select-male-button' : ''}`} onClick={() => handleGenderSelect('male')}></button>
      <span className={`male-button_span ${selectedGender === 'male' ? 'select-male-button_span' : ''}`} onClick={() => handleGenderSelect('male')}>남</span>
      <button className={`female-button ${selectedGender === 'female' ? 'select-female-button' : ''}`} onClick={() => handleGenderSelect('female')}></button>
      <span className={`female-button_span ${selectedGender === 'female' ? 'select-female-button_span' : ''}`} onClick={() => handleGenderSelect('female')}>여</span>

      <p className="text-birth">생년월일</p>
      <input type="number" min="1900" max="2050" value={birthYear} onChange={handleBirthYearChange} className="input-box_birth_year" />
      <p className="text-birth_year">년</p>
      <input type="number" min="1" max="12" value={birthMonth} onChange={handleBirthMonthChange} className="input-box_birth_month" />
      <p className="text-birth_month">월</p>
      <input type="number" min="1" max="31" value={birthDay} onChange={handleBirthDayChange} className="input-box_birth_day" />
      <p className="text-birth_day">일</p>

      <p className="text-phonenumber">전화번호</p>
      <input type="tel" className="input-box_phonenumber" value={phone} onChange={handlePhoneChange} />

      <p className="text-email">이메일</p>
      <input type="email" className="input-box_email" value={email} onChange={handleEmailChange} />

      <p className="text-job">직업</p>
      <button className={`job_O-button ${selectedJob === '직장O' ? 'select-job_O-button' : ''}`} onClick={() => handleJobSelect('직장O')}>직장 O</button>
      <button className={`job_X-button ${selectedJob === '직장X' ? 'select-job_X-button' : ''}`} onClick={() => handleJobSelect('직장X')}>직장 X</button>
      <button className={`job_student-button ${selectedJob === '학생' ? 'select-job_student-button' : ''}`} onClick={() => handleJobSelect('학생')}>학생</button>

      <p className="text-cafe_preference">카페 선호도 선택</p>
      <button className={`preference_c-button ${cafePreferences.includes('cozy') ? 'select-preference_c-button' : ''}`} onClick={() => handleCafePreferenceClick('cozy')}>아늑한</button>
      <button className={`preference_m-button ${cafePreferences.includes('modern') ? 'select-preference_m-button' : ''}`} onClick={() => handleCafePreferenceClick('modern')}>모던한</button>
      

      {error && <p className="error-message">{error}</p>}
      
      <button className="signup-button" onClick={handleSignup}>회원가입 하기</button>
    </div>
  );
};

export default SignupPage;