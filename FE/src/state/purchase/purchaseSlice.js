import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { defaultInstance } from "../../api/axiosInstance";

const initialState = {
  selectedProductId: null,
  selectedOptions: [], // 현재 선택한 상품 옵션 배열, 선택된 옵션과 그 때의 수량, 가격만 저장
  totalPrice: 0,
  purchaseFormData: {
    name: "",
    phone: "",
    howToReceive: "",
    address: "",
    detailAddress: "",
    TermsAdmit: false,
  },
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    setSelectedProductId: (state, action) => {
      state.selectedProductId = action.payload;
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
      state.selectedOptions = state.selectedOptions.filter(
        (option) => option.optionName !== action.payload
      );
    },

    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },

    setPurchaseFormData: (state, action) => {
      state.purchaseFormData = { ...state.purchaseFormData, ...action.payload }; // 객체 병합, 동일 내용은 (뒤로) 덮어쓰기
    },
  },
});

export const {
  setSelectedProductId,
  createSelectedOption,
  increaseSelectedOption,
  decreaseSelectedOption,
  removeSelectedOption,
  setTotalPrice,
  setPurchaseFormData,
} = purchaseSlice.actions;
export default purchaseSlice.reducer;
