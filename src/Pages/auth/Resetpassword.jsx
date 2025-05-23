import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button, Form } from "react-bootstrap";
import { ResetPasswordApi } from "../../Api/Auth/AuthSlice";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const ResetPassword = () => {
  const { t } = useTranslation();
  const phonenumber = localStorage.getItem("phone");
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const [formData, setFormData] = useState({
    phone: phonenumber,
    password: "",
    passwordConfirm: "",
    deviceToken: "",
  });
  const loading = useSelector((state) => state.auth.status);
  const [successmessage, setSuccessmessage] = useState();
  const [showpass, setShowpass] = useState(false);
  const [showpassconfirm, setShowpassconfirm] = useState(false);
  const [errorvalid, setErrorvalid] = useState();
 
  // Handle opening and closing modal
  const [errormessg, setErrormessg] = useState(null);
  const validate = (value) => {
    const error = {};
    // Password validation
    if (!value.password) {
      error.password = t("global.validation_message.password.required");
    } else if (!/^[^\s]{8,20}$/.test(value.password)) {
      if (value.password.length < 8) {
        error.password = t("global.validation_message.password.minLength");
      } else if (value.password.length > 20) {
        error.password = t("global.validation_message.password.maxLength");
      } else {
        error.password = t("global.validation_message.password.pattern"); // No spaces allowed
      }
    }

    // Password Confirm validation
    if (!value.passwordConfirm) {
      error.passwordConfirm = t(
        "global.validation_message.passwordConfirm.required"
      );
    } else if (value.passwordConfirm !== value.password) {
      error.passwordConfirm = t(
        "global.validation_message.passwordConfirm.oneOf"
      );
    }

    return error;
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const error_submit = validate(formData);

    if (Object.keys(error_submit).length === 0) {
      dispatch(ResetPasswordApi(formData)).then((res) => {
        if (res.payload?.code === 200) {
          setSuccessmessage(res.payload?.message);
          Cookies.set("token", res.payload?.data?.token);
          navigate('/Author')
        } else {
          setErrormessg(res.payload?.message);
        }
      });
    } else {
      setErrorvalid(error_submit);
    }
  };

  return (
    <>
      <div className="accountbg"></div>
      <div className="wrapper-page">
        <div className="card">
          <div className="card-body">
            <h3 className="text-center mt-0 m-b-15">
              <Link to="#" className="logo logo-admin">
                <img src="assets/images/favicon.png" height="70" alt="logo" />
              </Link>
            </h3>
            <div className="identityBox">
              <div className="form-wrapper   d-flex align-items-center justify-content-center flex-column gap-2 w-100">
                <div className="d-flex align-items-center justify-content-center flex-column text-center">
                  <h1>{t("global.resetpass.recoverPassword")}</h1>
                  <p className="w-75">{t("global.resetpass.description")}</p>
                </div>

                {/*  Password  Input */}
                <Form.Group  className=" w-100 mt-2 ">
                  <div className="w-100 mt-2 ">
                    <label htmlFor="password">
                      {t("global.register.password")}
                    </label>
                    <div className="d-flex  align-items-center ">
                      <input
                        className="form-control"
                        type={showpass === true ? "text" : "password"}
                        name="password"
                        placeholder={t("global.register.password")}
                        onChange={(e) => {
                          handleChange(e.target.name, e.target.value);
                        }}
                        style={{ color: "#000" }}
                      />
                      <div>
                        {showpass === true ? (
                          <IoIosEye
                            className="fs-5"
                            onClick={() => setShowpass(false)}
                          />
                        ) : (
                          <IoIosEyeOff
                            className="fs-5"
                            onClick={() => setShowpass(true)}
                          />
                        )}
                      </div>
                    </div>
                    {errorvalid?.password && (
                      <>
                        <div class="text-danger">{errorvalid?.password}</div>
                      </>
                    )}
                  </div>
                </Form.Group>

                {/* Confirm Password Input */}
                <Form.Group className=" w-100 mt-2 mb-3 ">
                  <div className="w-100 mt-2">
                    <label htmlFor="passwordConfirm">
                      {t("global.register.confirmPassword")}
                    </label>
                    <div className="d-flex w-100  align-items-center ">
                      <input
                        className="form-control"
                        type={showpassconfirm === true ? "text" : "password"}
                        name="passwordConfirm"
                        placeholder={t("global.register.confirmPassword")}
                        onChange={(e) => {
                          handleChange(e.target.name, e.target.value);
                        }}
                        style={{ color: "#000" }}
                      />
                      <div>
                        {showpassconfirm === true ? (
                          <IoIosEye
                            className="fs-5"
                            onClick={() => setShowpassconfirm(false)}
                          />
                        ) : (
                          <IoIosEyeOff
                            className="fs-5"
                            onClick={() => setShowpassconfirm(true)}
                          />
                        )}
                      </div>
                    </div>
                    {errorvalid?.passwordConfirm && (
                      <>
                        <div class="text-danger">
                          {errorvalid?.passwordConfirm}
                        </div>
                      </>
                    )}
                  </div>
                </Form.Group>
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
                      {t("global.resetpass.submit")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
