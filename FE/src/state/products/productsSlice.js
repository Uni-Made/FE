import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { defaultInstance, authInstance } from "../../api/axiosInstance";

// api 비동기 서버 통신 함수 만들고 extrareducer로 정의
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const pageSize = 10;
    const response = await defaultInstance.get(
      `/api/products/list?pageSize=${pageSize}`
    );
    // const response = await authInstance.get(
    //   `/api/products/list?pageSize=${pageSize}`
    // );
    console.log(response.data);
    return response.data.result; // 응답의 데이터를 반환 -> extraReducer의 action.payload
  }
);

const calculateTotalProductsCount = (items) => {
  return items.reduce((acc) => acc + 1, 0);
};

const initialState = {
  products: [], // product 객체의 배열
  filteredProducts: [], // product 검색 결과 배열
  isFiltered: false, // 한 번이라도 검색되면 true
  totalCount: 0,
  getProductsStatus: "", // getProducts API 호출 상태
};

const productsSlice = createSlice({
  name: "products", // 이 슬라이스를 구분하는 이름
  initialState, // initialState : initialState 처럼 똑같이 적는 경우 이렇게 쓸 수 있음
  reducers: {
    getTotalProductsCount: (state) => {
      // reduce : 배열을 순회하며 acc를 증감시켜서 반환하는 메소드
      const total = calculateTotalProductsCount(state.products);
      state.totalCount = total;
    },

    sortProducts: (state, action) => {
      state.products = state.products.sort((a, b) => {
        switch (action.payload) {
          case "price":
            return a.price - b.price; // 가격 낮은 순
          case "favoriteCount":
            return b.favoriteCount - a.favoriteCount; // 추천수 높은 순
          case "deadline":
            return new Date(b.deadline) - new Date(a.deadline); // 데드라인이 많이 남은 순
          default:
            return 0; // 기본적으로 정렬하지 않음
        }
      });
    },

    searchKeywordProducts: (state, action) => {
      const filteredProducts = state.products.filter((product) =>
        product.productName.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.filteredProducts = filteredProducts;
      state.isFiltered = true;
    },
  },
  extraReducers: (builder) => {
    // 프로미스 로딩 (pending) 시점
    builder.addCase(getProducts.pending, (state) => {
      state.products = [];
      state.totalCount = 0;

      state.getProductsStatus = "pending";
    });

    // 프로미스 성공 (fulfilled) 시점
    builder.addCase(getProducts.fulfilled, (state, action) => {
      console.log(action.payload);
      state.products = action.payload.productsList;

      state.getProductsStatus = "fulfilled";
    });

    // 프로미스 실패 (rejected) 시점
    builder.addCase(getProducts.rejected, (state) => {
      state.products = [];

      state.getProductsStatus = "rejected";
      console.error("상품들을 불러오는 데 실패하였습니다");
    });
  },
});

export const { getTotalProductsCount, sortProducts, searchKeywordProducts } =
  productsSlice.actions;
export default productsSlice.reducer; // 리듀서를 통째로 반환해야 emutable한 기능 사용가능
