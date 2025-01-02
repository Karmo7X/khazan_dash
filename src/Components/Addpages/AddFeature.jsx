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
import {
  AddCategoryApi,
  GetCategorydetailsApi,
} from "../../Api/Category/CategorySlice";
import { useNavigate } from "react-router-dom";
import { AddFeatureApi } from "../../Api/App/App";
const AddFeature = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.status);
  const [formData, setFormData] = useState({
    arTitle: "",
    enTitle: "",
    idTitle: "",
    zhTitle: "",
    arSubTitle: "",
    enSubTitle: "",
    idSubTitle: "",
    zhSubTitle: "",
  });
  const navigate = useNavigate();
  const [featureimg, setfeatureimg] = useState(null);
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
    setfeatureimg(file);
  };
  const validate = (value) => {
    const error = {};

    // Arabic Title Validation
    if (!value.arTitle.trim()) {
      error.arTitle = t("global.validation.arTitle.required"); // Key: arTitle.required
    } else if (value.arTitle.length < 3) {
      error.arTitle = t("global.validation.arTitle.minLength"); // Key: arTitle.minLength
    }

    // English Title Validation
    if (!value.enTitle.trim()) {
      error.enTitle = t("global.validation.enTitle.required"); // Key: enTitle.required
    } else if (value.enTitle.length < 3) {
      error.enTitle = t("global.validation.enTitle.minLength"); // Key: enTitle.minLength
    }

    // Indonesian Title Validation
    if (!value.idTitle.trim()) {
      error.idTitle = t("global.validation.idTitle.required"); // Key: idTitle.required
    } else if (value.idTitle.length < 3) {
      error.idTitle = t("global.validation.idTitle.minLength"); // Key: idTitle.minLength
    }

    // Chinese Title Validation
    if (!value.zhTitle.trim()) {
      error.zhTitle = t("global.validation.zhTitle.required"); // Key: zhTitle.required
    } else if (value.zhTitle.length < 1) {
      error.zhTitle = t("global.validation.zhTitle.minLength"); // Key: zhTitle.minLength
    }

    // Arabic Subtitle Validation
    if (!value.arSubTitle.trim()) {
      error.arSubTitle = t("global.validation.arsubTitle.required"); // Key: arSubTitle.required
    }

    // English Subtitle Validation
    if (!value.enSubTitle.trim()) {
      error.enSubTitle = t("global.validation.ensubTitle.required"); // Key: enSubTitle.required
    }

    // Indonesian Subtitle Validation
    if (!value.idSubTitle.trim()) {
      error.idSubTitle = t("global.validation.idsubTitle.required"); // Key: idSubTitle.required
    }

    // Chinese Subtitle Validation
    if (!value.zhSubTitle.trim()) {
      error.zhSubTitle = t("global.validation.zhsubTitle.required"); // Key: zhSubTitle.required
    }

    return error;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine formData and featureimg for validation
    const combinedFormData = { ...formData, image: featureimg };
    const error_submit = validate(combinedFormData);

    if (Object.keys(error_submit).length === 0) {
      const formDataToSend = new FormData();

      // Append text fields
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // Append image field
      if (featureimg) {
        formDataToSend.append("image", featureimg);
      }

      dispatch(AddFeatureApi(formDataToSend)).then((res) => {
        if (res.payload?.code === 201) {
          setSuccessmessage(res.payload?.message);
          setErrorvalid(null);
          setErrormessg(null);
          navigate("/settings/all");
          // Reset the form
          // setFormData({
          //   arTitle: "",
          //   enTitle: "",
          //   idTitle: "",
          //   zhTitle: "",
          // });
          setfeatureimg(null); // Clear image
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
                    "global.nav.menu.new_feature.title"
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
                            {t("global.table.form.artitle")}
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="arTitle"
                            value={formData.arTitle}
                            required
                            placeholder={t("global.table.form.artitle")}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div class="form-group">
                          <label className="fw-bold">
                            {" "}
                            {t("global.table.form.arsubtitle")}
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="arSubTitle"
                            value={formData.arSubTitle}
                            required
                            placeholder={t("global.table.form.arsubtitle")}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </form>
                    </TabPanel>
                    <TabPanel value="en">
                      <form class="" action="#">
                        <div class="form-group">
                          <label className="fw-bold">
                            {" "}
                            {t("global.table.form.entitle")}
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="enTitle"
                            value={formData.enTitle}
                            required
                            placeholder={t("global.table.form.entitle")}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div class="form-group">
                          <label className="fw-bold">
                            {" "}
                            {t("global.table.form.ensubtitle")}
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="enSubTitle"
                            value={formData.enSubTitle}
                            required
                            placeholder={t("global.table.form.ensubtitle")}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </form>
                    </TabPanel>
                    <TabPanel value="id">
                      <form class="" action="#">
                        <div class="form-group">
                          <label className="fw-bold">
                            {" "}
                            {t("global.table.form.idtitle")}
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="idTitle"
                            value={formData.idTitle}
                            required
                            placeholder={t("global.table.form.idtitle")}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div class="form-group">
                          <label className="fw-bold">
                            {" "}
                            {t("global.table.form.idsubtitle")}
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="idSubTitle"
                            value={formData.idSubTitle}
                            required
                            placeholder={t("global.table.form.idsubtitle")}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </form>
                    </TabPanel>
                    <TabPanel value="zh">
                      <form class="" action="#">
                        <div class="form-group">
                          <label className="fw-bold">
                            {" "}
                            {t("global.table.form.zhtitle")}
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="zhTitle"
                            value={formData.zhTitle}
                            required
                            placeholder={t("global.table.form.zhtitle")}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div class="form-group">
                          <label className="fw-bold">
                            {" "}
                            {t("global.table.form.zhsubtitle")}
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="zhSubTitle"
                            value={formData.zhSubTitle}
                            required
                            placeholder={t("global.table.form.zhsubtitle")}
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
                      <label className="fw-bold p-2" htmlFor="">
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
                        {errorvalid?.arTitle ||
                          errorvalid?.enTitle ||
                          errorvalid?.idTitle ||
                          errorvalid?.zhTitle||
                          errorvalid?.arSubTitle ||
                          errorvalid?.enSubTitle ||
                          errorvalid?.idSubTitle ||
                          errorvalid?.zhSubTitle}
                          
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

export default AddFeature;
