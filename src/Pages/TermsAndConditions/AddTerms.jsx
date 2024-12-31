import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddTermApi, GetHomeApi, GetpolicyApi, GetTermApi, UpdateHomeApi, UpdatepolicyApi, UpdateTermApi } from "../../Api/App/App";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
const AddTerms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const loading = useSelector((state) => state.app.status);
  // State for form data
  const [formData, setFormData] = useState({
    arTermsAndConditions: "", // Arabic title
    enTermsAndConditions: "", // English title
    idTermsAndConditions: "", // Indonesian title
    zhTermsAndConditions: "", // Chinese title
  });
  

  const [disable, setDisable] = useState(true);
  const [errorvalid, setErrorvalid] = useState();
  const [errormessg, setErrormessg] = useState(null);
  const [successmessage, setSuccessmessage] = useState();
  // Handle textarea change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
  
    setFormData((prev) => ({
        ...prev,
        [name]: value, // Update specific text field
      }));
  
    // Enable the submit button after any change
    setDisable(false);
  };
  

 
  const validate = (value) => {
    const error = {};
  
    // Arabic Title Validation
    if (!value.arTermsAndConditions.trim()) {
      error.arTermsAndConditions = t("global.validation.arTermsAndConditions.required"); // Add a key for this message in your translation files
    } else if (value.arTermsAndConditions.length < 20) {
      error.arTermsAndConditions = t("global.validation.arTermsAndConditions.minLength"); // Minimum length check
    }
  
    // English Title Validation
    if (!value.enTermsAndConditions.trim()) {
      error.enTermsAndConditions = t("global.validation.enTermsAndConditions.required");
    } else if (value.enTermsAndConditions.length < 20) {
      error.enTermsAndConditions = t("global.validation.enTermsAndConditions.minLength");
    }
  
    // Indonesian Title Validation
    if (!value.idTermsAndConditions.trim()) {
      error.idTermsAndConditions = t("validation.idTermsAndConditions.required");
    } else if (value.idTermsAndConditions.length < 20) {
      error.idTermsAndConditions = t("global.validation.idTermsAndConditions.minLength");
    }
  
    // Chinese Title Validation
    if (!value.zhTermsAndConditions.trim()) {
      error.zhTermsAndConditions = t("global.validation.zhTermsAndConditions.required");
    } else if (value.zhTermsAndConditions.length < 20) {
      error.zhTermsAndConditions = t("global.validation.zhTermsAndConditions.minLength");
    }
  
    return error;
  };
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const error_submit = validate(formData); // Validate only `formData`
    if (Object.keys(error_submit).length === 0) {
      setErrorvalid(null);
      dispatch(AddTermApi(formData)).then((res) => {
        if (res && res.payload) {
          if (res.payload.code === 200) {
            setSuccessmessage(res.payload.message);
            setErrorvalid(null);
            setErrormessg(null);
            navigate('/settings/all')
            // Reset the form (uncomment if needed)
            // setFormData({
            //   arTermsAndConditions: "",
            //   enTermsAndConditions: "",
            //   idTermsAndConditions: "",
            //   zhTermsAndConditions: "",
            // });
            setBannerimg(null); // Clear image
            setBannerimgdata(null);
          } else {
            setSuccessmessage(null);
            setErrormessg(res.payload.message);
          }
        } 
      })
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
            <Breadcrumb page={t("global.nav.menu.terms_and_conditions.create")} />
          </div>
          {/* tables for data and cate crud functionlity */}
          <form class="" action="#">
        <div class="form-group">
          <label className="fw-bold"> {t("global.table.form.arTermsAndConditions")}</label>
          <textarea
            type="text"
            class="form-control"
            rows={10}
            style={{resize:'none'}}
            name="arTermsAndConditions"
            value={formData.arTermsAndConditions}
            required
            placeholder={t("global.table.form.title")}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="form-group">
          <label className="fw-bold"> {t("global.table.form.enTermsAndConditions")}</label>
          <textarea
            type="text"
            class="form-control"
            rows={10}
            style={{resize:'none'}}
            name="enTermsAndConditions"
            value={formData.enTermsAndConditions}
            required
            placeholder={t("global.table.form.title")}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="form-group">
          <label className="fw-bold"> {t("global.table.form.idTermsAndConditions")}</label>
          <textarea
            type="text"
            class="form-control"
            rows={10}
            style={{resize:'none'}}
            name="idTermsAndConditions"
            value={formData.idTermsAndConditions}
            required
            placeholder={t("global.table.form.title")}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="form-group">
          <label className="fw-bold"> {t("global.table.form.zhTermsAndConditions")}</label>
          <textarea
            type="text"
            class="form-control"
            rows={10}
            style={{resize:'none'}}
            name="zhTermsAndConditions"
            value={formData.zhTermsAndConditions}
            required
            placeholder={t("global.table.form.title")}
            onChange={(e) => handleChange(e)}
          />
        </div>
        
        {errorvalid && (
          <>
            <div className="d-flex align-items-center justify-content-center">
              <div class="alert alert-danger " role="alert">
                {errorvalid?.arTermsAndConditions ||
                  errorvalid?.enTermsAndConditions ||
                  errorvalid?.idTermsAndConditions ||
                  errorvalid?.zhTermsAndConditions}
                  
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
        <div class="form-group d-flex align-items-center mt-5  w-100 justify-content-center">
          <button
            type="button "
            class="btn btn-primary w-50 mt-5 waves-effect waves-light"
            style={{ padding: "15px 30px" }}
            onClick={(e) => handleSubmit(e)}
            // disabled={disable}
          >
            {loading === "loading" ? (
              <>
                <div class="spinner-border text-light" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </>
            ) : (
              t("global.table.add")
            )}
          </button>
        </div>
      </form>
        </div>
      </div>
    </div>
  </div>
     
    </>
  );
};

export default AddTerms;
