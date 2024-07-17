import React from "react";
import styled from "styled-components";

const Input = styled.input`
  background-color: rgba(244, 244, 244, 1);
  border: none;
  border-radius: 10px;
  width: 60%;
  height: 50px;
  font-size: 20px;
  padding: 20px;
`;

function PurchaseInput(props) {
  const { Placeholder } = props;
  return <Input placeholder={Placeholder}></Input>;
}

export default PurchaseInput;
