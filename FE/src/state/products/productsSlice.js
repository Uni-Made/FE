import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { defaultInstance } from "../../api/axiosInstance";

// api test 함수
function getProductsTest(url) {
  return new Promise((resolve, reject) => {
    const response = {
      data: {
        products: [
          {
            productId: 1,
            sellerId: 1,
            sellerName: "name",
            university: "University",
            productName: "Product A",
            deadline: "2024-12-31",
            price: 13000,
            productImages: [
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWgoKAG03+7AAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=",
            ],
            options: [],
            detail: "detail",
            reviews: {
              reviewId: 2,
              buyer: "Alice Johnson",
              title: "string",
              content: "string",
              reviewImages: [
                "https://unimade-s3.s3.ap-northeast-2.amazonaws.com/review/1/0791d4ce-5fac-480c-965a-87039c6d310a",
              ],
            },
            questions: null,
          },
          {
            productId: 2,
            sellerId: 1,
            sellerName: "name",
            university: "University",
            productName: "Product B",
            deadline: "2024-12-30",
            price: 11000,
            productImages: [
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWgoKAG03+7AAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=",
            ],
            options: [
              {
                name: "Color",
                values: ["Red", "Blue", "Green"],
              },
              {
                name: "Size",
                values: ["Small", "Medium", "Large"],
              },
            ],
            detail: "detail",
            reviews: [
              {
                reviewId: 1,
                buyer: "Alice ",
                title: "좋아요",
                createdAt: "2024-07-20T01:18:43.571954",
              },
              {
                reviewId: 2,
                buyer: "Johnson",
                title: "좋네요",
                createdAt: "2024-07-20T01:19:12.260617",
              },
            ],
            questions: null,
          },
          {
            productId: 3,
            sellerId: 1,
            sellerName: "name",
            university: "University",
            productName: "Product C",
            deadline: "2024-12-31",
            price: 10000,
            productImages: [
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWgoKAG03+7AAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=",
            ],
            options: [
              {
                name: "Color",
                values: ["Red", "Blue", "Green"],
              },
              {
                name: "Size",
                values: ["Small", "Medium", "Large"],
              },
            ],
            detail: "detail",
            reviews: null,
            questions: null,
          },
        ],
      }, // 이 값이 서버에서 보낸 응답의 본문이다
      status: 200, // http 상태 코드
      statusText: "OK", // http 상태 메세지
    };
    setTimeout(() => {
      resolve(response);
    }, 500); // 0.5초 후에 이행
  });
}

// api 비동기 서버 통신 함수 만들고 extrareducer로 정의
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await getProductsTest("/api/products");
    // const response = await defaultInstance.get("/api/products");
    console.log(response);
    return response.data; // 응답의 데이터를 반환
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
  getProductsStatus: "",
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
          case "hearts":
            return b.hearts - a.hearts; // 추천수 높은 순
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
      state.products = action.payload.products;

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
