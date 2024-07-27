import styled from 'styled-components';

export const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

export const Title = styled.h1`
  font-size: 36px;
  color: #00c2c7;
  text-align: center;
  margin-bottom: 40px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  font-size: 16px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  width: 100%; /* 전체 너비를 설정 */
  box-sizing: border-box; /* 패딩과 보더를 포함한 전체 너비 설정 */
`;

export const Button = styled.button`
  font-size: 18px;
  color: white;
  background-color: #00c2c7;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #00a5a7;
  }
`;
