import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { defaultInstance } from "../../api/axiosInstance";

import {
  Container,
  NumTitle,
  Title,
  Input,
  InputWithButton,
  ButtonInInput,
  Select,
  Button,
  InputWrapper,
  ErrorMessage,
  CheckboxContainer,
  CheckboxInput,
  CheckboxLabel,
  Text,
  LastButton,
  NameGenderWrapper,
  ProviderButtonContainer, 
  ProviderButton, 

  ModalContainer, 
  ModalContent,   
  CloseButton,  
} from "./SignUpBuyerPage.style";
import SignUpHeader from "./SignUpHeader";

function SignUpPage() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("MALE");
  const [authCode, setAuthCode] = useState("");
  const [checkedItems, setCheckedItems] = useState({
    age: false,
    terms: false,
    privacy: false,
    marketing: false,
  });
  const [isAuthCodeVerified, setIsAuthCodeVerified] = useState(false);
  const [isVerificationSuccessful, setIsVerificationSuccessful] = useState(false); // New state for verification status

  const [modalContent, setModalContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  const [socialId, setSocialId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [provider, setProvider] = useState("NORMAL");

  useEffect(() => {
    // localStorage에서 값을 가져와 상태 초기화
    const storedSocialId = localStorage.getItem("socialId");
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedProvider = localStorage.getItem("provider");

    setSocialId(storedSocialId || "");
    setName(storedName || "");
    setEmail(storedEmail || "");
    setProvider(storedProvider || "");

    return () => {
      // 상태 초기화
      setPhone("");
      setGender("MALE");
      setAuthCode("");
      setCheckedItems({
        age: false,
        terms: false,
        privacy: false,
        marketing: false,
      });
      setIsAuthCodeVerified(false);
      setSocialId("");
      setName("");
      setEmail("");
      setProvider("NORMAL");

      // 필요 시 localStorage 초기화
      localStorage.removeItem("socialId");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("provider");
    };
  }, []);

  const requestAuthCode = async () => {
    try {
      const response = await defaultInstance.post("/auth/sms", null, {
        params: { phone },
      });
      console.log("인증 요청 응답:", response.data);
      if (response.data.code === "SUCCESS") {
        alert("인증번호가 발송되었습니다.");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("인증번호 요청 중 오류:", error);
      alert("인증번호 요청 중 오류가 발생했습니다.");
    }
  };

  const verifyAuthCode = async () => {
    console.log("요청 데이터:", {
      phoneNumber: phone,
      certificationNumber: authCode,
    });

    try {
      const response = await defaultInstance.post("/auth/sms/verify", {
        phoneNumber: phone,
        certificationNumber: authCode,
      });
      console.log("전화번호 인증 확인 응답:", response.data);
      if (response.data.result) {
        alert("전화번호 인증이 완료되었습니다.");
        setIsAuthCodeVerified(true);
        setIsVerificationSuccessful(true); 
      } else {
        alert(response.data.message);
        setIsVerificationSuccessful(false); 
      }
    } catch (error) {
      console.error("전화번호 인증번호 확인 중 오류:", error);
      alert("전화번호 인증번호 확인 중 오류가 발생했습니다.");
    }
  };


  const handleSignUpInfoSubmit = () => {
    let newErrors = {};

    if (!phone) newErrors.phone = "전화번호를 입력해주세요.";

    if (Object.keys(newErrors).length === 0) {
      setCurrentStep(2);
      }
    // 필수 입력 필드가 모두 채워졌으면 단계 이동
    if (Object.keys(newErrors).length === 0 && isAuthCodeVerified) {
      setCurrentStep(2);
    } else if (!isAuthCodeVerified) {
      alert("전화번호 인증을 완료해주세요.");
    }
  };

  const handleChange = (e) => {
    setCheckedItems({
      ...checkedItems,
      [e.target.name]: e.target.checked,
    });
  };

  const isCheckedAllRequired =
    checkedItems.age && checkedItems.terms && checkedItems.privacy;

  const handleApprovalPage = async () => {
    if (isCheckedAllRequired) {
      try {
        const payload = {
          name,
          email,
          gender,
          phone,
          socialId,
          provider: provider.toUpperCase(),
        };

        const endpoint = `/auth/buyers/signup`;
        const response = await defaultInstance.post(endpoint, payload);
console.log(response);
console.log(response.data.code);

        if (response.data.code === "OK") {
          setCurrentStep(3);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("회원가입 중 오류:", error);
        if (error.response) {
          alert(
            `회원가입 중 오류가 발생했습니다. ${error.response.data.message}`
          );
        } else {
          alert("회원가입 중 오류가 발생했습니다.");
        }
      }
    } else {
      alert("필수 이용약관을 모두 동의해주세요.");
    }
  };

  const handleProviderSelect = (selectedProvider) => {
    if (selectedProvider === provider) {
      console.log(`선택된 provider: ${selectedProvider}`);
    }
  };

  const handleMain = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/loginbpage");
  };
  const handleModalContainerClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <SignUpHeader />
      <Container>
        {currentStep === 1 && (
          <>
            <NumTitle>1</NumTitle>
            <Title>정보 입력하기</Title>

            <InputWrapper>
              <NameGenderWrapper>
                <Input
                  type="text"
                  placeholder="이름"
                  value={name}
                  readOnly
                  style={{
                  width: '70%',
                  backgroundColor: '#e0e0e0', //색더 진하게
                  }}
                />
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  style={{ width: '28%' }} 
                >
                  <option value="MALE">남성</option>
                  <option value="FEMALE">여성</option>
                </Select>
              </NameGenderWrapper>
              <ErrorMessage></ErrorMessage>
            </InputWrapper>

            <InputWrapper>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                readOnly
                style={{
                backgroundColor: '#e0e0e0', //색더 진하게
                }}
              />
              <ErrorMessage></ErrorMessage>
            </InputWrapper>

            <InputWithButton>
              <Input
                type="tel"
                placeholder="전화번호"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <ButtonInInput onClick={requestAuthCode}>
                인증요청
              </ButtonInInput>
            </InputWithButton>

            <InputWithButton>
              <Input
                type="text"
                placeholder="인증번호"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
              />
              <ButtonInInput 
                onClick={verifyAuthCode} 
                disabled={isVerificationSuccessful} 
              >
                {isVerificationSuccessful ? "인증성공" : "인증완료"} 
              </ButtonInInput>
            </InputWithButton>

            <ProviderButtonContainer>
              <ProviderButton 
                $isActive={provider === "KAKAO"} 
                onClick={() => handleProviderSelect("KAKAO")}
                disabled={provider !== "KAKAO"} 
              >
                카카오
              </ProviderButton>
              <ProviderButton 
              $isActive={provider === "NAVER"} 
              onClick={() => handleProviderSelect("NAVER")}
              disabled={provider !== "NAVER"}
              >
                네이버
              </ProviderButton>
              <ProviderButton 
                $isActive={provider === "GOOGLE"} 
                onClick={() => handleProviderSelect("GOOGLE")}
                disabled={provider !== "GOOGLE"} 
              >
                구글
              </ProviderButton>
            </ProviderButtonContainer>

            <Button onClick={handleSignUpInfoSubmit}>
              다음으로
            </Button>
          </>
        )}
        {currentStep === 2 && (
          <>
            <NumTitle>2</NumTitle>
            <Title>이용약관</Title>

            <CheckboxContainer>
              <CheckboxInput
                type="checkbox"
                name="age"
                checked={checkedItems.age}
                onChange={handleChange}
              />
              <CheckboxLabel onClick={() => openModal("[필수] 만 14세 이상입니다.")}>
                [필수] 만 14세 이상입니다.
              </CheckboxLabel>
            </CheckboxContainer>

            <CheckboxContainer>
              <CheckboxInput
                type="checkbox"
                name="terms"
                checked={checkedItems.terms}
                onChange={handleChange}
              />
              <CheckboxLabel onClick={() => openModal("[필수] 이용약관 동의 내용")}>
                [필수] 이용약관 동의
              </CheckboxLabel>
            </CheckboxContainer>

            <CheckboxContainer>
              <CheckboxInput
                type="checkbox"
                name="privacy"
                checked={checkedItems.privacy}
                onChange={handleChange}
              />
              <CheckboxLabel onClick={() => openModal("[필수] 개인정보 수집 및 이용 동의")}>
                [필수] 개인정보 수집 및 이용 동의
              </CheckboxLabel>
            </CheckboxContainer>

            <CheckboxContainer>
              <CheckboxInput
                type="checkbox"
                name="marketing"
                checked={checkedItems.marketing}
                onChange={handleChange}
              />
              <CheckboxLabel onClick={() => openModal("[선택] 이벤트 소식 수신 동의 내용")}>
                [선택] 이벤트 소식 수신 동의
              </CheckboxLabel>
            </CheckboxContainer>

            <Button onClick={handleApprovalPage}>
              회원가입
            </Button>
          </>
        )}
        {currentStep === 3 && (
          <Container>
            <NumTitle>3</NumTitle>
            
              <Title>회원가입 완료</Title>
            
            
              <Text>
                회원가입을 환영합니다! <br />
                Uni-Made의 서비스를 지금 바로 경험해보세요
              </Text>
            

              <>
                <Button onClick={handleLogin}>로그인하기</Button>
                <LastButton onClick={handleMain}>메인으로 돌아가기</LastButton>
              </>
            
          </Container>
        )}
        {isModalOpen && (
          <ModalContainer onClick={handleModalContainerClick}>
            <ModalContent>
              <CloseButton onClick={closeModal}>x</CloseButton>
              {modalContent}
            </ModalContent>
          </ModalContainer>
        )}
      </Container>
    </>
  );
}

export default SignUpPage;