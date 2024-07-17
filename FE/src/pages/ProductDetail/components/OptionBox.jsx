import React, { useState } from "react";
import styled from "styled-components";
import {
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Add, Remove, Close } from "@mui/icons-material";

const Container = styled.div`
  width: 380px;
  margin: 0 auto;
`;

const OptionContainer = styled(Box)`
  margin-bottom: 20px;
`;

const TotalContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-size: 20px;
`;

const ProductOption = ({ option, onChange, onRemove }) => {
  return (
    <Box display="flex" alignItems="center" mb={2}>
      <Select
        value={option.quantity}
        onChange={(e) => onChange(option.name, e.target.value)}
        style={{ marginRight: "10px", width: "100px" }}
      >
        {[...Array(10).keys()].map((num) => (
          <MenuItem key={num + 1} value={num + 1}>
            {num + 1}
          </MenuItem>
        ))}
      </Select>
      <Typography variant="body1" style={{ flex: 1 }}>
        {option.name} {option.price}원
      </Typography>
      <Typography variant="body1" style={{ marginRight: "10px" }}>
        {option.price * option.quantity}원
      </Typography>
      <IconButton onClick={() => onRemove(option.name)}>
        <Close />
      </IconButton>
    </Box>
  );
};

const Test = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const productOptions = [
    { name: "L", price: 2000 },
    { name: "XL", price: 4000 },
  ];

  const handleAddOption = (optionName) => {
    const option = productOptions.find((o) => o.name === optionName);
    setSelectedOptions([...selectedOptions, { ...option, quantity: 1 }]);
  };

  const handleQuantityChange = (optionName, quantity) => {
    const newOptions = selectedOptions.map((option) =>
      option.name === optionName
        ? { ...option, quantity: parseInt(quantity) }
        : option
    );
    setSelectedOptions(newOptions);
    calculateTotalPrice(newOptions);
  };

  const handleRemoveOption = (optionName) => {
    const newOptions = selectedOptions.filter(
      (option) => option.name !== optionName
    );
    setSelectedOptions(newOptions);
    calculateTotalPrice(newOptions);
  };

  const calculateTotalPrice = (options) => {
    const total = options.reduce(
      (acc, option) => acc + option.price * option.quantity,
      0
    );
    setTotalPrice(total);
  };

  return (
    <Container>
      <OptionContainer>
        <Select
          displayEmpty
          fullWidth
          onChange={(e) => handleAddOption(e.target.value)}
          value=""
        >
          <MenuItem value="" disabled>
            사이즈 선택
          </MenuItem>
          {productOptions.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </OptionContainer>
      {selectedOptions.map((option) => (
        <ProductOption
          key={option.name}
          option={option}
          onChange={handleQuantityChange}
          onRemove={handleRemoveOption}
        />
      ))}
      <TotalContainer>
        <Typography>총 상품 금액</Typography>
        <Typography>{totalPrice}원</Typography>
      </TotalContainer>
    </Container>
  );
};

export default Test;
