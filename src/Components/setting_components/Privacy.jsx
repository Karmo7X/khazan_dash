import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetHomeApi, GetpolicyApi, UpdateHomeApi, UpdatepolicyApi } from "../../Api/App/App";
const Privacy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const loading = useSelector((state) => state.app.status);
  // State for form data
  const [formData, setFormData] = useState({
    arPrivacyPolicy: "", // Arabic title
    enPrivacyPolicy: "", // English title
    idPrivacyPolicy: "", // Indonesian title
    zhPrivacyPolicy: "", // Chinese title
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
    if (!value.arPrivacyPolicy.trim()) {
      error.arPrivacyPolicy = t("global.validation.arPrivacyPolicy.required"); // Add a key for this message in your translation files
    } else if (value.arPrivacyPolicy.length < 20) {
      error.arPrivacyPolicy = t("global.validation.arPrivacyPolicy.minLength"); // Minimum length check
    }
  
    // English Title Validation
    if (!value.enPrivacyPolicy.trim()) {
      error.enPrivacyPolicy = t("global.validation.enPrivacyPolicy.required");
    } else if (value.enPrivacyPolicy.length < 20) {
      error.enPrivacyPolicy = t("global.validation.enPrivacyPolicy.minLength");
    }
  
    // Indonesian Title Validation
    if (!value.idPrivacyPolicy.trim()) {
      error.idPrivacyPolicy = t("validation.idPrivacyPolicy.required");
    } else if (value.idPrivacyPolicy.length < 20) {
      error.idPrivacyPolicy = t("global.validation.idPrivacyPolicy.minLength");
    }
  
    // Chinese Title Validation
    if (!value.zhPrivacyPolicy.trim()) {
      error.zhPrivacyPolicy = t("global.validation.zhPrivacyPolicy.required");
    } else if (value.zhPrivacyPolicy.length < 20) {
      error.zhPrivacyPolicy = t("global.validation.zhPrivacyPolicy.minLength");
    }
  
    return error;
  };
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const error_submit = validate(formData); // Validate only `formData`
    if (Object.keys(error_submit).length === 0) {
    
      dispatch(UpdatepolicyApi(formData)).then((res) => {
        if (res && res.payload) {
          if (res.payload.code === 200) {
            setSuccessmessage(res.payload.message);
            setErrorvalid(null);
            setErrormessg(null);
            
             window.location.reload()
            // Reset the form (uncomment if needed)
            // setFormData({
            //   arPrivacyPolicy: "",
            //   enPrivacyPolicy: "",
            //   idPrivacyPolicy: "",
            //   zhPrivacyPolicy: "",
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
   
  useEffect(()=>{
    dispatch(GetpolicyApi()).then((res)=>{
        if(res.payload?.code === 200 ){
            setFormData((prev) => ({
                ...prev,
                arPrivacyPolicy: res.payload?.data?.privacyPolicy.ar, // Arabic title
                enPrivacyPolicy: res.payload?.data?.privacyPolicy.en, // English title
                idPrivacyPolicy: res.payload?.data?.privacyPolicy.id, // Indonesian title
                zhPrivacyPolicy: res.payload?.data?.privacyPolicy.zh, // Chinese title
              }));
        }
    })
  },[])

  return (
    <>

     <div className=" mb-3">
     <a  className="btn btn-primary"href="/privacy/create">
     {t("global.nav.menu.privacy_policy.create")}
     </a>
     </div>
      <form class="" action="#">
        <div class="form-group">
          <label className="fw-bold"> {t("global.table.form.arPrivacyPolicy")}</label>
          <textarea
            type="text"
            class="form-control"
            rows={10}
            style={{resize:'none'}}
            name="arPrivacyPolicy"
            value={formData.arPrivacyPolicy}
            required
            placeholder={t("global.table.form.title")}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="form-group">
          <label className="fw-bold"> {t("global.table.form.enPrivacyPolicy")}</label>
          <textarea
            type="text"
            class="form-control"
            rows={10}
            style={{resize:'none'}}
            name="enPrivacyPolicy"
            value={formData.enPrivacyPolicy}
            required
            placeholder={t("global.table.form.title")}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="form-group">
          <label className="fw-bold"> {t("global.table.form.idPrivacyPolicy")}</label>
          <textarea
            type="text"
            class="form-control"
            rows={10}
            style={{resize:'none'}}
            name="idPrivacyPolicy"
            value={formData.idPrivacyPolicy}
            required
            placeholder={t("global.table.form.title")}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="form-group">
          <label className="fw-bold"> {t("global.table.form.zhPrivacyPolicy")}</label>
          <textarea
            type="text"
            class="form-control"
            rows={10}
            style={{resize:'none'}}
            name="zhPrivacyPolicy"
            value={formData.zhPrivacyPolicy}
            required
            placeholder={t("global.table.form.title")}
            onChange={(e) => handleChange(e)}
          />
        </div>
        
        {errorvalid && (
          <>
            <div className="d-flex align-items-center justify-content-center">
              <div class="alert alert-danger " role="alert">
                {errorvalid?.arPrivacyPolicy ||
                  errorvalid?.enPrivacyPolicy ||
                  errorvalid?.idPrivacyPolicy ||
                  errorvalid?.zhPrivacyPolicy}
                  
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
            style={{ padding: "15px 30px" ,background: disable === true ? '#898989' :""}}
            onClick={(e) => handleSubmit(e)}
            disabled={disable}
          >
            {loading === "loading" ? (
              <>
                <div class="spinner-border text-light" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </>
            ) : (
              t("global.table.update")
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default Privacy;
