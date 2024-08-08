import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { authInstance } from '../../api/axiosInstance'; // Axios 인스턴스 가져오기
import FavoriteHeader from './components/FavoriteHeader';
import MaderCard from './components/MaderCard';
import FavoriteFooter from './components/FavoriteFooter';

const Container = styled.div`
  padding: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 50%;
`;

const HeaderAndTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h1`
  color: #00DDDD;
  text-align: left;
  margin: 0;
`;

const MaderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4개의 열로 설정 */
  gap: 10px;
  padding: 20px 0 0 0;
  flex: 1; /* 남은 공간을 모두 차지 */
  overflow-y: auto; /* 세로 스크롤 활성화 */
  overflow-x: hidden; /* 가로 스크롤 비활성화 */
  max-height: 55rem;
`;

const FavoriteMaderListPage = () => {
  const [maders, setMaders] = useState([]);

  useEffect(() => {
    const fetchMaders = async () => {
      try {
        const response = await authInstance.get('/api/buyer/myPage');
        console.log('API 응답:', response.data); // 전체 응답 로그

        if (response.data.result && response.data.result.favoriteSellers) {
          setMaders(response.data.result.favoriteSellers);
        } else {
          console.error('예상치 못한 응답 형식:', response.data);
        }
      } catch (error) {
        console.error('데이터 가져오기 오류:', error.message || error);
      }
    };

    fetchMaders();
  }, []);

  return (
    <>
      <FavoriteHeader />
      <Container>
        <HeaderAndTitle>
          <Title>찜한 메이더</Title>
        </HeaderAndTitle>
        <MaderGrid>
          {maders.map(mader => (
            <MaderCard
              key={mader.id}
              image={mader.profileImage} // 이미지 URL을 profileImage로 설정
              mader={mader.name} // 메이더 이름을 name으로 설정
            />
          ))}
        </MaderGrid>
        <FavoriteFooter />
      </Container>
    </>
  );
}

export default FavoriteMaderListPage;
