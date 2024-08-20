import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, MenuItem, Select, Typography, IconButton } from "@mui/material";
import { Close, Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  createSelectedOptionSet,
  decreaseSelectedOptionSet,
  increaseSelectedOptionSet,
  removeSelectedOptionSet,
  setTotalPrice,
} from "../../../state/purchase/purchaseSlice";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const OptionContainer = styled(Box)`
  margin-bottom: 20px;
`;

const OptionCard = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;

  span {
    display: flex;
    justify-content: space-between;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AmountText = styled.p`
  margin: 0 10px;
  font-size: 20px;
  width: 40px;
  text-align: center;
`;

const OptionText = styled.p`
  flex: 1;
  margin-left: 20px;
  font-size: 20px;
`;

const StyledIconButton = styled(IconButton)`
  padding: 5px;
`;

const ProductOption = ({
  option,
  handleIncrease,
  handleDecrease,
  handleRemove,
}) => {
  return (
    <OptionCard>
      <QuantityContainer>
        <StyledIconButton
          onClick={() => handleDecrease(option.optionId)}
          disabled={option.amount <= 1}
        >
          <Remove />
        </StyledIconButton>
        <AmountText>{option.amount}</AmountText>
        <StyledIconButton onClick={() => handleIncrease(option.optionId)}>
          <Add />
        </StyledIconButton>
      </QuantityContainer>

      <OptionText>
        {option.values.map((optionItem) => (
          <>{optionItem + " "}</>
        ))}
        &nbsp; &nbsp;
        {new Intl.NumberFormat("ko-KR").format(option.price)}원
      </OptionText>

      <StyledIconButton onClick={() => handleRemove(option.optionId)}>
        <Close />
      </StyledIconButton>
    </OptionCard>
  );
};

const OptionBox = () => {
  const dispatch = useDispatch();
  const { selectedProduct, totalPrice, selectedOptions } = useSelector(
    (state) => state.purchase
  );
  const [optionId, setOptionId] = useState(1);
  const optionSetInitValue = selectedProduct.options.map((option) => {
    return {
      optionCategory: option.optionCategory,
      optionCategoryValueIds: option.optionValues.map((value) => value.valueId), // 옵션 선택된 거 반영할 때는, 해당 옵션의 밸류가 여기에 포함되는 지로 조건문 검색
      nowOptionValue: "",
      nowOptionValueId: null,
      price: selectedProduct.price, // 각 카테고리별로 가격은 똑같다 가정
    };
  });
  const [optionSet, setOptionSet] = useState(optionSetInitValue);
  console.log(optionSet, selectedProduct.options);

  // optionSet의 모든 카테고리의 값이 채워졌을 때 실행
  const handleSelectOptionSet = (optionSet) => {
    const existingOption = selectedOptions.find(
      (option) => option.optionId == optionSet.optionId
    );
    if (existingOption) {
      dispatch(
        increaseSelectedOptionSet({
          optionId: existingOption.valueId,
          amount: 1,
        })
      );
    } else {
      const newOption = {
        optionId: optionId, // 이걸로 어떤 optionSet인지 구분
        valueIds: optionSet.map((option) => option.nowOptionValueId),
        values: optionSet.map((option) => option.nowOptionValue),
        amount: 1,
        price: selectedProduct.price,
      };
      dispatch(createSelectedOptionSet(newOption));
      setOptionId(optionId + 1);
    }
  };

  const handleIncrease = (optionId) => {
    dispatch(increaseSelectedOptionSet({ optionId, amount: 1 }));
  };

  const handleDecrease = (optionId) => {
    dispatch(decreaseSelectedOptionSet({ optionId, amount: 1 }));
  };

  const handleRemove = (optionId) => {
    dispatch(removeSelectedOptionSet(optionId));
  };

  const handleSelectChange = (e, idx) => {
    const nowOption = JSON.parse(e.target.value); // 현재 선택한 옵션 가져오기

    // optionSet에서 id가 같은 카테고리 객체 값만 변경
    setOptionSet(
      optionSet.map((optionSetItem, i) =>
        i === idx
          ? {
              ...optionSetItem,
              nowOptionValue: nowOption.value, // 선택된 값으로 업데이트
              nowOptionValueId: nowOption.valueId,
            }
          : optionSetItem
      )
    );
  };

  useEffect(() => {
    // 마지막 select 태그가 변경되었을 때 optionSet이 완성된 것으로 간주
    if (
      selectedProduct.options.length === optionSet.length &&
      optionSet.every((option) => option.nowOptionValue)
    ) {
      handleSelectOptionSet(optionSet);
      // 하나의 카드가 만들어지면 optionSet 초기화
      setOptionSet(optionSetInitValue);
    }
  }, [optionSet]);

  useEffect(() => {
    const total = selectedOptions.reduce(
      (acc, option) => acc + option.price * option.amount,
      0
    );
    dispatch(setTotalPrice(total));
  }, [selectedOptions, dispatch]);

  return (
    <Container>
      {/* category : product detail 정보의 options 배열의 순회 반복자 */}
      {selectedProduct.options.map((category, idx) => (
        <OptionContainer key={category.optionCategoryId}>
          <Select
            key={idx}
            displayEmpty
            fullWidth
            onChange={(e) => handleSelectChange(e, idx)}
            value=""
          >
            <MenuItem value="" disabled>
              {category.optionCategory} 선택
            </MenuItem>
            {category.optionValues.map((value) => (
              <MenuItem key={value.valueId} value={JSON.stringify(value)}>
                {value.value}
              </MenuItem>
            ))}
          </Select>
        </OptionContainer>
      ))}
      {selectedOptions.map((option, idx) => (
        <ProductOption
          key={idx}
          option={option}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
          handleRemove={handleRemove}
        />
      ))}
    </Container>
  );
};

export default OptionBox;
