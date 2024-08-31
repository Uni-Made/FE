import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
`;

export const NumTitle = styled.h1`
  font-size: 38px;
  font-weight: bold;
  line-height: 76px;
  width: 76px;
  text-align: center;
  background-color: #FF0099;
  color: white;
  border-radius: 50%;
  margin-top: 20px;
`;

export const Title = styled.h1`
  font-size: 38px;
  font-weight: bold;
  line-height: 50px;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 10px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  background-color: rgba(244, 244, 244, 1);
  border: none;
  border-radius: 5px;
  font-size: 18px;
  line-height: 30px;
  height: 50px; 
`;

export const InputWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  
`;


export const ErrorMessage = styled.div`
  color: #FF0099;
  font-size: 15px;
  text-align: left;
  min-height: 22px;
`;


export const Button = styled.button`
  background-color: #FF0099;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  max-width: 350px;
  width: 90%;
  height: 60px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #FF0099;
    border: 1.5px solid #FF0099;
  }
`;
export const Select = styled.select`
  width: 32%;
  padding: 14.67px;
  background-color: rgba(244, 244, 244, 1);
  border: none;
  border-radius: 4px;
  font-size: 18px;
  height: 50px;
`;
export const InputWithButton = styled.div`
  position: relative;
  width: 90%;
  margin-bottom: 22px;
  
`;

export const ButtonInInput = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  padding: 5px 10px;
  color: #FF0099;
  background-color: rgba(244, 244, 244, 1);
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
  margin-bottom: 20px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  width: 100%;
  justify-content: flex-start;
  margin-left: 40%;
  @media (max-width: 550px) {
    gap: 10px;
  }
`;

export const CheckboxLabel = styled.label`
  font-size: 28px;
  margin: 5px;
  white-space: nowrap;
  @media (max-width: 550px) {
    font-size: 20px; 
  }
`;
export const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 25px;
  height: 25px;
  border: 2px solid black;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  background-color: white;

  &:checked {
    background-color: black;
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 7px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  @media (max-width: 550px) {
    margin-left: -10px;
  }
  @media (max-width: 375px) {
    margin-left: -30px;
  }
`;

export const Text = styled.p`
  font-size: 28px;
  line-height: 1.5;
  text-align: center;
  margin: 40px 0;
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

export const NameGenderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
`;

// 약관 동의 모달 스타일
export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  position: relative;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

