import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { baseurl, lang, token } from "../../global";

const initialState = {
  data: null,
  status: false,
};




export const GetOrdersApi = createAsyncThunk("Order/get", async () => {
  try {
    const res = await axios.get(`${baseurl}/order`, {
      headers: {
        lang: lang,
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});


export const UpdateOrdersPaidApi = createAsyncThunk("Order/UpdateOrdersPaid", async (orderID) => {
  try {
    const res = await axios.patch(`${baseurl}/order/${orderID}/paid`,{}, {
      headers: {
        lang: lang,
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const UpdateOrdersDeliveredApi = createAsyncThunk("Order/UpdateOrdersDelivered", async (orderID) => {
  try {
    const res = await axios.patch(`${baseurl}/order/${orderID}/delivered`,{}, {
      headers: {
        lang: lang,
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});

export const UpdateOrdersStateApi = createAsyncThunk("Order/UpdateOrdersState", async (data) => {

  try {
    const res = await axios.patch(`${baseurl}/order/${data.id}/state`,{ state: data.state }, {
      headers: {
        lang: lang,
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});











const OrdersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(GetOrdersApi.pending, (state) => {
          state.status = "loading";
        })
        .addCase(GetOrdersApi.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.data = action.payload;
        })
        .addCase(GetOrdersApi.rejected, (state) => {
          state.status = "failed";
        })
       ;
    },
  });
  
  export default OrdersSlice.reducer;