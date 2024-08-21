import React, { useState, useEffect } from 'react';
import { buyerInstance } from '../../api/axiosInstance';
import { Container, Title, Table, Th, Td, ProductImage } from './PurchaseHistoryPage.style';

async function getPurchaseHistory(cursor, pageSize) {
  try {
    const response = await buyerInstance.get(`/buyer/history?cursor=${cursor}&pageSize=${pageSize}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching purchase history: ", error);
    throw error;
  }
}

const PurchaseHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getPurchaseHistory(10, 10); // Adjust cursor and pageSize as needed
        if (response && response.result && response.result.orders) {
          setHistory(response.result.orders);
        } else {
          throw new Error('Unexpected response structure');
        }
      } catch (error) {
        console.error('Error fetching buyer data:', error);
        setError('Error loading history data');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Title>구매내역</Title>
      <Table>
        <thead>
          <tr>
            <Th>상품</Th>
            <Th>상품명</Th>
            <Th>구매요청일</Th>
            <Th>입금확인</Th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.orderId}>
              <Td><ProductImage src={item.productImage} alt={item.productName} /></Td>
              <Td>{item.productName}</Td>
              <Td>{new Date(item.orderTime).toLocaleDateString()}</Td>
              <Td>{item.orderStatus === 'PENDING' ? '대기중' : '확인완료'}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PurchaseHistoryPage;
