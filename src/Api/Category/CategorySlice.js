import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { baseurl, lang, token } from "../../global";

const initialState = {
  data: null,
  status: false,
};

export const GetCategoryApi = createAsyncThunk("Catgory/get", async () => {
  try {
    const res = await axios.get(`${baseurl}/category`, {
      headers: {
        lang: lang,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});

export const GetCategorydetailsApi = createAsyncThunk("Catgory/getCategorydetails", async (categoryId) => {
  try {
    const res = await axios.get(`${baseurl}/category/${categoryId}?dashboard=true`, {
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
export const AddCategoryApi = createAsyncThunk("Catgory/add", async (data) => {
  try {
    const res = await axios.post(`${baseurl}/category`, data, {
      headers: {
        lang: lang,
        Authorization: `Bearer ${token}`,
        Accept: "*/*",

        "Access-Control-Allow-Origin": "*",
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
    return err.response.data;
  }
});

export const UpdateCategoryApi = createAsyncThunk(
  "Catgory/Update",
  async (categoryId,data) => {
    
    try {
      const res = await axios.patch(`${baseurl}/category/${categoryId}`, data, {
        headers: {
          lang: lang,
          Authorization: `Bearer ${token}`,
          Accept: "*/*",

          "Access-Control-Allow-Origin": "*",
        },
      });

      return res.data;
    } catch (err) {
      console.error(err.response.data);
      return err.response.data;
    }
  }
);

export const DeleteCategoryApi = createAsyncThunk(
  "Catgory/Delete",
  async (categoryId) => {
    try {
      const res = await axios.delete(`${baseurl}/category/${categoryId}`, {
        headers: {
          lang: lang,
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      console.error(err.response.data);
    }
  }
);

const Categoryslice = createSlice({
  name: "cate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetCategoryApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetCategoryApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(GetCategoryApi.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(AddCategoryApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddCategoryApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(AddCategoryApi.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default Categoryslice.reducer;
