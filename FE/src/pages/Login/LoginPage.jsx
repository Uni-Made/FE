import React, { useState, useEffect } from "react";
import * as S from "./LoginPage.style";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { messaging, getToken } from "../../../public/firebaseConfig";


function LoginPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [fcmToken, setFcmToken] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("토큰 가져오기 시작");
          const currentToken = await getToken(messaging, {
            vapidKey: "BOJYqGRXNLOKa7hPb9YOdPq4mX-6hI6Ocx5EsrIT_3eIUcsa86xdYiJB7qK_QFMuJzBOT7-hbSpw0zTIxDeIQEo",
          });
          if (currentToken) {
            console.log("FCM Token: ", currentToken);
            setFcmToken(currentToken);
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        } else {
          console.log("Unable to get permission to notify.");
        }
      } catch (err) {
        console.log("An error occurred while retrieving token.", err);
      }
    };
    requestPermission();
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleClickLogo = () => {
    navigate("/");
  };


  const handleLogin = async () => {
    try {
      const response = await axios.post("http://15.165.185.157:8080/auth/seller/signin", {
        email: email,
        password: password,
        fcmToken: fcmToken, 
      }, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "accept": "application/json;charset=UTF-8"
        }
      });
  
      if (response.data.code === "OK") {
        const { status, accessToken, refreshToken } = response.data.result;
        localStorage.removeItem("socialId")
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userType");
  
        if (status === 202) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("userType", "seller");
  
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }
  
          navigate("/maderMyPage");
        } 
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // 404 오류일 경우 회원가입 페이지로 리다이렉트
        alert("사용자를 찾을 수 없습니다. 회원가입하시는걸 추천드립니다.");
        // navigate('/signUp');
      } else {
        console.error("로그인 요청 중 오류 발생:", error);
        alert("로그인 중 오류가 발생했습니다.");
      }
    }
  };
  

  return (
    <S.Container>
      <S.LogoIcon src={Logo} onClick={handleClickLogo} ></S.LogoIcon>
      <S.form>
        <S.InputSum>
           <S.Emailimg/>
           <S.Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}       
           ></S.Input>
        </S.InputSum>
      </S.form>
      <S.form>
        <S.InputSum>
          <S.PassWord/>
          <S.Input
            type={isVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <S.LookBox onClick={toggleVisibility}>
            {isVisible ? <S.Look /> : <S.NonLook />}
          </S.LookBox>
        </S.InputSum>
      </S.form>
      <S.CheckboxContainer>
            <S.CheckboxInput 
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
            />
            <S.CheckboxLabel>아이디 저장</S.CheckboxLabel>

            <S.FindPass>Email/Password 찾기</S.FindPass>
          </S.CheckboxContainer>
          <S.BoxContainer>
            <S.Sin onClick={handleLogin}>Log in</S.Sin>
          </S.BoxContainer>
    </S.Container>
    
  );
};

export default LoginPage;