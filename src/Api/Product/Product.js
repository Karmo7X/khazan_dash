import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { baseurl, lang, token } from "../../global";

const initialState = {
  data: null,
  status: false,
  statusrate: false,
};

export const GetProductApi = createAsyncThunk("Product/get", async () => {
  try {
   
  
    const res = await axios.get(`${baseurl}/product`, {
      headers: {
        lang: lang,
      },
    });

    
    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const GetRequestBookApi = createAsyncThunk("Productrequest/get", async () => {
  try {
   
  
    const res = await axios.get(`${baseurl}/requestBook`, {
      headers: {
        lang: lang,
        Authorization: `Bearer ${token}`
      },
    });

    
    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const DeleteRequestBookApi = createAsyncThunk(
  "RequestBook/Delete",
  async (bookid) => {
    try {
      const res = await axios.delete(`${baseurl}/requestBook/${bookid}`, {
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
export const GetProductdetailsApi = createAsyncThunk(
  "Product/getProductdetails",
  async (productId) => {
    try {
      const res = await axios.get(`${baseurl}/product/admin/${productId}`, {
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

export const AddProductApi = createAsyncThunk(
  "Product/AddProduct",
  async (productdata) => {
    try {
      const res = await axios.post(`${baseurl}/product`, productdata, {
        headers: {
          lang: lang,
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
          "Content-Type": "multipar/form-data",
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


export const SearchProductApi = createAsyncThunk("Product/search", async (data) => {
  try {
  
    let res;
    const queryParams = [];
  if(data){
  // Add parameters only if they are defined
  if (data?.keyword) {
    queryParams.push(`keyword=${data.keyword}`);
  }
    if (data?.pagenum) {
      queryParams.push(`page=${data.pagenum}`);
    }
    queryParams.push(`limit=16`); // Always include limit

    
    
  }
  

    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

  
      res = await axios.get(`${baseurl}/product/search${queryString}`, {
        headers: {
          lang: lang,
        },
      });
    

    
    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});

export const DeleteProductApi = createAsyncThunk(
  "Product/Delete",
  async (productId) => {
    try {
      const res = await axios.delete(`${baseurl}/product/${productId}`, {
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

export const UpdateProductApi = createAsyncThunk(
  "Product/Update",
  async (data) => {
    try {
      const res = await axios.patch(`${baseurl}/product/${data?.productId}`, data, {
        headers: {
          lang: lang,
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      console.error(err.response.data);
      return err.response.data;
    }
  }
);
export const UpdateProductimgeApi = createAsyncThunk("Product/UpdateProductimge", async (data) => {
  try {

    const res = await axios.patch(`${baseurl}/product/changeCoverImage/${data?.id}`,data, {
      headers: {
        lang: lang,
        'Authorization':`Bearer ${token}`,
        'Accept':'*/*',
        // 'Content-Type':'multipar/form-data',
        'Access-Control-Allow-Origin':'*'
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
    return err.response.data
  }
});
export const UpdateProductpdfApi = createAsyncThunk("Product/UpdateProductpdf", async (data) => {
  try {

    const res = await axios.patch(`${baseurl}/product/changePDFFile/${data?.id}`,data, {
      headers: {
        lang: lang,
        'Authorization':`Bearer ${token}`,
        'Accept':'*/*',
        // 'Content-Type':'multipar/form-data',
        'Access-Control-Allow-Origin':'*'
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
    return err.response.data
  }
});
const Productslice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetProductApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetProductApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(GetProductApi.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(AddProductApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddProductApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(AddProductApi.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(GetProductdetailsApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetProductdetailsApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(GetProductdetailsApi.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(UpdateProductApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateProductApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(UpdateProductApi.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(DeleteProductApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteProductApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(DeleteProductApi.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(UpdateProductimgeApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateProductimgeApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(UpdateProductimgeApi.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(UpdateProductpdfApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateProductpdfApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(UpdateProductpdfApi.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default Productslice.reducer;
