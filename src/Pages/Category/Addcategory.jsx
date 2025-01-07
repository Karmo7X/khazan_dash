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
import $ from "jquery";
import "dropify/dist/css/dropify.css";
import "dropify/dist/js/dropify.min.js";
import { AddCategoryApi, GetCategorydetailsApi } from "../../Api/Category/CategorySlice";
import { useNavigate } from "react-router-dom";
const Addcategory = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.category.status);
  const [formData, setFormData] = useState({
    arTitle: "",
    enTitle: "",
    idTitle: "",
    zhTitle: "",
  });
  const navigate =useNavigate()
  const [categoryimg, setCategoryimg] = useState(null);
  const [errorvalid, setErrorvalid] = useState();
  const [errormessg, setErrormessg] = useState(null);
  const [successmessage, setSuccessmessage] = useState();
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
  
    // Arabic Title Validation
    if (!value.arTitle.trim()) {
      error.arTitle = t("global.validation.arTitle.required"); // Add a key for this message in your translation files
    } else if (value.arTitle.length < 3) {
      error.arTitle = t("global.validation.arTitle.minLength"); // Minimum length check
    }
  
    // English Title Validation
    if (!value.enTitle.trim()) {
      error.enTitle = t("global.validation.enTitle.required");
    } else if (value.enTitle.length < 3) {
      error.enTitle = t("global.validation.enTitle.minLength");
    }
  
    // Indonesian Title Validation
    if (!value.idTitle.trim()) {
      error.idTitle = t("validation.idTitle.required");
    } else if (value.idTitle.length < 3) {
      error.idTitle = t("global.validation.idTitle.minLength");
    }
  
    // Chinese Title Validation
    if (!value.zhTitle.trim()) {
      error.zhTitle = t("global.validation.zhTitle.required");
    } else if (value.zhTitle.length < 1) {
      error.zhTitle = t("global.validation.zhTitle.minLength");
    }
  
    return error;
  };
  
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const error_submit = validate(formData);

  if (Object.keys(error_submit).length === 0) {
    const formDataToSend = new FormData();

    // Append text fields
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // Append image field
    if (categoryimg) {
      formDataToSend.append("image", categoryimg);
    }

  
      dispatch(AddCategoryApi(formDataToSend)).then((res) => {
        if (res.payload?.code === 201) {
          setSuccessmessage(res.payload?.message);
          setErrorvalid(null);
          setErrormessg(null);
          navigate('/category/all')
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
                    "global.nav.menu.category.title"
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
                          <label className="fw-bold"> {t("global.table.category.title")}</label>
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
                          <label className="fw-bold"> {t("global.table.category.title")}</label>
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
                          <label className="fw-bold"> {t("global.table.category.title")}</label>
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
                          <label className="fw-bold"> {t("global.table.category.title")}</label>
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
                    <label className="fw-bold p-2"  htmlFor="">
                            {" "}
                            {t("global.table.category.image")}
                          </label>
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
  );
};

export default Addcategory;
