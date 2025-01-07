import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // For internationalization
import { useDispatch } from "react-redux";
import { ForgotPasswordApi } from "../../Api/Auth/AuthSlice";

const Forgetpass = () => {
  const { t } = useTranslation();
  const navigate =useNavigate()
  const dispatch =useDispatch()
  // Form state
  const [formData, setformData] = useState({
    phone: "",
  });
const [showpassconfirm, setShowpassconfirm] = useState(false);
      const [errorvalid, setErrorvalid] = useState();
      const [errormessg, setErrormessg] = useState(null);
      const [successmessage, setSuccessmessage] = useState();
  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const validate = (value) => {
    const error = {};

    // Phone validation
    if (!value.phone) {
      error.phone = t("global.validation_message.phone.required");
    } else if (!/^\d+$/.test(value.phone)) {
      error.phone = t("global.validation_message.phone.pattern"); // Must be numeric
    } else if (value.phone.length < 5) {
      error.phone = t("global.validation_message.phone.minLength"); // Minimum 10 digits
    } else if (value.phone.length > 15) {
      error.phone = t("global.validation_message.phone.maxLength"); // Maximum 15 digits
    }

    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error_submit = validate(formData);

    if (Object.keys(error_submit).length === 0) {
      dispatch(ForgotPasswordApi(formData)).then((res) => {
      
        if (res.payload?.code === 200) {
          setSuccessmessage(res.payload?.message);
      
          setErrorvalid(null);
          localStorage.setItem('phone',formData.phone)
          navigate('/otp')
          
        }else {
          setErrormessg(res.payload?.message);
          
        }
      });
    } else {
      setErrorvalid(error_submit);
    }
  };

  return (
    <>
      {/* <!-- Begin page --> */}
      <div className="accountbg"></div>
      <div className="wrapper-page">
        <div className="card">
          <div className="card-body">
            <h3 className="text-center mt-0 m-b-15">
              <Link to="#" className="logo logo-admin">
                <img src="assets/images/favicon.png" height="70" alt="logo" />
              </Link>
            </h3>
            <div className="p-3">
              <form className="form-horizontal" onSubmit={handleSubmit}>
                <div className="alert alert-info alert-dismissible">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-hidden="true"
                  >
                    ×
                  </button>
                  {t("global.forget.messages.instructions")}
                </div>
                <div className="form-group">
                  <div className="col-xs-12">
                    <label htmlFor="phone">{t("global.forget.labels.phone")}</label>
                    <input
                      className="form-control"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder={t("global.forget.placeholders.phone")}
                    />
                     {errorvalid?.phone && (
                      <>
                        <div class="text-danger">{errorvalid?.phone}</div>
                      </>
                    )}
                  </div>
                </div>

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
                <div className="form-group text-center row m-t-20">
                  <div className="col-12">
                    <button
                      type="button"
                      onClick={(e)=>handleSubmit(e)}
                      className="btn btn-danger btn-block waves-effect waves-light"
                    >
                      {t("global.forget.buttons.sendPhone")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgetpass;
