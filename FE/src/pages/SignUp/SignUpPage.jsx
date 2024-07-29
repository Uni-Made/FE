import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
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

  const [currentStep, setCurrentStep] = useState(1); // 현재 단계를 추적하는 상태
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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

  // 비밀번호 검증 함수
  const validatePassword = (password) => {
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && hasLetter && hasNumber && hasSpecialChar;
  };

  // 이메일 검증 함수
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 회원가입 정보 입력 단계 완료 버튼 클릭 시 이벤트 핸들러
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

    if (Object.keys(newErrors).length === 0) {
      setCurrentStep(2); // 현재 단계를 2로 변경
    }
  };

  // 체크박스 상태 변경 핸들러
  const handleChange = (e) => {
    setCheckedItems({
      ...checkedItems,
      [e.target.name]: e.target.checked,
    });
  };

  // 모든 필수 체크박스가 선택되었는지 확인하는 함수
  const isCheckedAllRequired = checkedItems.age && checkedItems.terms && checkedItems.privacy;

  // 회원가입 완료 버튼 클릭 시 이벤트 핸들러
  const handleApprovalPage = () => {
    if (isCheckedAllRequired) {
      setCurrentStep(3); // 현재 단계를 3으로 변경
    }
  };

  // 메인 페이지로 돌아가는 버튼 클릭 시 이벤트 핸들러
  const handleMain = () => {
    navigate('/'); // 메인 페이지로 이동
  };
  const handleLogin = () => {
    navigate('/login'); // 메인 페이지로 이동
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
            <Select>
              <option value="male">남성</option>
              <option value="female">여성</option>
              <option value="other">공개하지 않음</option>
            </Select>
            <Select>
              <option value="skt">SKT</option>
              <option value="kt">KT</option>
              <option value="lgu">LG U+</option>
              <option value="other">기타</option>
            </Select>
          </SelectGroup>

          <InputWithButton>
            <Input 
              type="tel" 
              placeholder="전화번호" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
            />
            <ButtonInInput isSeller={isSeller}>인증요청</ButtonInInput>
          </InputWithButton>
          
          <InputWithButton>
            <Input 
              type="text" 
              placeholder="인증번호" 
              value={authCode} 
              onChange={(e) => setAuthCode(e.target.value)} 
            />
            <ButtonInInput isSeller={isSeller}>인증완료</ButtonInInput>
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
              isSeller={isSeller} // Pass the isSeller prop
            />
            <CheckboxLabel>[필수] 만 14세 이상입니다.</CheckboxLabel>
          </CheckboxContainer>

          <CheckboxContainer>
            <CheckboxInput 
              type="checkbox" 
              name="terms" 
              checked={checkedItems.terms} 
              onChange={handleChange} 
              isSeller={isSeller} // Pass the isSeller prop
            />
            <CheckboxLabel>[필수] 이용약관 동의</CheckboxLabel>
          </CheckboxContainer>

          <CheckboxContainer>
            <CheckboxInput 
              type="checkbox" 
              name="privacy" 
              checked={checkedItems.privacy} 
              onChange={handleChange} 
              isSeller={isSeller} // Pass the isSeller prop
            />
            <CheckboxLabel>[필수] 개인정보 수집 및 이용 동의</CheckboxLabel>
          </CheckboxContainer>

          <CheckboxContainer>
            <CheckboxInput 
              type="checkbox" 
              name="marketing" 
              checked={checkedItems.marketing} 
              onChange={handleChange} 
              isSeller={isSeller} // Pass the isSeller prop
            />
            <CheckboxLabel>[선택] 이벤트 소식 수신 동의</CheckboxLabel>
          </CheckboxContainer>

          <Button onClick={handleApprovalPage} isSeller={isSeller} disabled={!isCheckedAllRequired}>회원가입</Button>
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
