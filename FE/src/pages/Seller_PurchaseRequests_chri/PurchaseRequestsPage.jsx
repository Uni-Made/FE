import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { useInView } from 'react-intersection-observer';
import Header from './components/PurchaseRequestsHeader';
import Footer from '../Buyer_Favorites_chri/components/FavoriteFooter';
import { sellerInstance } from '../../api/axiosInstance';
import Modal from './components/ModalPR';

const Container = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  width: 100%;

`;

const HeaderAndTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

`;

const Title = styled.h1`
  color: #FF0099;
  text-align: left;
  font-size: 65px;
  margin-bottom: 80px;
  margin-top: 90px;
`;

const TableWrapper = styled.div`
  max-height: 70vh; 
  overflow-y: auto; 
  overflow-x: hidden; 
  position: relative;
  font-size: 23px;
  @media (max-width: 730px) {
    font-size: 17px;
  }
  @media (max-width: 650px) {
    font-size: 15px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; // Ensure columns are properly aligned
  border-spacing: 0; // 간격 제거

`;

const TableHeader = styled.thead`
  position: sticky;
  top: 0;
  background-color: #f0f0f0;
  height: 100px;
  z-index: 1; // z-index 설정
`;

const Th = styled.th`
  background-color: #f0f0f0;
  padding: 30px;
  text-align: center;
  border-right: 1px solid #DDDDDD;
  color: #868686;
`;

const Ta = styled.th`
  background-color: #f0f0f0;
  padding: 30px;
  text-align: center;
  color: #868686;
`;

const Td = styled.td`
  padding: 30px;
  text-align: center;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #DDDDDD;
  
`;

const OrderIDTd = styled(Td)`
  font-size: 23px;
  @media (max-width: 730px) {
    font-size: 17px;
  }
  @media (max-width: 650px) {
    font-size: 15px;
  }  
`;

const getStatusText = (status) => {
  switch (status) {
    case 'PENDING':
      return '입금대기';
    case 'PAID':
      return '입금완료';
    case 'RECEIVED':
      return '수령완료';
    case 'CANCELLED':
      return '주문취소';
    default:
      return '알 수 없음';
  }
};

const PaymentStatusTd = styled(Td)`
  color: ${(props) =>
    props.status === 'PENDING' ? 'red' :
    props.status === 'RECEIVED' ? '#FF0099' :
    props.status === 'CANCELLED' ? 'darkgray' :
    'black'};
  cursor: pointer; 
`;

const PurchaseRequestPage = () => {
  const { productId } = useParams(); // useParams를 사용해 productId 가져오기
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const { ref, inView } = useInView();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const fetchMoreData = useCallback(async () => {
    if (!hasMore) return;

    setIsLoading(true); // 데이터 로딩 시작 시 로딩 상태를 true로 설정

    try {
      const response = await sellerInstance.get(`/seller/product/${productId}?page=${page}`);
      const newData = response.data.content;
      const sortedData = [...data, ...newData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setData(sortedData);
      setHasMore(newData.length > 0);
      setPage(prev => prev + 1);
      setErrorMessage(''); // 데이터 요청 성공 시 에러 메시지 초기화
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('상품이 존재하지 않습니다.'); // 404 에러 처리
        setHasMore(false); 
      } else {
        setErrorMessage('데이터를 가져오는 중 오류가 발생했습니다.'); // 다른 에러 처리
        setHasMore(false); 
      }
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // 데이터 로딩 완료 후 로딩 상태를 false로 설정
    }
  }, [page, hasMore, data, productId]);

  useEffect(() => {
    fetchMoreData();
  }, [fetchMoreData]);

  useEffect(() => {
    if (inView && hasMore) {
      fetchMoreData();
    }
  }, [inView, fetchMoreData, hasMore]);

  const handleStatusClick = (item) => {
    // orderStatus가 undefined인지 확인
    if (typeof item.orderStatus === 'undefined') {
      console.error('orderStatus is undefined');
      return;
    }
    setSelectedItem({
      orderId: item.orderId,
      orderStatus: item.orderStatus,
      productImage: item.productImage,
      productName: item.productName,
    });
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleChangeStatus = async (newStatus) => {
    if (!selectedItem) return;

    const { orderId } = selectedItem;

    try {
      const response = await sellerInstance.put(`/seller/orders/orderStatus/${orderId}`, null, {
        params: { status: newStatus },
        headers: {
          'Accept': 'application/json;charset=UTF-8'
        }
      });
      if (response.status === 200) {
        setData(prev => prev.map(item =>
          item.orderId === orderId ? { ...item, orderStatus: newStatus } : item
        ));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <HeaderAndTitle>
          <Title>구매요청 확인</Title>
        </HeaderAndTitle>
        <TableWrapper>
          <Table>
            <TableHeader>
              <Tr>
                <Th>주문ID</Th>
                <Th>상품명</Th>
                <Th>구매요청일</Th>
                <Ta>입금확인</Ta>
              </Tr>
            </TableHeader>
            <tbody>
              {isLoading ? (
                <Tr>
                  <Td colSpan={4} style={{ textAlign: "center" }}>
                    로딩 중...
                  </Td>
                </Tr>
              ) : errorMessage ? (
                <Tr>
                  <Td colSpan={4} style={{ color: "red", textAlign: "center" }}>
                    {errorMessage}
                  </Td>
                </Tr>
              ) : data.length > 0 ? (
                data.map((item, index) => (
                  <Tr key={`${item.orderId}-${index}`}>
                    <OrderIDTd>{item.orderId}</OrderIDTd>
                    <Td>{item.productName}</Td>
                    <Td>{new Date(item.createdAt).toLocaleDateString()}</Td>
                    <PaymentStatusTd
                      status={item.orderStatus}
                      onClick={() => handleStatusClick(item)}
                    >
                      {getStatusText(item.orderStatus)}
                    </PaymentStatusTd>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={4}>구매요청이 없습니다.</Td>
                </Tr>
              )}
              {hasMore && !isLoading && (
                <Tr ref={ref} key="loading-row">
                  <Td colSpan={4}>로딩 중...</Td>
                </Tr>
              )}
            </tbody>
          </Table>
        </TableWrapper>
        {selectedItem && (
          <Modal
            item={selectedItem}
            onClose={handleCloseModal}
            onChangeStatus={handleChangeStatus}
          />
        )}
        {/* <Footer /> */}
      </Container>
    </>
  );
};

export default PurchaseRequestPage;
