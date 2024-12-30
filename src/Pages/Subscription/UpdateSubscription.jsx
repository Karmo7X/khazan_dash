import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useNavigate, useParams } from "react-router-dom";
import { AddsubscriptionApi, GetsubscriptionApi, GetsubscriptiondetailsApi, UpdatesubscriptionApi } from "../../Api/Subscription/Subscriptions";
const UpdateSubscription = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { id }=useParams()
  const loading = useSelector((state) => state.product.status);
  const [formData, setFormData] = useState({
    name: {
      ar: "",
      en: "",
      id: "",
      zh: "",
    },
    description: {
      ar: "",
      en: "",
      id: "",
      zh: "",
    },
    price: "",
    duration:"" ,
    coupon: "",
  });

  const navigate = useNavigate();

  const [errorvalid, setErrorvalid] = useState();
  const [errormessg, setErrormessg] = useState(null);
  const [successmessage, setSuccessmessage] = useState();
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the name refers to the nested object in formData
    if (name.includes('name')) {
      // Update the `name` property for the corresponding language
      const language = name.split('.')[0]; // Get language key (e.g., "ar", "en", etc.)
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: {
          ...prevFormData.name,
          [language]: value, // Update the name for the correct language
        },
      }));
    } else if (name.includes('description')) {
      // Update the `description` property for the corresponding language
      const language = name.split('.')[0]; // Get language key (e.g., "ar", "en", etc.)
      setFormData((prevFormData) => ({
        ...prevFormData,
        description: {
          ...prevFormData.description,
          [language]: value, // Update the description for the correct language
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const [value, setValue] = useState("ar");

  const handleChangetab = (event, newValue) => {
    setValue(newValue);
  };

  const validate = (value) => {
    const error = {};
  
    // Arabic Name Validation
    if (!value.name.ar.trim()) {
      error.arName = t("global.validation.arName.required");
    } else if (value.name.ar.length < 3) {
      error.arName = t("global.validation.arName.minLength");
    }
  
    // English Name Validation
    if (!value.name.en.trim()) {
      error.enName = t("global.validation.enName.required");
    } else if (value.name.en.length < 3) {
      error.enName = t("global.validation.enName.minLength");
    }
  
    // Indonesian Name Validation
    if (!value.name.id.trim()) {
      error.idName = t("global.validation.idName.required");
    } else if (value.name.id.length < 3) {
      error.idName = t("global.validation.idName.minLength");
    }
  
    // Chinese Name Validation
    if (!value.name.zh.trim()) {
      error.zhName = t("global.validation.zhName.required");
    } else if (value.name.zh.length < 1) {
      error.zhName = t("global.validation.zhName.minLength");
    }
  
    // Arabic Description Validation (Min Length > 50)
    if (!value.description.ar.trim()) {
      error.arDescription = t("global.validation.arDescription.required");
    } else if (value.description.ar.length < 50) {
      error.arDescription = t("global.validation.arDescription.minLength");
    }
    
  
    // English Description Validation (Min Length > 50)
    if (!value.description.en.trim()) {
      error.enDescription = t("global.validation.enDescription.required");
    } else if (value.description.en.length < 50) {
      error.enDescription = t("global.validation.enDescription.minLength");
    }
  
    // Indonesian Description Validation (Min Length > 50)
    if (!value.description.id.trim()) {
      error.idDescription = t("global.validation.idDescription.required");
    } else if (value.description.id.length < 50) {
      error.idDescription = t("global.validation.idDescription.minLength");
    }
  
    // Chinese Description Validation (Min Length > 50)
    if (!value.description.zh.trim()) {
      error.zhDescription = t("global.validation.zhDescription.required");
    } else if (value.description.zh.length < 50) {
      error.zhDescription = t("global.validation.zhDescription.minLength");
    }
  
    // Price Validation
    if (value.price === 0 || isNaN(value.price)) {
      error.price = t("global.validation.price.required");
    } else if (value.price <= 0) {
      error.price = t("global.validation.price.invalid");
    }
  
    // Duration Validation
    if (value.duration <= 0 || isNaN(value.duration)) {
      error.duration = t("global.validation.duration.invalid");
    }
  
    // Coupon Validation
    if (value.coupon && (isNaN(value.coupon) || value.coupon < 0)) {
      error.coupon = t("global.validation.coupon.invalid");
    }
  
    return error;
  };
  

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const error_submit = validate(formData);

    if (Object.keys(error_submit).length === 0) {
        const data ={
            ...formData,
            'id':id
        }
      dispatch(UpdatesubscriptionApi(data)).then((res) => {
        if (res.payload?.code === 200) {
          setSuccessmessage(res.payload?.message);
          setErrorvalid(null);
          setErrormessg(null);
          navigate("/subscription/all");
          // Reset the form
          setFormData({});
         // Clear image
        } else {
          setSuccessmessage(null);
          setErrormessg(res.payload?.message);
        }
      });
    } else {
      setErrorvalid(error_submit);
    }
  };


  useEffect(() => {
        dispatch(GetsubscriptiondetailsApi()).then((res) => {
          if (res.payload?.code === 200) {
            const subscriptiondetail= Array.isArray(res.payload?.data?.subscriptionPlans) && 
              res.payload?.data?.subscriptionPlans.filter((data)=> data.id === id )
         
            setFormData({
                ...formData,
                name: {
                    ar: subscriptiondetail[0]?.name?.ar,
                    en: subscriptiondetail[0]?.name?.en,
                    id: subscriptiondetail[0]?.name?.id,
                    zh: subscriptiondetail[0]?.name?.zh,
                  },
                  description: {
                    ar: subscriptiondetail[0]?.description?.ar,
                    en: subscriptiondetail[0]?.description?.en,
                    id: subscriptiondetail[0]?.description?.id,
                    zh: subscriptiondetail[0]?.description?.zh,
                  },
                  price: subscriptiondetail[0]?.price,
                  duration:subscriptiondetail[0]?.duration ,
                  coupon: subscriptiondetail[0]?.coupon,
              });
          }
        });
      }, []);
  return (
    <>
      <div class="content-page">
        {/* <!-- Start content --> */}
        <div class="content">
          <Topbar />

          <div class="page-content-wrapper">
            <div class="container-fluid">
              <div class="row">
                <Breadcrumb
                  page={` ${t("global.table.edit")} ${t(
                    "global.nav.menu.subscription.title"
                  )}`}
                />
              </div>
              {/* tables for data and cate crud functionlity */}
              <div style={{ minHeight: "100vh" }}>
                <Box sx={{ width: "100%" }}>
                  <TabContext value={value}>
                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        display: "flex", // Apply flexbox layout
                        justifyContent: "center", // Center the tabs horizontally
                      }}
                    >
                      <TabList
                        sx={{
                          "& .MuiTab-root": {
                            color: "#000", // Tab text color (inactive)
                          },
                          "& .MuiTab-root.Mui-selected": {
                            color: "#007bff", // Active tab text color
                          },
                          "& .MuiTabs-indicator": {
                            backgroundColor: "#007bff", // Indicator color
                          },
                        }}
                        onChange={handleChangetab}
                        aria-label="lab API tabs example"
                        variant="scrollable"
                        scrollButtons={false}
                      >
                        <Tab label={t("global.nav.languages.ar")} value="ar" />

                        <Tab label={t("global.nav.languages.en")} value="en" />
                        <Tab label={t("global.nav.languages.id")} value="id" />
                        <Tab label={t("global.nav.languages.zh")} value="zh" />
                      </TabList>
                    </Box>

                    <TabPanel value="ar">
                      <form class="" action="#">
                        <div class="form-group">
                          <label className="fw-bold">
                            {" "}
                            {t("global.subscriptionColumns.name")}
                          </label>
                          <input
                            type="text"
                            class="form-control "
                           name="ar.name"
                            value={formData.name.ar}
                            required
                            placeholder={t("global.subscriptionColumns.name")}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="fw-bold">
                            {t("global.subscriptionColumns.description")}
                          </label>
                          <textarea
                            className="form-control"
                           name="ar.description"
                            value={formData.description.ar}
                            required
                            placeholder={t("global.books.form.Description")}
                            onChange={handleChange}
                          />
                        </div>
                      </form>
                    </TabPanel>
                    <TabPanel value="en">
                      <form class="" action="#">
                        <div class="form-group">
                          <label className="fw-bold">
                            {" "}
                            {t("global.subscriptionColumns.name")}
                          </label>
                          <input
                            type="text"
                            class="form-control"
                          name="en.name"
                            value={formData.name.en}
                            required
                            placeholder={t("global.subscriptionColumns.name")}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="fw-bold">
                            {t("global.subscriptionColumns.description")}
                          </label>
                          <textarea
                            className="form-control"
                             name="en.description"
                            value={formData.description.en}
                            required
                            placeholder={t("global.books.form.Description")}
                            onChange={handleChange}
                          />
                        </div>
                      </form>
                    </TabPanel>
                    <TabPanel value="id">
                      <form class="" action="#">
                        <div class="form-group">
                          <label className="fw-bold">
                            {" "}
                            {t("global.subscriptionColumns.name")}
                          </label>
                          <input
                            type="text"
                            class="form-control"
                           name="id.name"
                            value={formData.name.id}
                            required
                            placeholder={t("global.subscriptionColumns.name")}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="fw-bold">
                            {t("global.subscriptionColumns.description")}
                          </label>
                          <textarea
                            className="form-control"
                           name="id.description"
                            value={formData.description.id}
                            required
                            placeholder={t("global.books.form.Description")}
                            onChange={handleChange}
                          />
                        </div>
                      </form>
                    </TabPanel>
                    <TabPanel value="zh">
                      <form class="" action="#">
                        <div class="form-group">
                          <label className="fw-bold">
                            {" "}
                            {t("global.subscriptionColumns.name")}
                          </label>
                          <input
                            type="text"
                            class="form-control"
                             name="zh.name"
                            value={formData.name.zh}
                            required
                            placeholder={t("global.subscriptionColumns.name")}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="fw-bold">
                            {t("global.subscriptionColumns.description")}
                          </label>
                          <textarea
                            className="form-control"
                            name="zh.description"
                            value={formData.description.zh}
                            required
                            placeholder={t("global.books.form.Description")}
                            onChange={handleChange}
                          />
                        </div>
                      </form>
                    </TabPanel>
                  </TabContext>
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12">
                      <div class="form-group">
                        <label className="fw-bold">
                          {" "}
                          {t("global.subscriptionColumns.price")}
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="price"
                          value={formData.price}
                          required
                          placeholder={t("global.subscriptionColumns.price")}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                      <div class="form-group">
                        <label className="fw-bold">
                          {" "}
                          {t("global.subscriptionColumns.duration")}
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="duration"
                          value={formData.duration}
                          required
                          placeholder={t("global.subscriptionColumns.duration")}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                      <div class="form-group">
                        <label className="fw-bold">
                          {" "}
                          {t("global.subscriptionColumns.coupon")}
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="coupon"
                          value={formData.coupon}
                          required
                          placeholder={t("global.subscriptionColumns.coupon")}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                </Box>

                {errorvalid && (
                  <>
                    <div className="d-flex align-items-center justify-content-center">
                      <div class="alert alert-danger " role="alert">
                        {
                          errorvalid?.arName ||
                          errorvalid?.enName ||
                          errorvalid?.idName ||
                          errorvalid?.zhName ||
                          errorvalid?.arDescription ||
                          errorvalid?.enDescription ||
                          errorvalid?.idDescription ||
                          errorvalid?.zhDescription ||
                          errorvalid?.price ||
                          errorvalid?.duration ||
                          errorvalid?.coupon}
                      </div>
                    </div>
                  </>
                )}

                {successmessage && (
                  <>
                    <div class="alert alert-success" role="alert">
                      {successmessage}
                    </div>
                  </>
                )}

                {errormessg && (
                  <>
                    <div class="alert alert-danger" role="alert">
                      {errormessg}
                    </div>
                  </>
                )}
                <div class="form-group d-flex align-items-center  w-100 justify-content-center">
                  <button
                    type="button "
                    class="btn btn-primary w-50  waves-effect waves-light"
                    style={{ padding: "15px 30px" }}
                    onClick={(e) => handleSubmit(e)}
                  >
                    {loading === "loading" ? (
                      <>
                        <div class="spinner-border text-light" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </>
                    ) : (
                      t("global.register.submit")
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateSubscription;
