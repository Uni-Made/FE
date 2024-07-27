import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { defaultInstance, authInstance } from "../../api/axiosInstance";

const initialState = {
  selectedProduct: {},
  getProductDetailsStatus: "", // getProductDetails API 호출 상태
  selectedOptions: [], // 현재 선택한 상품 옵션 배열, 선택된 옵션과 그 때의 수량, 가격만 저장
  totalPrice: 0,
  purchaseFormData: {
    name: "",
    phone: "",
    howToReceive: "online",
    address: "",
    detailAddress: "",
    TermsAdmit: false,
  },
};

export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (productId) => {
    // const response = await getProductDetailsTest(`/api/products/${productId}`);
    const viewType = "DETAIL";
    const response = await defaultInstance.get(
      `/api/products/${productId}?viewType=${viewType}`
    );
    // const response = await authInstance.get(
    //   `/api/products/${productId}?viewType=${viewType}`
    // );
    console.log(response.data);
    return response.data.result; // extraReducer의 action.payload
  }
);

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },

    createSelectedOption: (state, action) => {
      state.selectedOptions = [
        ...state.selectedOptions,
        {
          optionName: action.payload.optionName,
          amount: 1,
          price: action.payload.price,
        },
      ];
    },

    increaseSelectedOption: (state, action) => {
      const targetOption = state.selectedOptions.find(
        (option) => option.optionName === action.payload.optionName
      );
      if (targetOption) {
        targetOption.amount++;
      }
    },

    decreaseSelectedOption: (state, action) => {
      const targetOption = state.selectedOptions.find(
        (option) => option.optionName === action.payload.optionName
      );
      if (targetOption && targetOption.amount > 1) {
        targetOption.amount--;
      } else if (targetOption && targetOption.amount == 1) {
        state.selectedOptions = state.selectedOptions.filter(
          (option) => option.optionName !== action.payload
        );
      }
    },

    removeSelectedOption: (state, action) => {
      // state.selectedOptions.forEach((option) => {
      //   console.log("Option as JSON:", JSON.stringify(option));
      // });
      // console.log("Removing option with name:", action.payload);

      state.selectedOptions = state.selectedOptions.filter(
        (option) => option.optionName != action.payload
      );
    },

    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },

    setPurchaseFormData: (state, action) => {
      state.purchaseFormData = { ...state.purchaseFormData, ...action.payload }; // 객체 병합, 동일 내용은 (뒤로) 덮어쓰기
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductDetails.pending, (state, action) => {
      state.selectedProduct = {};
      state.getProductDetailsStatus = "pending";
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.selectedProduct = action.payload;
      state.getProductDetailsStatus = "fulfilled";
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      console.error("상품 상세정보를 불러오는 데 실패하였습니다");
    });
  },
});

export const {
  setSelectedProduct,
  createSelectedOption,
  increaseSelectedOption,
  decreaseSelectedOption,
  removeSelectedOption,
  setTotalPrice,
  setPurchaseFormData,
} = purchaseSlice.actions;
export default purchaseSlice.reducer;
