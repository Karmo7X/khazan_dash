import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { baseurl, lang, token } from "../../global";

const initialState = {
  data: null,
  status: false,
};

export const GetAdminsApi = createAsyncThunk("Admins/get", async () => {
  try {
    const res = await axios.get(`${baseurl}/admin`, {
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

// export const GetCategorydetailsApi = createAsyncThunk("Catgory/getCategorydetails", async (categoryId) => {
//   try {
//     const res = await axios.get(`${baseurl}/category/${categoryId}?dashboard=true`, {
//       headers: {
//         lang: lang,
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return res.data;
//   } catch (err) {
//     console.error(err.response.data);
//   }
// });
// export const AddCategoryApi = createAsyncThunk("Catgory/add", async (data) => {
//   try {
//     const res = await axios.post(`${baseurl}/category`, data, {
//       headers: {
//         lang: lang,
//         Authorization: `Bearer ${token}`,
//         Accept: "*/*",

//         "Access-Control-Allow-Origin": "*",
//       },
//     });

//     return res.data;
//   } catch (err) {
//     console.error(err.response.data);
//     return err.response.data;
//   }
// });

// export const UpdateCategoryApi = createAsyncThunk(
//   "Catgory/Update",
//   async (categoryId,data) => {
    
//     try {
//       const res = await axios.patch(`${baseurl}/category/${categoryId}`, data, {
//         headers: {
//           lang: lang,
//           Authorization: `Bearer ${token}`,
//           Accept: "*/*",

//           "Access-Control-Allow-Origin": "*",
//         },
//       });

//       return res.data;
//     } catch (err) {
//       console.error(err.response.data);
//       return err.response.data;
//     }
//   }
// );

export const DeleteAdminApi = createAsyncThunk(
  "Admin/Delete",
  async (adminId) => {
    try {
      const res = await axios.delete(`${baseurl}/admin/${adminId}`, {
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

const Adminslice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    //   .addCase(GetCategoryApi.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(GetCategoryApi.fulfilled, (state, action) => {
    //     state.status = "succeeded";
    //     state.data = action.payload;
    //   })
    //   .addCase(GetCategoryApi.rejected, (state) => {
    //     state.status = "failed";
    //   })
    //  ;
  },
});

export default Adminslice.reducer;
