import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import Header from './components/PurchaseRequestsHeader';
import Footer from '../Buyer_Favorites_chri/components/FavoriteFooter';

const Container = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  min-width: 56%;
`;

const HeaderAndTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: #FF0099;
  text-align: left;
  margin: 0;
`;

const TableWrapper = styled.div`
  max-height: 60vh; /* Set the height for the scrollable area */
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: hidden; /* Disable horizontal scrolling */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1; /* Ensure the header stays on top */
`;

const Th = styled.th`
  background-color: #f0f0f0;
  padding: 25px;
  text-align: center;
  border-right: 1px solid #DDDDDD;
  color: #868686;
`;

const Ta = styled.th`
  background-color: #f0f0f0;
  padding: 25px;
  text-align: center;
  color: #868686;
`;

const Td = styled.td`
  padding: 25px;
  text-align: center;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #DDDDDD;
`;

const PaymentStatusTd = styled(Td)`
  color: ${(props) =>
    props.status === '입금대기' ? 'red' :
    props.status === '수령완료' ? 'gray' :
    'black'};
`;

const ImageTd = styled(Td)`
  padding: 0;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
`;

const PurchaseRequestModal = () => {
  const initialData = [
    { imgSrc: '상품 이미지 URL', name: '상품명입니다.', date: '24/7/14', status: '입금대기' },
    { imgSrc: '상품 이미지 URL', name: '상품명입니다.', date: '24/7/14', status: '입금완료' },
    { imgSrc: '상품 이미지 URL', name: '상품명입니다.', date: '24/7/14', status: '수령완료' },
  ];

  const [data, setData] = useState(initialData);
  const { ref, inView } = useInView();

  const fetchMoreData = useCallback(() => {
    // Simulate fetching more data from server
    const moreData = [
      { imgSrc: '상품 이미지 URL', name: `상품명 ${data.length + 1}`, date: '24/7/14', status: '입금대기' },
      { imgSrc: '상품 이미지 URL', name: `상품명 ${data.length + 2}`, date: '24/7/14', status: '입금완료' },
      { imgSrc: '상품 이미지 URL', name: `상품명 ${data.length + 3}`, date: '24/7/14', status: '수령완료' },
    ];
    setData(prev => [...prev, ...moreData]);
  }, [data.length]);

  useEffect(() => {
    if (inView) {
      fetchMoreData();
    }
  }, [inView, fetchMoreData]);

  return (
    <>
      <Header />
      <Container>
        <HeaderAndTitle>
          <Title>구매요청 확인</Title>
        </HeaderAndTitle>
        <TableWrapper>
          <Table>
            <Thead>
              <Tr>
                <Th>상품</Th>
                <Th>상품명</Th>
                <Th>구매요청일</Th>
                <Ta>입금확인</Ta>
              </Tr>
            </Thead>
            <tbody>
              {data.map((item, index) => (
                <Tr key={index}>
                  <ImageTd><ProductImage src={item.imgSrc} alt="" /></ImageTd>
                  <Td>{item.name}</Td>
                  <Td>{item.date}</Td>
                  <PaymentStatusTd status={item.status}>{item.status}</PaymentStatusTd>
                </Tr>
              ))}
              <Tr ref={ref}>
                <Td colSpan={4}>로딩 중...</Td>
              </Tr>
            </tbody>
          </Table>
        </TableWrapper>
        <Footer />
      </Container>
    </>
  );
};

export default PurchaseRequestModal;
