import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { baseurl, lang, token } from "../../global";

const initialState = {
  data: null,
  status: false,
  addresses:null
};



export const GetAuthorApi = createAsyncThunk("Author/get", async () => {
  try {
    const res = await axios.get(`${baseurl}/author?limit=400`, {
      headers: {
        lang: lang,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const GetUserAuthorApi = createAsyncThunk("UserAuthor/get", async () => {
  try {
    const res = await axios.get(`${baseurl}/author/getProfile`, {
      headers: {
        lang: lang,
        'Authorization':`Bearer ${token}`
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const UpdateUserAuthorApi = createAsyncThunk("UserAuthor/update", async (updatedata) => {
  try {
    const res = await axios.patch(`${baseurl}/author/updateProfile`,updatedata, {
      headers: {
        lang: lang,
        'Authorization':`Bearer ${token}`,
        'Accept':'*/*',
       
        'Access-Control-Allow-Origin':'*'
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
    return err.response.data
  }
});


export const UpdateUserAuthorimgeApi = createAsyncThunk("UserAuthor/UpdateUserimge", async (profileImg) => {
  try {

    const res = await axios.patch(`${baseurl}/author/updateImage`,profileImg, {
      headers: {
        lang: lang,
        'Authorization':`Bearer ${token}`,
        'Accept':'*/*',
        'Content-Type':'multipar/form-data',
        'Access-Control-Allow-Origin':'*'
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
    return err.response.data
  }
});


export const ChangeUserAuthorpassApi = createAsyncThunk("UserAuthor/Changepass", async (updatepassword) => {
  try {
    const res = await axios.patch(`${baseurl}/author/changePassword`,updatepassword, {
      headers: {
        lang: lang,
        'Authorization':`Bearer ${token}`
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
    return err.response.data
  }
});














export const AddAuthorApi = createAsyncThunk("Author/AddAuthor", async (authordata) => {
  try {
    const res = await axios.post(`${baseurl}/author/createAuthor`,authordata, {
      headers: {
        lang: lang,
        'Authorization':`Bearer ${token}`,
        'Accept':'*/*',
        // 'Content-Type':'multipar/form-data',
        

      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
    return err.response.data
  }
});
export const GetAuthordetailsApi = createAsyncThunk("Author/getdetails", async (authorId) => {
  try {
    const res = await axios.get(`${baseurl}/author/${authorId}`, {
      headers: {
        lang: lang,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const GetAuthorproductsApi = createAsyncThunk("Author/getdetails", async (data) => {
  try {
   
    let res;
    const queryParams = [];
  if(data){
  // Add parameters only if they are defined
    if (data?.pagenum) {
      queryParams.push(`page=${data.pagenum}`);
    }
    queryParams.push(`limit=400`); // Always include limit

   
  }
  

    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

    if (token) {
      res = await axios.get(`${baseurl}/product/authorProducts/${data?.id}${queryString}`, {
        headers: {
          lang: lang,
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      res = await axios.get(`${baseurl}/product/authorProducts/${data?.id}${queryString}`, {
        headers: {
          lang: lang,
        },
      });
    }

    
    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const DeleteAuthorApi = createAsyncThunk("Author/DeleteAuthor", async (authorId) => {
  try {
    const res = await axios.delete(`${baseurl}/blockAuthor/${authorId}`, {
      headers: {
        lang: lang,
        'Authorization':`Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const UpdateAuthorApi = createAsyncThunk("Author/AddAuthor", async (authordata) => {
  try {
    const res = await axios.patch(`${baseurl}/author/${authordata?.id}`,authordata, {
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
export const GetAuthorrequestsApi = createAsyncThunk("Author/getdetails", async () => {
  try {
    const res = await axios.get(`${baseurl}/author/formAuthor?limit=10`, {
      headers: {
        lang: lang,
        'Authorization':`Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const DeleteAuthorrequestApi = createAsyncThunk("Author/DeleteAuthorrequest", async (authorId) => {
  try {
    const res = await axios.delete(`${baseurl}/author/formAuthor/${authorId}`, {
      headers: {
        lang: lang,
        'Authorization':`Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const GetMyProductsAuthorApi = createAsyncThunk("Author/getdetails", async () => {
  try {
    const res = await axios.get(`${baseurl}/product/authorMyProducts?limit=100`, {
      headers: {
        lang: lang,
        'Authorization':`Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
 
export const GetMyordersAuthorApi = createAsyncThunk("Author/orders", async () => {
  try {
    const res = await axios.get(`${baseurl}/order/author?limit=100`, {
      headers: {
        lang: lang,
        'Authorization':`Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
  
export const AddAddressApi = createAsyncThunk("author/AddAddress", async (addressdata) => {
  try {
    const res = await axios.post(`${baseurl}/author/address`,addressdata, {
      headers: {
        lang: lang,
        'Authorization':`Bearer ${token}`
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
    return err.response.data
  }
});
 
// export const AddmainAddressApi = createAsyncThunk("author/AddmainAddress", async (addressId) => {
//   try {
//     const res = await axios.post(
//       `${baseurl}/user/address/${addressId}`,
//       {}, // Body of the POST request (if needed)
//       {
//         headers: {
//           lang: lang,
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return res.data;
//   } catch (err) {
//     console.error(err.response.data);
//     return err.response.data
//   }
// });

export const deleteAddressApi = createAsyncThunk("author/deleteAddress", async (addressId) => {
  try {
    const res = await axios.delete(`${baseurl}/author/address/${addressId}`, {
      headers: {
        lang: lang,
        'Authorization':`Bearer ${token}`
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
    return err.response.data
  }
});

const AuthorsSlice = createSlice({
  name: "author",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAuthorApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetAuthorApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(GetAuthorApi.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(AddAuthorApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddAuthorApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(AddAuthorApi.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(GetAuthordetailsApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetAuthordetailsApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(GetAuthordetailsApi.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(GetUserAuthorApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetUserAuthorApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.addresses = action.payload?.data?.author?.address;
      })
      .addCase(GetUserAuthorApi.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default AuthorsSlice.reducer;