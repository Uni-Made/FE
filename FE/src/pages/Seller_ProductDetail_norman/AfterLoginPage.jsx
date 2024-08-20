import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { defaultInstance, authInstance } from "../../api/axiosInstance";
import { messaging, getToken, onMessage } from "../../../public/firebaseConfig";

// KakaoAfterLogin 이 부분에서는 code를 받고 post 요청하는 코드 이거는 그냥 로그인 로직인데 저희 프로젝트에서는 responseDto의 status값에
// 따라서 토큰을 줄 수도 있고 회원정보를 줄 수도 있습니다.
let params = new URL(window.location.href).searchParams;
let code = params.get("code");
console.log(code);

function AfterLoginPage() {
  // const location = useLocation();
  const navigate = useNavigate();

  const { provider } = useParams(); // :provider
  const [token, setToken] = useState("");

  useEffect(() => {
    const requestPermission = async () => {
      try {
        // 브라우저에서 알림 권한 요청
        const permission = await Notification.requestPermission();
        //TODO: 팝업 알림 허용 alert 추가
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
          // 유니메이드 회원가입을 했던 사람 : access token, refresh token
          // 유니메이드 회원가입을 안했던 사람 : socialId, socialName, email
          localStorage.removeItem("socialId");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          if (response.data.result.status == 201) {
            // unimade에 회원이 아닌 경우
            console.log("회원이 아닙니다, 회원정보 입력화면으로 이동합니다"); // -> socialId, email, socialName
            localStorage.setItem("socialId", response.data.result.socialId);
            navigate("/signUpSelect");
          } else {
            // unimade에 회원인 경우
            localStorage.setItem(
              "accessToken",
              response.data.result.accessToken
            );
            localStorage.setItem(
              "refreshToken",
              response.data.result.refreshToken
            );
            console.log("상품 목록 페이지로 이동");
            navigate("/product/list");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("로그인 실패, 로그인 페이지로 다시 돌아갑니다");
          navigate("/login");
        });
    }
  }, [token]);
  //location, navigate, setUserName
  return <div></div>;
}

export default AfterLoginPage;
