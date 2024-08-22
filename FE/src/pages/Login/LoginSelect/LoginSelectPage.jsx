import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, SellerButton, BuyerButton,Wrap } from './LoginSelectPage.style';
import SignUpHeader from '../components/Header';
import Footer from '../../Buyer_Favorites_chri/components/FavoriteFooter';

function LoginSelectPage() {
  const navigate = useNavigate();

  const handleSellerSignUp = () => {
    navigate('/login', { state: { userType: 'seller' } });
  };

  const handleBuyerSignUp = () => {
    navigate('/loginbpage', { state: { userType: 'buyer' } });
  };

  return (
      <>
        <SignUpHeader />

        <Title> Uni-Made </Title>
        <Text>메이더가 되어 상품을 판매하시나요?</Text>
        <SellerButton onClick={handleSellerSignUp}><span>판매자</span> 로그인</SellerButton>
        <Text>메이더들이 만든 상품을 구매하시나요?</Text>
        <BuyerButton onClick={handleBuyerSignUp}><span>구매자</span> 로그인</BuyerButton>
        <Wrap>
          <Footer/>
        </Wrap>
      </>
    );
}

export default LoginSelectPage;
