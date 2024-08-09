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
import { setSelectedProduct } from "../../state/purchase/purchaseSlice";

import { useNavigate } from "react-router-dom";

function ProductListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    products,
    getProductsStatus,
    isFiltered,
    filteredProducts,
    nextCursor,
    isLast,
  } = useSelector((state) => state.products);
  console.log(products, nextCursor, isLast);
  const [order, setOrder] = useState(null); // UI 컴포넌트용
  const [selectedOrder, setSelectedOrder] = useState(null); // 실제로 api 보낼 때 order

  const handleOrderChange = (event) => {
    console.log(event);
    setOrder(event.target.value);
    console.log("select 핸들러");
    if (event.target.value == "최신순") {
      setSelectedOrder("latest");
    } else if (event.target.value == "인기순") {
      setSelectedOrder("favorite");
    } else if (event.target.value == "마감순") {
      setSelectedOrder("deadline");
    }
  };

  const handleProductCardClick = (selectedId) => {
    navigate(`/product/${selectedId}`);
  };

  useEffect(() => {
    console.log("useEffect 실행");
    console.log(localStorage.getItem("accessToken"));
    dispatch(
      getProducts({
        cursor: products == [] && isLast == true ? null : nextCursor,
        sort: selectedOrder,
        // keyword: '',
        // category: 'your-category'
      })
    );
  }, [selectedOrder]);

  return (
    <S.Container>
      <Navbar />
      <ConditionSearchBox />
      <S.OrderBox>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>정렬</InputLabel>
          <Select
            value={order ? order : ""}
            label="정렬"
            onChange={(e) => handleOrderChange(e)}
          >
            <MenuItem
              value={`인기순`}
              // onClick={() => handleOrderBtnClick(`favorite`)}
            >
              인기순
            </MenuItem>
            <MenuItem
              value={`최신순`}
              // onClick={() => handleOrderBtnClick(`latest`)}
            >
              최신순
            </MenuItem>
            <MenuItem
              value={`마감순`}
              // onClick={() => handleOrderBtnClick(`deadline`)}
            >
              가격낮은순
            </MenuItem>
          </Select>
        </FormControl>
      </S.OrderBox>
      <S.ListBox>
        {getProductsStatus != "fulfilled" && <div>로딩중</div>}
        {products.map((item, idx) => (
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
