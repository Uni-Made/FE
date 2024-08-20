// firebase-messaging-sw.js

// Firebase SDKs를 로드합니다.
importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
  );
  
  // 루트 디렉토리의 firebase.js 파일과 동일한 설정을 사용하여 Firebase를 초기화합니다.
  const firebaseConfig = {
    apiKey: "AIzaSyCrJzmO13sikWXDYPIIskaDSIZzMx0wy_Y",
    authDomain: "uni-made.firebaseapp.com",
    projectId: "uni-made",
    storageBucket: "uni-made.appspot.com",
    messagingSenderId: "634204091482",
    appId: "1:634204091482:web:8b601ba6a88aac23245463",
    measurementId: "G-FERJJZW73B",
  };
  
  // Firebase 초기화
  firebase.initializeApp(firebaseConfig);
  
  // Firebase Messaging 인스턴스를 가져옵니다.
  const messaging = firebase.messaging();
  
  // 백그라운드에서 메시지를 수신할 때 호출되는 콜백 함수
  messaging.onBackgroundMessage((payload) => {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
  
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: "/firebase-logo.png",
      data: { url: "http://localhost:5173/defaultMyPage/purchase/messages" }, // 사용자가 클릭했을 때 열릴 페이지
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
  
  // notificationclick 이벤트 처리
  self.addEventListener("notificationclick", function (event) {
    console.log("On notification click: ", event);
    event.notification.close(); // 알림 닫기
  
    // 알림 데이터에 포함된 URL로 리디렉션
    event.waitUntil(
      clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then(function (clientList) {
          for (let i = 0; i < clientList.length; i++) {
            let client = clientList[i];
            if (client.url === event.notification.data.url && "focus" in client) {
              return client.focus(); // 이미 열려 있는 창을 포커스
            }
          }
          if (clients.openWindow) {
            return clients.openWindow(event.notification.data.url); // 새로운 창을 열거나 기존 창을 포커스
          }
        })
    );
  });
  