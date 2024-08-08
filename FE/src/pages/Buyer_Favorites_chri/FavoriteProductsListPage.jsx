import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer'; // Intersection Observer 사용
import FavoriteHeader from './components/FavoriteHeader';
import ProductCard from './components/ProductCard';
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

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4개의 열로 설정 */
  gap: 10px;
  padding: 20px 0 0 0;
  flex: 1; /* 남은 공간을 모두 차지 */
  overflow-y: auto; /* 세로 스크롤 활성화 */
  overflow-x: hidden; /* 가로 스크롤 비활성화 */
  max-height: 55rem;
`;

const FavoriteProductsListPage = () => {
  // 상태 관리
  const [products, setProducts] = useState([
    { id: 1, store: '상점1', image: 'https://via.placeholder.com/200', title: '상품 1', price:'29,000원' },
    { id: 2, store: '상점2', image: 'https://via.placeholder.com/200', title: '상품 2', price:'28,000원' },
    // ... 초기 데이터
  ]);

  // 무한 스크롤에 사용할 ref와 콜백
  const { ref, inView } = useInView({
    threshold: 0.1, // 요소가 10% 보일 때 트리거
    triggerOnce: false, // 한번만 트리거되지 않도록 설정
  });

  const fetchMoreProducts = useCallback(() => {
    // 예제: 새로운 상품 데이터 가져오기 (실제로는 API 호출)
    const newProducts = [
      { id: products.length + 1, store: '상점1', image: 'https://via.placeholder.com/200', title: `상품 ${products.length + 1}`, price:'29,000원' },
      { id: products.length + 2, store: '상점2', image: 'https://via.placeholder.com/200', title: `상품 ${products.length + 2}`, price:'28,000원' },
      { id: products.length + 3, store: '상점3', image: 'https://via.placeholder.com/200', title: `상품 ${products.length + 3}`, price:'27,000원' },
      { id: products.length + 4, store: '상점4', image: 'https://via.placeholder.com/200', title: `상품 ${products.length + 4}`, price:'26,000원' },
      { id: products.length + 5, store: '상점5', image: 'https://via.placeholder.com/200', title: `상품 ${products.length + 5}`, price:'25,000원' },
      { id: products.length + 6, store: '상점6', image: 'https://via.placeholder.com/200', title: `상품 ${products.length + 6}`, price:'24,000원' },
      { id: products.length + 7, store: '상점7', image: 'https://via.placeholder.com/200', title: `상품 ${products.length + 7}`, price:'23,000원' },
      { id: products.length + 8, store: '상점8', image: 'https://via.placeholder.com/200', title: `상품 ${products.length + 8}`, price:'22,000원' },
      { id: products.length + 9, store: '상점9', image: 'https://via.placeholder.com/200', title: `상품 ${products.length + 9}`, price:'21,000원' },
      { id: products.length + 10, store: '상점10', image: 'https://via.placeholder.com/200', title: `상품 ${products.length + 10}`, price:'20,000원' },
      { id: products.length + 11, store: '상점11', image: 'https://via.placeholder.com/200', title: `상품 ${products.length + 11}`, price:'19,000원' },
      { id: products.length + 12, store: '상점12', image: 'https://via.placeholder.com/200', title: `상품 ${products.length + 12}`, price:'18,000원' },
      { id: products.length + 13, store: '상점13', image: 'https://via.placeholder.com/200', title: `상품 ${products.length + 13}`, price:'17,000원' },
      { id: products.length + 14, store: '상점14', image: 'https://via.placeholder.com/200', title: `상품 ${products.length + 14}`, price:'16,000원' },

    ];
    setProducts(prev => [...prev, ...newProducts]);
  }, [products]);

  React.useEffect(() => {
    if (inView) {
      fetchMoreProducts();
    }
  }, [inView, fetchMoreProducts]);

  return (
    <>
      <FavoriteHeader />
        <Container>
          <HeaderAndTitle>
            <Title>찜한 상품</Title>
          </HeaderAndTitle>
          <ProductGrid>
            {products.map(product => (
              <ProductCard
                key={product.id}
                image={product.image}
                store={product.store}
                title={product.title}
                price={product.price}
              />
            ))}
            {/* 아래 div가 화면에 보일 때 새로운 데이터를 로드 */}
            <div ref={ref} style={{ height: '20px' }} />
          </ProductGrid>
          <FavoriteFooter/>
        </Container>
    </>
  );
}

export default FavoriteProductsListPage;
