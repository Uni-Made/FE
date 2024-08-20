//KakaoAfterLogin 이 부분에서는 code를 받고 post 요청하는 코드 이거는 그냥 로그인 로직인데 저희 프로젝트에서는 responseDto의 status값에
// 따라서 토큰을 줄 수도 있고 회원정보를 줄 수도 있습니다.

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
import { defaultInstance, authInstance } from "../../api/axiosInstance";
import { messaging, getToken, onMessage } from "../../../public/firebaseConfig";

// const BASE_URL = "http://15.165.185.157:8080/";
// // 단순 get요청으로 인증값이 필요없는 경우
// const axiosApi = (url, options) => {
//   const instance = axios.create({ baseURL: url, ...options });
//   return instance;
// };
// const defaultInstance = axiosApi(BASE_URL);

// const href = window.location.href;
let params = new URL(window.location.href).searchParams;
let code = params.get("code");
console.log(code);

function KakaoAfterLoginPage () {
//   const location = useLocation();
    const navigate = useNavigate();

    const[token, setToken] =useState("");
    const provider = "kakao";

  // const [userName, setUserName] = useRecoilState(userNameState);
  useEffect(() => {
    const requestPermission = async () => {
        try {
          // 브라우저에서 알림 권한 요청
          const permission = await Notification.requestPermission();
          if (permission === "granted") {
            // 알림 권한이 부여된 경우 FCM 토큰을 요청
            console.log("토큰 가져오기 시작");
            const currentToken = await getToken(messaging, {
              vapidKey:
                "BOJYqGRXNLOKa7hPb9YOdPq4mX-6hI6Ocx5EsrIT_3eIUcsa86xdYiJB7qK_QFMuJzBOT7-hbSpw0zTIxDeIQEo",
            });
            if (currentToken) {
              console.log("FCM Token:", currentToken);
              setToken(currentToken);
              // TODO: 사용자 로그인 후 user(sellerId, buyerId)를 FCM 토큰과 같이 api를 통해 서버로 보내기
            } else {
              console.log(
                "No registration token available. Request permission to generate one."
              );
            }
          } else {
            console.log("Unable to get permission to notify.");
          }
        } catch (err) {
          console.log("An error occurred while retrieving token. ", err);
        }
      };
  
      requestPermission();
    }, []);
  
    // const [userName, setUserName] = useRecoilState(userNameState);
    useEffect(() => {
      if (token != "") {
        console.log("로그인 확인", "code :", code, "token : ", token);
        defaultInstance
        .post(`auth/buyers/${provider}?code=${code}&fcmToken=${token}`)
        .then((response) => {
            console.log("asdfasdff");
            console.log(response);
  
            localStorage.removeItem("socialId");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            localStorage.removeItem("proviedr");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userType");
            

            if (response.data.result.status == 201 ) {
              console.log("회원이 아닙니다. 회원가입을 진행해주세요.");
              localStorage.setItem("socialId", response.data.result.socialId);
              localStorage.setItem("name", response.data.result.socialName);
              localStorage.setItem("email", response.data.result.email);              
              localStorage.setItem("provider", "KAKAO"); 

              navigate('/signUpBuyerPage');
            } else if (response.data.code === "OK" ) {

              localStorage.setItem(
                "accessToken",
                response.data.result.accessToken
              );
              localStorage.setItem(
                "refreshToken",
                response.data.result.refreshToken
              );
              localStorage.setItem("userType", "buyer");
              navigate("/product/list");
            }
        })
        .catch((error) => {
            console.error(error);
            // alert("로그인 실패, 로그인 페이지로 다시 돌아갑니다");
            // navigate("/login");

        });
     }
    }, [token]);
    return <div></div>;
  //location, navigate, setUserName
};

export default KakaoAfterLoginPage;
