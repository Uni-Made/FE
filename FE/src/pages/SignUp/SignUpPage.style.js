import styled from 'styled-components';

const getColor = ({ isSeller }) => (isSeller ? '#FF0099' : '#00DDDD');

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
`;

export const NumTitle = styled.h1.withConfig({
  shouldForwardProp: (prop) => prop !== 'isSeller',
})`
  font-size: 30px;
  font-weight: bold;
  line-height: 60px;
  width: 60px;
  text-align: center;
  background-color: ${getColor};
  color: white;
  border-radius: 50%;
  margin-top: 20px;
`;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  line-height: 50px;
  text-align: center;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  line-height: 30px;
`;

export const InputWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ErrorMessage = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isSeller',
})`
  color: ${getColor};
  font-size: 12px;
  text-align: left;
  min-height: 20px;
`;

export const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isSeller',
})`
  padding: 10px 20px;
  background-color: ${getColor};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 20px;
  max-width: 350px;
  width: 90%;
  height: 50px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: ${({ isSeller }) => (isSeller ? '#e60082' : '#00cccc')};
  }
`;

export const Select = styled.select`
  width: 32%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  font-size: 16px;
`;

export const InputWithButton = styled.div`
  position: relative;
  width: 90%;
  margin-bottom: 10px;
`;

export const ButtonInInput = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isSeller',
})`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  padding: 5px 10px;
  color: ${getColor};
  border: none;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

export const SelectGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  justify-content: flex-start;
  margin-left: 30%;
  @media (max-width: 550px) {
    gap: 5px;
  }
`;

export const CheckboxLabel = styled.label`
  font-size: 25px;
  white-space: nowrap;

  @media (max-width: 550px) {
    font-size: 20px; 
  }
  @media (max-width: 450px) {
    font-size: 17px; 
  }
`;

export const CheckboxInput = styled.input.attrs({ type: 'checkbox' }).withConfig({
  shouldForwardProp: (prop) => prop !== 'isSeller',
})`
  appearance: none;
  width: 25px;
  height: 25px;
  border: 2px solid black;
  border-radius: 5px;
  position: relative;
  margin-right: 10px;
  margin-top: 10px;
  cursor: pointer;
  @media (max-width: 550px) {
    margin-left: -10px;
  }
  @media (max-width: 375px) {
    margin-left: -30px;
  }
  &:checked::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 5px;
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 0px;
    left: 5px;
    width: 7px;
    height: 14px;
    border: 1px solid ${getColor};
    border-width: 0 4px 4px 0;
    transform: rotate(40deg);
  }
`;

export const Text = styled.p`
  font-size: 25px;
  line-height: 1.5;
  text-align: center;
  margin: 20px 0;
  width: max-content;
  @media (max-width: 700px) {
    font-size: 22px;
  }
  @media (max-width: 600px) {
    font-size: 20px;
  }
  @media (max-width: 530px) {
    font-size: 15px;
    margin:10px 0;

  }
`;

export const LastButton = styled.button`
  padding: 10px 20px;
  background-color: rgba(221, 221, 221, 1);
  color: black;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  width: 350px;
  height: 50px;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;
