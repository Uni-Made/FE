import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MaderHomeHeader from "./components/MaderHomeHeader";
import NotiMessageFooter from "./components/NotiMessageFooter";
import {
  CONTAINER,
  SECTION_CONTAINER,
  SECTION_TITLE,
  NOTIFICATION_LIST,
  NOTIFICATION_ITEM,
  NOTIFICATION_TITLE,
  MainContainer,
  NOTIFICATION_BODY,
} from './NotiMessagesPage.style';
import { authInstance } from '../../api/axiosInstance'; // axios 인스턴스 가져오기

const renderNotificationList = (title, notifications, onNotificationClick) => {
  return (
    <SECTION_CONTAINER>
      <SECTION_TITLE>{title}</SECTION_TITLE>
      <NOTIFICATION_LIST>
        {notifications.map((notification) => (
          <NOTIFICATION_ITEM
            key={notification.id}
            onClick={() => onNotificationClick(notification)}
          >
            <NOTIFICATION_TITLE>
              "{notification.body.substring(0, 15)}..."
            </NOTIFICATION_TITLE>
            <NOTIFICATION_BODY>
              {notification.title.substring(0, 35)}
            </NOTIFICATION_BODY>
          </NOTIFICATION_ITEM>
        ))}
      </NOTIFICATION_LIST>
    </SECTION_CONTAINER>
  );
};

const NotiMessagesPage = () => {
  const [notifications, setNotifications] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem('userType'); // 로컬 스토리지에서 userType 가져오기
    const url =
      userType === 'seller'
        ? '/seller/notifications/list?pageSize=100'
        : '/buyer/notifications/list?pageSize=100';

    const fetchNotifications = async () => {
      try {
        const response = await authInstance.get(url);

        if (response.status === 200) {
          const data = response.data;
          setNotifications(data.result.notificationList);
        } else {
          console.error('Failed to fetch notifications:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = (notification) => {

    const productId = notification.id;
    if (notification.title.includes('리뷰 작성 알림')) {
      localStorage.setItem("reviewOrderId", notification.extraId);
      navigate(`/product/${productId}`);
    }
  };

  if (!notifications) {
    return (
      <MainContainer>
        <MaderHomeHeader />
        <CONTAINER>
          <SECTION_CONTAINER>
            <SECTION_TITLE>알림</SECTION_TITLE>
            <NOTIFICATION_LIST>
              온 알림이 없습니다. 
            </NOTIFICATION_LIST>
          </SECTION_CONTAINER>
          <NotiMessageFooter/>
        </CONTAINER>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <MaderHomeHeader />
      <CONTAINER>
        {renderNotificationList('알림', notifications, handleNotificationClick)}
        <NotiMessageFooter/>
      </CONTAINER>
      
    </MainContainer>
  );
};

export default NotiMessagesPage;
