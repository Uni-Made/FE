import React, { useState } from "react";
import * as S from "./ConditionSearchBox.style";

const categories = [
  "의류",
  "악세서리",
  "학용품",
  "인형",
  "스티커",
  "잡화",
  "생활용품",
  "행사용품",
  "기타",
];

function ConditionSearchBox() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((cat) => cat !== category)
        : [...prevSelected, category]
    );
  };

  return (
    <S.Container>
      <S.FilterSection>
        <S.Category>
          <S.CategoryTitle>카테고리</S.CategoryTitle>
          <S.CategoryItems>
            {categories.map((category) => (
              <S.Item
                key={category}
                onClick={() => toggleCategory(category)}
                selected={selectedCategories.includes(category)}
              >
                {category}
              </S.Item>
            ))}
          </S.CategoryItems>
        </S.Category>

        {/* 입력창에 학교명 대신 키워드로 하고, 이 키워드를 학교명, 제품 명, 상점... 으로 정할 수 있게*/}
        <S.InputGroup>
          <S.Label>학교명</S.Label>
          <S.SearchInput type="text" />
          <S.SearchIcon></S.SearchIcon>
        </S.InputGroup>

        <S.PriceGroup>
          <S.Label>가격대</S.Label>
          <S.PriceInput type="text" placeholder="최소" />
          ~
          <S.PriceInput type="text" placeholder="최대" />
        </S.PriceGroup>
      </S.FilterSection>

      <S.SelectedArea> 검색 </S.SelectedArea>
    </S.Container>
  );
}

export default ConditionSearchBox;
