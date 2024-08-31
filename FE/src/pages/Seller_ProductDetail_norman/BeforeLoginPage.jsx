import React from "react";
import { useState, useEffect } from "react";
import { messaging, getToken, onMessage } from "../../../public/firebaseConfig";
import { useNavigate } from "react-router-dom";

function BeforeLoginPage() {
  const navigate = useNavigate();

  const handleClickButton = (socialType) => {
    const loginUrl = `http://15.165.185.157:8080/oauth2/authorization/${socialType}`;
    window.location.href = loginUrl;
  };

  const handleButtonClick = () => {
    navigate("/product/" + 16, { state: { from: window.location.pathname } });
  };

  return (
    <div>
      판매자 시점, 판매 중인 상품 상세페이지입니다.
      <p>Firebase Cloud Messaging Test</p>
      <button onClick={() => handleButtonClick()}>
        상품 상세 페이지로 이동
      </button>
      <button onClick={() => handleClickButton("kakao")}>카카오 로그인</button>
      <button onClick={() => handleClickButton("naver")}>네이버 로그인</button>
      <button onClick={() => handleClickButton("google")}>구글 로그인</button>
    </div>
  );
}

export default BeforeLoginPage;
