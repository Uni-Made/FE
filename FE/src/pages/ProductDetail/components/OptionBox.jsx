import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, MenuItem, Select, Typography, IconButton } from "@mui/material";
// import { Box, Typography, IconButton } from "@mui/material";
import { Close, Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  createSelectedOption,
  decreaseSelectedOption,
  increaseSelectedOption,
  removeSelectedOption,
  setTotalPrice,
} from "../../../state/purchase/purchaseSlice";
import { useParams } from "react-router-dom";

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const OptionContainer = styled(Box)`
  margin-bottom: 20px;
`;

// Styled components
const OptionCard = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 0 5px;
`;

const AmountText = styled(Typography)`
  margin: 0 10px;
  font-size: 1.1rem;
  width: 40px;
  text-align: center;
`;

const OptionText = styled(Typography)`
  flex: 1;
  margin-left: 20px;
  font-size: 1.1rem;
`;

const StyledIconButton = styled(IconButton)`
  padding: 5px;
`;

// option = optionName, amount, price
const ProductOption = ({
  option,
  handleIncrease,
  handleDecrease,
  handleRemove,
}) => {
  console.log(option);
  return (
    <OptionCard>
      <QuantityContainer>
        <StyledIconButton
          onClick={() => handleDecrease(option.optionName)}
          disabled={option.amount <= 1}
        >
          <Remove />
        </StyledIconButton>
        <AmountText variant="body1">{option.amount}</AmountText>
        <StyledIconButton onClick={() => handleIncrease(option.optionName)}>
          <Add />
        </StyledIconButton>
      </QuantityContainer>
      <OptionText variant="body1">
        {option.optionName}, {option.price}원
      </OptionText>
      <StyledIconButton onClick={() => handleRemove(option.optionName)}>
        <Close />
      </StyledIconButton>
    </OptionCard>
  );
};

const getAllCombinations = (options) => {
  if (options.length === 0) return []; // options 비어있으면 빈 배열 반환
  const [first, ...rest] = options; // options 첫 요소와 나머지들로 분할
  const restCombinations = getAllCombinations(rest);
  if (restCombinations.length === 0) {
    return first.values.map((value) => ({ [first.name]: value }));
  }
  return first.values.flatMap((value) =>
    restCombinations.map((combination) => ({
      [first.name]: value,
      ...combination,
    }))
  );
};

const OptionBox = () => {
  // const [selectedOptions, setSelectedOptions] = useState([]);
  // const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const {
    selectedProduct,
    totalPrice,
    getProductDetailsStatus,
    selectedOptions,
  } = useSelector((state) => state.purchase);
  console.log(selectedOptions);

  const productOptions = selectedProduct.options;
  const allCombinations = getAllCombinations(productOptions);

  const handleAddOption = (combination) => {
    // 조합을 문자열로 변환하여 key로 사용
    const optionName = Object.entries(combination)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");

    // 중복된 옵션이 있는지 확인
    const existingOption = selectedOptions.find(
      (option) => option.optionName === optionName
    );

    if (existingOption) {
      // 이미 존재하는 옵션의 수량을 증가
      dispatch(increaseSelectedOption({ optionName, amount: 1 }));
    } else {
      // 새로운 옵션 추가
      const optionWithPrice = {
        optionName,
        amount: 1, // 새로 추가할 때 기본 수량 설정
        price: selectedProduct.price, // 가격 설정
      };
      dispatch(createSelectedOption(optionWithPrice));
    }
  };

  const handleIncrease = (optionName) => {
    dispatch(increaseSelectedOption({ optionName, amount: 1 }));
  };

  const handleDecrease = (optionName) => {
    dispatch(decreaseSelectedOption({ optionName, amount: 1 }));
  };

  const handleRemove = (optionName) => {
    dispatch(removeSelectedOption(optionName));
  };

  const calculateTotalPrice = (options) => {
    const total = options.reduce(
      (acc, option) => acc + option.price * option.amount,
      0
    );
    dispatch(setTotalPrice(total));
  };

  useEffect(() => {
    calculateTotalPrice(selectedOptions);
  }, [selectedOptions]);

  return (
    getProductDetailsStatus == "fulfilled" && (
      <Container>
        <OptionContainer>
          <Select
            displayEmpty
            fullWidth
            onChange={(e) => handleAddOption(JSON.parse(e.target.value))}
            value=""
          >
            <MenuItem value="" disabled>
              상품 옵션 선택
            </MenuItem>
            {allCombinations.map((combination, idx) => (
              <MenuItem key={idx} value={JSON.stringify(combination)}>
                {Object.entries(combination).map(
                  ([key, value]) => `${key}: ${value} `
                )}
              </MenuItem>
            ))}
          </Select>
        </OptionContainer>
        {selectedOptions.map((option) => (
          <ProductOption
            key={option.name}
            option={option}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
            handleRemove={handleRemove}
          />
        ))}
      </Container>
    )
  );
};

export default OptionBox;
