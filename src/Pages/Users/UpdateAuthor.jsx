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
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "dropify/dist/css/dropify.css";
import "dropify/dist/js/dropify.min.js";
const UpdateAuthor = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.category.status);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    gender: "",
    roles: []
  });

 
  const navigate =useNavigate()
  const [profileimg, setprofileimg] = useState(null);
  const [errorvalid, setErrorvalid] = useState();
  const [errormessg, setErrormessg] = useState(null);
  const [successmessage, setSuccessmessage] = useState();
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [value, setValue] = useState("ar");

  const handleChangetab = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    $(".dropify").dropify();
  }, []);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCategoryimg(file);
  };
  const validate = (value) => {
    const error = {};
  
    // Name Validation
    if (!value.name.trim()) {
      error.name = t("global.validation.name.required");
    } else if (value.name.length < 3) {
      error.name = t("global.validation.name.minLength");
    }
  
    // Email Validation
    if (!value.email.trim()) {
      error.email = t("global.validation.email.required");
    } else if (!/\S+@\S+\.\S+/.test(value.email)) {
      error.email = t("global.validation.email.invalid");
    }
  
    // Password Validation
    if (!value.password.trim()) {
      error.password = t("global.validation.password.required");
    } else if (value.password.length < 6) {
      error.password = t("global.validation.password.minLength");
    }
  
    // Password Confirmation Validation
    if (value.passwordConfirm !== value.password) {
      error.passwordConfirm = t("global.validation.passwordConfirm.oneOf");
    }
  
    // Phone Validation
    if (!value.phone.trim()) {
      error.phone = t("global.validation.phone.required");
    } else if (!/^\d{10}$/.test(value.phone)) {
      error.phone = t("global.validation.phone.invalid");
    }
  
    // Gender Validation
    if (!value.gender.trim()) {
      error.gender = t("global.validation.gender.required");
    }
  
    // Roles Validation (at least one role should be selected)
    if (!value.roles.length) {
      error.roles = t("global.validation.roles.required");
    }
  
    return error;
  };
  
  
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Combine formData and categoryimg for validation
    const combinedFormData = { ...formData, image: categoryimg };
    const error_submit = validate(combinedFormData);
  
    if (Object.keys(error_submit).length === 0) {
     
  
      dispatch(AddCategoryApi(formDataToSend)).then((res) => {
        if (res.payload?.code === 201) {
          setSuccessmessage(res.payload?.message);
          setErrorvalid(null);
          setErrormessg(null);
          // navigate('/category/all')
          // Reset the form
          setFormData({
            arTitle: "",
            enTitle: "",
            idTitle: "",
            zhTitle: "",
          });
          setCategoryimg(null); // Clear image
        } else {
          setSuccessmessage(null);
          setErrormessg(res.payload?.message);
        }
      });
    } else {
      setErrorvalid(error_submit);
    }
  };

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
                  page={` ${t("global.table.add")} ${t(
                    "global.admin.pageTitle"
                  )}`}
                />
              </div>
              {/* tables for data and cate crud functionlity */}
              <div style={{ minHeight: "100vh" }}>
                <Box sx={{ width: "100%", typography: "body1" }}>
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
                          <label> {t("global.table.category.title")}</label>
                          <input
                            type="text"
                            class="form-control"
                            name="arTitle"
                            value={formData.arTitle}
                            required
                            placeholder={t("global.table.category.title")}
                            onChange={(e) => handleChange(e)}
                          />
                         
                        </div>
                      </form>
                    </TabPanel>
                    <TabPanel value="en">
                      <form class="" action="#">
                        <div class="form-group">
                          <label> {t("global.table.category.title")}</label>
                          <input
                            type="text"
                            class="form-control"
                            name="enTitle"
                            value={formData.enTitle}
                            required
                            placeholder={t("global.table.category.title")}
                            onChange={(e) => handleChange(e)}
                          />
                        
                        </div>
                      </form>
                    </TabPanel>
                    <TabPanel value="id">
                      <form class="" action="#">
                        <div class="form-group">
                          <label> {t("global.table.category.title")}</label>
                          <input
                            type="text"
                            class="form-control"
                            name="idTitle"
                            value={formData.idTitle}
                            required
                            placeholder={t("global.table.category.title")}
                            onChange={(e) => handleChange(e)}
                          />
                         
                        </div>
                      </form>
                    </TabPanel>
                    <TabPanel value="zh">
                      <form class="" action="#">
                        <div class="form-group">
                          <label> {t("global.table.category.title")}</label>
                          <input
                            type="text"
                            class="form-control"
                            name="zhTitle"
                            value={formData.zhTitle}
                            required
                            placeholder={t("global.table.category.title")}
                            onChange={(e) => handleChange(e)}
                          />
                         
                        </div>
                      </form>
                    </TabPanel>
                  </TabContext>
                </Box>
                <div class="row d-flex align-items-center justify-content-center">
                  <div class="col-xl-6">
                    <div class="card m-b-30">
                      <div class="card-body">
                        <div>
                          <input
                            type="file"
                            class="dropify"
                            data-height="300"
                            data-max-file-size="3M"
                            data-allowed-file-extensions="png jpg jpeg"
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {errorvalid && (
                  <>
                  <div className="d-flex align-items-center justify-content-center">
                     <div class="alert alert-danger " role="alert">
                      {errorvalid?.arTitle || errorvalid?.enTitle ||errorvalid?.idTitle||errorvalid?.zhTitle}
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
                    onClick={(e)=>handleSubmit(e)}
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
  )
}

export default UpdateAuthor