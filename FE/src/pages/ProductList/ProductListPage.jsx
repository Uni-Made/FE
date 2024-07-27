import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import * as S from "./ProductListPage.style";
import ConditionSearchBox from "./components/ConditionSearchBox";
import ProductListCard from "./components/ProductListCard";
import mockData from "./components/mockData";
import { Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getTotalProductsCount,
  sortProducts,
  searchKeywordProducts,
} from "./../../state/products/productsSlice";

import { useNavigate } from "react-router-dom";

function ProductListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, getProductsStatus, isFiltered, filteredProducts } =
    useSelector((state) => state.products);
  console.log(products);
  const [order, setOrder] = useState("");

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  const handleOrderBtnClick = (order) => {
    dispatch(sortProducts(order));
  };

  const handleProductCardClick = (selectedId) => {
    // const selctedProduct = products.find((product) => {
    //   return product.productId == selectedId;
    // });
    navigate(`/product/${selectedId}`);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <S.Container>
      <Navbar />
      <ConditionSearchBox />
      <S.OrderBox>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>정렬</InputLabel>
          <Select value={order} label="정렬" onChange={handleOrderChange}>
            <MenuItem
              value={"인기순"}
              onClick={() => handleOrderBtnClick("reviews")}
            >
              인기순
            </MenuItem>
            <MenuItem
              value={"최신순"}
              onClick={() => handleOrderBtnClick("deadline")}
            >
              최신순
            </MenuItem>
            <MenuItem
              value={"가격낮은순"}
              onClick={() => handleOrderBtnClick("price")}
            >
              가격낮은순
            </MenuItem>
          </Select>
        </FormControl>
      </S.OrderBox>
      <S.ListBox>
        {getProductsStatus != "fulfilled" && <div>로딩중</div>}
        {isFiltered == false &&
          products.map((item, idx) => (
            <ProductListCard
              key={idx}
              id={item.productId}
              imageSrc={item.imgUrl}
              firstTitle={item.sellerName}
              secondTitle={item.name}
              price={item.price}
              onClick={handleProductCardClick}
            />
          ))}
        {isFiltered == true &&
          filteredProducts.map((item, idx) => (
            <ProductListCard
              key={idx}
              id={item.productId}
              imageSrc={item.imgUrl}
              firstTitle={item.sellerName}
              secondTitle={item.name}
              price={item.price}
              onClick={handleProductCardClick}
            />
          ))}
      </S.ListBox>
    </S.Container>
  );
}

export default ProductListPage;
