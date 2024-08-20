import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { authInstance } from '../../api/axiosInstance'; 
import FavoriteHeader from './components/FavoriteHeader';
import MaderCard from './components/MaderCard';
import FavoriteFooter from './components/FavoriteFooter';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 88vh;
  width: 70%;
  min-width: 900px;
`;

const FooterWrapper = styled.div`
  width: 100%;
`;

const Container = styled.div`
  padding: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  max-height: 40rem;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
  min-height: 300px; /* 기본 높이 설정 */
`;

const TitleContainer = styled.div`
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  color: #00DDDD;
  font-size: 2.5rem;
  margin: 0;
  text-align: left;
  margin-bottom: 15px;
`;

const MaderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  flex: 1;
  min-height: 1px;
  padding: 0;
`;

const NoMadersMessage = styled.p`
  margin-top: 10px;
  color: #888;
`;

const FavoriteMaderListPage = () => {
  const [maders, setMaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState(null);
  const pageSize = 16;
  const containerRef = useRef(null);

  const fetchMaders = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const response = await authInstance.get('/buyer/favorite-sellers', {
        params: {
          cursor: cursor || undefined,
          pageSize: pageSize,
        },
      });
      console.log(response);
      const { favoriteSellers, nextCursor, isLast } = response.data.result;

      const validatedMaders = favoriteSellers.map(mader => ({
        ...mader,
        profileImage: mader.profileImage || 'default-image-url',
      }));

      setMaders(prevMaders => [...prevMaders, ...validatedMaders]);
      setCursor(nextCursor);
      setHasMore(!isLast);
    } catch (error) {
      console.error('데이터 가져오기 오류:', error.message || error);
      setError(error.message || '데이터 가져오기 오류');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaders(); 
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = container;
        if (scrollHeight - scrollTop <= clientHeight * 1.5) {
          fetchMaders();
        }
      };

      container.addEventListener('scroll', handleScroll);

      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [hasMore, loading, cursor]);

  return (
    <>
      <FavoriteHeader />
      <PageWrapper>
        <TitleContainer>
          <Title>찜한 메이더</Title>
        </TitleContainer>
        <Container ref={containerRef}>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {maders.length > 0 ? (
            <MaderGrid>
              {maders.map(mader => (
                <MaderCard
                  key={mader.id}
                  image={mader.profileImage}
                  mader={mader.name}
                />
              ))}
            </MaderGrid>
          ) : (
            !loading && <NoMadersMessage>찜한 상품이 없습니다.</NoMadersMessage>
          )}
        </Container>
        <FooterWrapper>
          <FavoriteFooter />
        </FooterWrapper>
      </PageWrapper>
    </>
  );
}

export default FavoriteMaderListPage;
