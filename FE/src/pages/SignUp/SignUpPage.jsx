import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance'; 

import {
  Container, NumTitle, Title, Input, InputWithButton, ButtonInInput,
  Select, Button, SelectGroup, InputWrapper, ErrorMessage,
  CheckboxContainer, CheckboxInput, CheckboxLabel, Text, LastButton
} from './SignUpPage.style';
import SignUpHeader from './SignUpHeader';

function SignUpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userType } = location.state || { userType: 'buyer' };
  const isSeller = userType === 'seller';

  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('MALE');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [errors, setErrors] = useState({});
  const [checkedItems, setCheckedItems] = useState({
    age: false,
    terms: false,
    privacy: false,
    marketing: false,
  });
  const [isAuthCodeVerified, setIsAuthCodeVerified] = useState(false); 
  const validatePassword = (password) => {
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && hasLetter && hasNumber && hasSpecialChar;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const requestAuthCode = async () => {
    try {
      const response = await axiosInstance.post('/auth/sms', null, {
        params: { phone }
      });
      console.log('인증 요청 응답:', response.data);
      if (response.data.code === 'SUCCESS') {
        alert('인증번호가 발송되었습니다.');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('인증번호 요청 중 오류:', error);
      alert('인증번호 요청 중 오류가 발생했습니다.');
    }
  };

  const verifyAuthCode = async () => {
    console.log('요청 데이터:', { phoneNumber: phone, certificationNumber: authCode });

    try {
      const response = await axiosInstance.post('/auth/sms/verify', {
        phoneNumber: phone,
        certificationNumber: authCode
      });
      console.log('인증 확인 응답:', response.data);
      if (response.data.result) {
        alert('인증이 완료되었습니다.');
        setIsAuthCodeVerified(true); // 인증 완료 상태 업데이트
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('인증번호 확인 중 오류:', error);
      alert('인증번호 확인 중 오류가 발생했습니다.');
    }
  };

  const handleSignUpInfoSubmit = () => {
    let newErrors = {};

    if (!name) newErrors.name = '이름을 입력해주세요.';
    if (!email) {
      newErrors.email = 'Email을 입력해주세요.';
    } else if (!validateEmail(email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    }
    if (!password) {
      newErrors.password = (
        <>
          비밀번호를 입력하세요.
          <br />
          8자 이상, 영문, 숫자, 특수문자 조합
        </>
      );
    } else if (!validatePassword(password)) {
      newErrors.password = '비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.';
    }
    if (!confirmPassword || password !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);

    // 인증이 완료되지 않았으면 단계 이동을 막습니다.
    if (Object.keys(newErrors).length === 0 && isAuthCodeVerified) {
      console.log('현재 단계: 1');
      console.log('userType:', userType);
      
      setCurrentStep(2);
    } else if (!isAuthCodeVerified) {
      alert('전화번호 인증을 완료해주세요.');
    }
  };


  const handleChange = (e) => {
    setCheckedItems({
      ...checkedItems,
      [e.target.name]: e.target.checked,
    });
  };

  const isCheckedAllRequired = checkedItems.age && checkedItems.terms && checkedItems.privacy;

  const handleApprovalPage = async () => {
    console.log('체크박스 상태:', checkedItems);
    console.log('필수 동의', isCheckedAllRequired);
  
    if (isCheckedAllRequired) {
      try {
        const payload = {
          name,
          email,
          gender,
          phone,
          socialId: email, 
          provider: "NORMAL"
        };
    
        const endpoint = isSeller ? `/auth/seller/signup` : `/auth/buyers/signup`;
        console.log('현재 단계: 2');
        console.log('userType:', userType);
        console.log('payload:', payload);
        const response = await axiosInstance.post(endpoint, payload);

        console.log('회원가입 API 응답:', response.data); 
        if (response.data.code === 'OK') {
          setCurrentStep(3);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('회원가입 중 오류:', error);
        if (error.response) {
          console.error('응답 데이터:', error.response.data);
          alert(`회원가입 중 오류가 발생했습니다. ${error.response.data.message}`);
        } else {
          alert('회원가입 중 오류가 발생했습니다.');
        }
      }
    } else {
      alert('필수 이용약관을 모두 동의해주세요.');
    }
  };
  

  const handleMain = () => {
    navigate('/'); 
  };

  const handleLogin = () => {
    navigate('/login'); 
  };

  return (
    <>
      <SignUpHeader />
      <Container>
        {currentStep === 1 && (
          <>
            <NumTitle isSeller={isSeller}>1</NumTitle>
            <Title>정보 입력하기</Title>
            <InputWrapper>
              <Input 
                type="text" 
                placeholder="이름" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
              <ErrorMessage isSeller={isSeller}>{errors.name}</ErrorMessage>
            </InputWrapper>
            <InputWrapper>
              <Input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <ErrorMessage isSeller={isSeller}>{errors.email}</ErrorMessage>
            </InputWrapper>
            <InputWrapper>
              <Input 
                type="password" 
                placeholder="비밀번호" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <ErrorMessage isSeller={isSeller}>{errors.password}</ErrorMessage>
            </InputWrapper>
            <InputWrapper>
              <Input 
                type="password" 
                placeholder="비밀번호 확인" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
              <ErrorMessage isSeller={isSeller}>{errors.confirmPassword}</ErrorMessage>
            </InputWrapper>
            <SelectGroup>
              <Select>
                <option value="native">내국인</option>
                <option value="foreigner">외국인</option>
              </Select>
              <Select 
                value={gender} 
                onChange={(e) => setGender(e.target.value)} 
              >
                <option value="MALE">남성</option>
                <option value="FEMALE">여성</option>
              </Select>

              <Select>
                <option value="skt">SKT</option>
                <option value="kt">KT</option>
                <option value="lgu">LG U+</option>
                <option value="other">알뜰폰</option>
              </Select>
            </SelectGroup>
            <InputWithButton>
              <Input 
                type="tel" 
                placeholder="전화번호" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
              />
              <ButtonInInput isSeller={isSeller} onClick={requestAuthCode}>인증요청</ButtonInInput>
            </InputWithButton>
            <InputWithButton>
              <Input 
                type="text" 
                placeholder="인증번호" 
                value={authCode} 
                onChange={(e) => setAuthCode(e.target.value)} 
              />
              <ButtonInInput isSeller={isSeller} onClick={verifyAuthCode}>인증완료</ButtonInInput>
            </InputWithButton>
            <Button onClick={handleSignUpInfoSubmit} isSeller={isSeller}>회원가입</Button>
          </>
        )}
      {currentStep === 2 && (
        <>
          <NumTitle isSeller={isSeller}>2</NumTitle>
          <Title>이용약관</Title>

          <CheckboxContainer>
            <CheckboxInput 
              type="checkbox" 
              name="age" 
              checked={checkedItems.age} 
              onChange={handleChange} 
              isSeller={isSeller}
            />
            <CheckboxLabel>[필수] 만 14세 이상입니다.</CheckboxLabel>
          </CheckboxContainer>

          <CheckboxContainer>
            <CheckboxInput 
              type="checkbox" 
              name="terms" 
              checked={checkedItems.terms} 
              onChange={handleChange} 
              isSeller={isSeller}
            />
            <CheckboxLabel>[필수] 이용약관 동의</CheckboxLabel>
          </CheckboxContainer>

          <CheckboxContainer>
            <CheckboxInput 
              type="checkbox" 
              name="privacy" 
              checked={checkedItems.privacy} 
              onChange={handleChange} 
              isSeller={isSeller}
            />
            <CheckboxLabel>[필수] 개인정보 수집 및 이용 동의</CheckboxLabel>
          </CheckboxContainer>

          <CheckboxContainer>
            <CheckboxInput 
              type="checkbox" 
              name="marketing" 
              checked={checkedItems.marketing} 
              onChange={handleChange} 
              isSeller={isSeller}
            />
            <CheckboxLabel>[선택] 이벤트 소식 수신 동의</CheckboxLabel>
          </CheckboxContainer>

          <Button onClick={handleApprovalPage} isSeller={isSeller}>회원가입</Button>
        </>
      )}
      {currentStep === 3 && (
        <Container>
          <NumTitle isSeller={isSeller}>3</NumTitle>
          {isSeller ? (
            <Title>회원가입 완료 & 승인 안내</Title>
          ) : (
            <Title>회원가입 완료</Title>
          )}
          {isSeller ? (
            <Text>
              회원가입을 환영합니다! <br />
              판매자 회원가입을 위해서는 관리자의 승인이 필요합니다. <br />
              빠른 확인 후 서면으로 안내드리겠습니다.
            </Text>
          ) : (
            <Text>
              회원가입을 환영합니다! <br />
              Uni-Made의 서비스를 지금 바로 경험해보세요
            </Text>
          )}

          {isSeller ? (
            <Button onClick={handleMain} isSeller={isSeller}>메인으로 돌아가기</Button>
          ) : (
            <>
              <Button onClick={handleLogin}>로그인하기</Button>
              <LastButton onClick={handleMain}>메인으로 돌아가기</LastButton>
            </>
          )}
        </Container>
      )}

    </Container>
    </>
  );
}

export default SignUpPage;
