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
import { useInView } from "react-intersection-observer";
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
  const [selectedOrder, setSelectedOrder] = useState(null); // 실제로 api 보낼 때 order

  // useInView 훅을 사용하여 요소가 뷰포트에 들어왔는지 감지
  const { ref, inView } = useInView({
    triggerOnce: false, // 뷰포트에 들어올 때마다 트리거됨
    threshold: 1.0, // 요소가 완전히 뷰포트에 들어왔을 때 트리거됨
  });

  const handleOrderChange = (event) => {
    setSelectedOrder(event.target.value);
  };

  const handleProductCardClick = (selectedId) => {
    navigate(`/product/${selectedId}`);
  };

  useEffect(() => {
    console.log("useEffect 실행", selectedOrder, inView, isLast);
    if (inView && !isLast) {
      console.log("if문 성공");
      dispatch(
        getProducts({
          cursor: products == [] && isLast == true ? null : nextCursor,
          sort: selectedOrder,
          // keyword: '',
          // category: 'your-category'
          isLoadMore: true,
        })
      );
    }
  }, [inView]);

  useEffect(() => {
    dispatch(
      getProducts({
        sort: selectedOrder,
        isLoadMore: false,
      })
    );
  }, [selectedOrder]);

  return (
    <S.Container>
      <Navbar />
      <ConditionSearchBox />
      <S.OrderBox>
        <select id="sortOptions" onChange={(e) => handleOrderChange(e)}>
          <option value="FAVORITE" selected>
            인기순
          </option>
          <option value="LATEST">최신순</option>
          <option value="DEADLINE">마감순</option>
        </select>
        <div></div>
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
      {products.length == 0 && <div>조건에 맞는 상품 검색결과가 없습니다.</div>}
      <div ref={ref} style={{ height: "10px" }} />{" "}
      {/* 이 div가 뷰포트에 들어올 때 데이터 로드 */}
    </S.Container>
  );
}

export default ProductListPage;
