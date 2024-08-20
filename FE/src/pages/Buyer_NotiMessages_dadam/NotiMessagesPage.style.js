import styled from 'styled-components';

export const MainContainer = styled.div`
  overflow-x: hidden;
  max-width: 100%;
  width:100%;
`;

export const CONTAINER = styled.div`
  width: 1300px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

export const SECTION_CONTAINER = styled.div`
  margin-bottom: 40px;
`;

export const SECTION_TITLE = styled.div`
  font-size: 65px;
  margin-bottom: 40px;
  margin-top: 90px;
  color: #00DDDD;
  text-align: left;
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-weight: bold;
`;

export const NOTIFICATION_LIST = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const NOTIFICATION_ITEM = styled.li`
  background-color: #f0f0f0;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
`;

export const NOTIFICATION_TITLE = styled.div`
  font-size: 18px;
  color: #333;
  font-weight: bold;
`;
