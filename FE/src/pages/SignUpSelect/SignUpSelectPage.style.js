import styled from 'styled-components';

export const Title = styled.h1`
  font-family: 'Inspiration', cursive;
  font-size: 200px;
  font-weight: 400;
  line-height: 254px;
  text-align: center;
  background: linear-gradient(90deg, #FF0099 0%, #00DDDD 100%);
  -webkit-background-clip: text;
  color: transparent;
  margin: 40px 0 20px 0;
  @media (max-width: 768px) {
    font-size: 150px; 
  }
`;

export const Text = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 38px;
  font-weight: 400;
  line-height: 48.41px;
  text-align: center;
  width: 100%;
  /* 미디어 쿼리 추가 */

  @media (max-width: 768px) {
    font-size: 34px; 
  }
  @media (max-width: 590px) {
    font-size: 28px; 
  }

  @media (max-width: 480px) {
    font-size: 25px; 
  }
`;

const BaseButton = styled.button`
  width: 100%;
  max-width: 647px; /* 최대 너비 설정 */
  height: 100px;
  margin: 20px auto;
  display: block;
  border-radius: 20px;
  border: none;
  opacity: 1;
  transition: opacity 300ms ease-out;
  color: white;
  cursor: pointer;
  font-size: 30px;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }
  @media (max-width: 425px) {
    font-size: 20px; 
  }
`;

export const SellerButton = styled(BaseButton)`
  background-color: #FF0099;
  margin-bottom: 60px;
  & > span {
    font-weight: bold;
  }
`;

export const BuyerButton = styled(BaseButton)`
  background-color: #00DDDD;
  & > span {
    font-weight: bold;
  }
`;
