import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.header`
  background-color: #fff;
  padding: 15px; 
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; 
  box-sizing: border-box;
  margin-top: 20px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
const Text = styled.p`
  color: #AAAAAA;
`;
const Footer = () => {
  return (
    <FooterContainer>
      <Text>Uni-Made</Text>
      <Text>Contact. pso9789@naver.com</Text>
      <Text>Instagram. @_siiiiwon</Text>
    </FooterContainer>
  );
};

export default Footer;
