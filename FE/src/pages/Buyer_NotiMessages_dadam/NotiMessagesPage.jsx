import React, { useState, useEffect } from 'react';
import MaderHomeHeader from "./components/MaderHomeHeader";
import {
  CONTAINER,
  SECTION_CONTAINER,
  SECTION_TITLE,
  NOTIFICATION_LIST,
  NOTIFICATION_ITEM,
  NOTIFICATION_TITLE,
  MainContainer,
} from './NotiMessagesPage.style';

const renderNotificationList = (title, notifications) => {
  return (
    <SECTION_CONTAINER>
      <SECTION_TITLE>{title}</SECTION_TITLE>
      <NOTIFICATION_LIST>
        {notifications.map((notification) => (
          <NOTIFICATION_ITEM key={notification.id}>
            <NOTIFICATION_TITLE>{notification.title.substring(0, 20)}...</NOTIFICATION_TITLE>
          </NOTIFICATION_ITEM>
        ))}
      </NOTIFICATION_LIST>
    </SECTION_CONTAINER>
  );
};

const  NotiMessagesPage = () => {
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    const mockApiResponse = {
      code: "200",
      message: "Success",
      result: {
        notificationList: [
          { id: 1, title: '새로운 상품이 출시되었습니다.', body: '새로운 상품이 출시되었습니다. 많은 관심 부탁드립니다.' },
          { id: 2, title: '배송 지연 안내', body: '배송이 지연되고 있습니다. 불편을 드려 죄송합니다.' },
          { id: 3, title: '이벤트 당첨 안내', body: '이벤트에 당첨되셨습니다. 축하드립니다!' },
          { id: 4, title: '긴급 공지 사항', body: '긴급 공지 사항이 있습니다. 확인 부탁드립니다.' },
          { id: 5, title: '서비스 점검 안내', body: '서비스 점검이 있을 예정입니다. 이용에 참고하시기 바랍니다.' },
        ],
        nextCursor: 0,
        isLast: true,
      }
    };

    setNotifications(mockApiResponse.result.notificationList);
  }, []);

  if (!notifications) {
    return <div>Loading...</div>;
  }

  return (
    <MainContainer>
      <MaderHomeHeader />
      <CONTAINER>
        {renderNotificationList('알림', notifications)}
      </CONTAINER>
    </MainContainer>
  );
};

export default NotiMessagesPage;
