import React, { useState } from "react";
import * as S from "./ConditionSearchBox.style";
import { useDispatch, useSelector } from "react-redux";
import { searchKeywordProducts } from "../../../state/products/productsSlice";

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
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((cat) => cat !== category)
        : [...prevSelected, category]
    );
  };

  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value);
    console.log(e.target.value);
  };

  const handleSearchBtnClick = () => {
    // dispatch(searchKeywordProducts({ keyword: "test", categories: selectedCategories }));
    dispatch(searchKeywordProducts(searchKeyword));
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
          <S.Label>키워드</S.Label>
          <select name="keyword" id="keyword">
            <option value="">학교명</option>
            <option value="">제품명</option>
            <option value="">상점명</option>
          </select>
          <S.SearchInput type="text" onChange={handleInputChange} />
          <S.SearchIcon></S.SearchIcon>
        </S.InputGroup>

        <S.PriceGroup>
          <S.Label>가격대</S.Label>
          <S.PriceInput type="text" placeholder="최소" />
          ~
          <S.PriceInput type="text" placeholder="최대" />
        </S.PriceGroup>
      </S.FilterSection>

      <S.SelectedArea onClick={() => handleSearchBtnClick()}>
        {" "}
        검색{" "}
      </S.SelectedArea>
    </S.Container>
  );
}

export default ConditionSearchBox;
