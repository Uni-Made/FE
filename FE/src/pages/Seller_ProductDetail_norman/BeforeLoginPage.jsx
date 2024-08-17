import React from "react";
import { useState, useEffect } from "react";
import { messaging, getToken, onMessage } from "../../../public/firebaseConfig";
import { useNavigate } from "react-router-dom";

function BeforeLoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      // 여기서 포그라운드 알림을 처리합니다.
      // 예: 사용자에게 알림 표시
      new Notification(payload.notification.title, {
        body: payload.notification.body,
      });
    });
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      new Notification(payload.notification.title, {
        body: payload.notification.body,
      });
    });

    return () => unsubscribe();
  }, []);

  const handleClickButton = (socialType) => {
    const loginUrl = `http://15.165.185.157:8080/oauth2/authorization/${socialType}`;
    window.location.href = loginUrl;
  };

  return (
    <div>
      판매자 시점, 판매 중인 상품 상세페이지입니다.
      <p>Firebase Cloud Messaging Test</p>
      <button onClick={() => handleClickButton("kakao")}>카카오 로그인</button>
      <button onClick={() => handleClickButton("naver")}>네이버 로그인</button>
      <button onClick={() => handleClickButton("google")}>구글 로그인</button>
    </div>
  );
}

export default BeforeLoginPage;
