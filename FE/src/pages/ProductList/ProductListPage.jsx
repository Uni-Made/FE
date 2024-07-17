import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ConditionSearchBox from "./components/ConditionSearchBox";
import ProductListCard from "./components/ProductListCard";
import * as S from "./ProductListPage.style";
import { Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import mockData from "./components/mockData";

function ProductListPage() {
  const [order, setOrder] = useState("");
  const [products, setProducts] = useState(mockData);
  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };
  const handleKeywordInputSubmit = (keyword) => {
    // TODO: 키워드로 필터링하게끔 products 조정
    const filteredProducts = products.filter((product) =>
      product.title.includes(keyword)
    );
    setProducts(filteredProducts);
  };
  return (
    <S.Container>
      <Navbar />
      <ConditionSearchBox />
      <S.OrderBox>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>정렬</InputLabel>
          <Select value={order} label="정렬" onChange={handleOrderChange}>
            <MenuItem value={"인기순"}>인기순</MenuItem>
            <MenuItem value={"최신순"}>최신순</MenuItem>
            <MenuItem value={"가격낮은순"}>가격낮은순</MenuItem>
          </Select>
        </FormControl>
      </S.OrderBox>
      <S.ListBox>
        {products.map((item, idx) => (
          <ProductListCard
            key={idx}
            id={item.id}
            imageSrc={item.imageSrc}
            firstTitle={item.firstTitle}
            secondTitle={item.secondTitle}
            price={item.price}
          />
        ))}
      </S.ListBox>
    </S.Container>
  );
}

export default ProductListPage;
