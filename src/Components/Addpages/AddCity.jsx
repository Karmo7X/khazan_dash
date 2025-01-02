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
import { AddCityApi } from "../../Api/App/App";

const AddCity = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.status);
  const [formData, setFormData] = useState({
    arCity: "", // Arabic title
    enCity: "", // English title
    idCity: "", // Indonesian title
    zhCity: "", // Chinese title
    shippingPrice: null,
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

  const validate = (value) => {
    const error = {};

    // Arabic Title Validation
    if (!value.arCity.trim()) {
      error.arCity = t("global.validation.arCity.required"); // Add a key for this message in your translation files
    }
    // else if (value.arCity.length < 2) {
    //   error.arCity = t("global.validation.arCity.minLength"); // Minimum length check
    // }

    // English Title Validation
    if (!value.enCity.trim()) {
      error.enCity = t("global.validation.enCity.required");
    }
    //  else if (value.enCity.length < 2) {
    //   error.enCity = t("global.validation.enCity.minLength");
    // }

    // Indonesian Title Validation
    if (!value.idCity.trim()) {
      error.idCity = t("global.validation.idCity.required");
    }
    // else if (value.idCity.length < 2) {
    //   error.idCity = t("global.validation.idCity.minLength");
    // }

    // Chinese Title Validation
    if (!value.zhCity.trim()) {
      error.zhCity = t("global.validation.zhCity.required");
    }
    //  else if (value.zhCity.length < 2) {
    //   error.zhCity = t("global.validation.zhCity.minLength");
    // }
    // Shipping Price Validation
    if (!value.shippingPrice.trim()) {
      error.shippingPrice = t("global.validation.shippingPrice.required");
    } else if (isNaN(value.shippingPrice)) {
      error.shippingPrice = t("global.validation.shippingPrice.invalid");
    } else if (parseFloat(value.shippingPrice) <= 0) {
      error.shippingPrice = t("global.validation.shippingPrice.positive");
    }
    return error;
  };
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const error_submit = validate(formData); // Validate only `formData`
    if (Object.keys(error_submit).length === 0) {
      dispatch(AddCityApi(formData)).then((res) => {
        if (res && res.payload) {
          if (res.payload.code === 201) {
            setSuccessmessage(res.payload.message);
            setErrorvalid(null);
            setErrormessg(null);
            navigate('/settings/all')
            // window.location.reload();
            // Reset the form (uncomment if needed)
            // setFormData({
            //   arCity: "",
            //   enCity: "",
            //   idCity: "",
            //   zhCity: "",
            // });
            setBannerimg(null); // Clear image
            setBannerimgdata(null);
          } else {
            setSuccessmessage(null);
            setErrormessg(res.payload.message);
          }
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
                    "global.nav.menu.city.title"
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
                            {t("global.table.form.arCity")}
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="arCity"
                            value={formData.arCity}
                            required
                            placeholder={t("global.table.form.arCity")}
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
                            {t("global.table.form.enCity")}
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="enCity"
                            value={formData.enCity}
                            required
                            placeholder={t("global.table.form.enCity")}
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
                            {t("global.table.form.idCity")}
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="idCity"
                            value={formData.idCity}
                            required
                            placeholder={t("global.table.form.idCity")}
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
                            {t("global.table.form.zhCity")}
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="zhCity"
                            value={formData.zhCity}
                            required
                            placeholder={t("global.table.form.zhCity")}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </form>
                    </TabPanel>
                  </TabContext>
                </Box>
                <div class="form-group">
                  <label className="fw-bold">
                    {" "}
                    {t("global.table.form.shippingPrice")}
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="shippingPrice"
                    value={formData.shippingPrice}
                    required
                    placeholder= {t("global.table.form.shippingPricePlaceholder")}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {errorvalid && (
                  <>
                    <div className="d-flex align-items-center justify-content-center">
                      <div class="alert alert-danger " role="alert">
                        {errorvalid?.arCity ||
                          errorvalid?.enCity ||
                          errorvalid?.idCity ||
                          errorvalid?.zhCity ||
                          errorvalid?.shippingPrice}
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

export default AddCity;
