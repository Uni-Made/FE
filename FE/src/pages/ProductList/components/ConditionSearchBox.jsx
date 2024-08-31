import React, { useState } from "react";
import * as S from "./ConditionSearchBox.style";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  searchKeywordProducts,
  // setSelectCategory,
  // setSearchKeyword,
} from "../../../state/products/productsSlice";

const categories = [
  "의류", // 1
  "악세서리", // 2
  "학용품", // 3
  "인형", // 4
  "스티커", // 5
  "잡화", // 6
  "생활용품", // 7
  "행사용품", // 8
  "기타", // 9
];

const categoryToNumberMap = {
  의류: 1,
  악세서리: 2,
  학용품: 3,
  인형: 4,
  스티커: 5,
  잡화: 6,
  생활용품: 7,
  행사용품: 8,
  기타: 9,
};

function ConditionSearchBox() {
  const dispatch = useDispatch();
  // getProduct 4개 conditions
  const [nowKeyword, setNowKeyword] = useState();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const { products, nextCursor, isLast } = useSelector(
    (state) => state.products
  );

  const toggleCategory = (category) => {
    const categoryNumber = categoryToNumberMap[category];
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryNumber)
        ? prevSelected.filter((num) => num !== categoryNumber)
        : [...prevSelected, categoryNumber]
    );
  };

  const handleInputChange = (e) => {
    setNowKeyword(e.target.value);
    // dispatch(setSearchKeyword(e.target.value));
  };

  const handleMinInputChange = (e) => {
    setMinPrice(e.target.value);
  };
  const handleMaxInputChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleSearchBtnClick = () => {
    // dispatch(setSearchKeyword(nowKeyword));
    // dispatch(setSelectCategory(selectedCategories));
    console.log(
      "키워드 및 카테고리 검색 시작",
      nowKeyword,
      selectedCategories,
      minPrice,
      maxPrice
    );
    dispatch(
      getProducts({
        // cursor: products == [] && isLast == true ? null : nextCursor,
        sort: "FAVORITE", // 기본 order로 초기화
        keyword: nowKeyword,
        category: selectedCategories,
        minPrice: minPrice,
        maxPrice: maxPrice,
      })
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
                selected={selectedCategories.includes(
                  categoryToNumberMap[category]
                )}
              >
                {category}
              </S.Item>
            ))}
          </S.CategoryItems>
        </S.Category>

        <S.InputGroup>
          <S.Label>키워드</S.Label>
          <S.SearchInput type="text" onChange={handleInputChange} />
          <S.SearchIcon></S.SearchIcon>
        </S.InputGroup>

        <S.PriceGroup>
          <S.Label>가격대</S.Label>
          <p>최소</p>
          <S.PriceInput type="text" onChange={(e) => handleMinInputChange(e)} />
          ~<p>최대</p>
          <S.PriceInput type="text" onChange={(e) => handleMaxInputChange(e)} />
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
