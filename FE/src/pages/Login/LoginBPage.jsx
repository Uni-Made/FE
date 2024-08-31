import React, { useState, useEffect } from "react";
import * as S from "./LoginBPage.style";
import Logo from "../../assets/logo.png";
import Kakao from "../../assets/kako.png";
import Naver from "../../assets/naver.png";
import Google from "../../assets/google.png";
import { useNavigate } from "react-router-dom";


function LoginBPage() {
  const navigate = useNavigate();


  const handleClickLogo = () => {
    navigate("/");
  };

  const handleClickButton = (provider) => {
    let loginUrl = "";
    switch (provider) {
      case "kakao" :
        loginUrl = `http://15.165.185.157:8080/oauth2/authorization/kakao`;
        break;
      case "naver" :
        loginUrl = `http://15.165.185.157:8080/oauth2/authorization/naver`;
        break;
      case "google" :
        loginUrl = `http://15.165.185.157:8080/oauth2/authorization/google`;
        break;
      default:
        console.error("Unsupported provider:", provider);
    }
    window.location.href = loginUrl;
  };



  return (
    <S.Container>
      <S.LogoIcon src={Logo} onClick={handleClickLogo} ></S.LogoIcon>
          <S.SoLogInContainer>
            <S.SocialButtonK onClick={() => handleClickButton("kakao")}>
              <S.SKimg src={Kakao} alt="Kakao" />
              카카오로 시작하기
            </S.SocialButtonK>
            <S.SocialButtonN onClick={() => handleClickButton("naver")}>
              <S.SNimg src={Naver} alt="Naver" />
              네이버로 시작하기
            </S.SocialButtonN>
            <S.SocialButtonG onClick={() => handleClickButton("google")}>
              <S.SGimg src={Google} alt="Google" />
              구글로 시작하기
            </S.SocialButtonG>
          </S.SoLogInContainer>
    </S.Container>
    
  );
};

export default LoginBPage;