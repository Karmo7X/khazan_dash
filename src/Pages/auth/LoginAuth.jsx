import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { LoginApi, LoginAuthorApi } from "../../Api/Auth/AuthSlice";
import Loadertwo from "../../Components/loader/loadertwo";
import Cookies from "js-cookie";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const LoginAuth = () => {
  const { t, i18n } = useTranslation();
  const loading = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    phone: "",
    password: "",
  });
  const [showpass, setShowpass] = useState(false);
  const [errorvalid, setErrorvalid] = useState();
  const [successmessage, setSuccessmessage] = useState();
  const [errormessg, setErrormessg] = useState(null);

  const handleChange = (name, value) => {
    setFormdata({ ...formdata, [name]: value });
  };

  const validate = (value) => {
    const error = {};

    // Phone validation
    if (!value.phone) {
      error.phone = t("global.validation_message.phone.required");
    }
    // else if (!/^5\d{8}$/.test(value.phone)) {
    //   error.phone = t("global.validation_message.phone.pattern"); // Must be numeric
    // }
    else if (value.phone.length < 5) {
      error.phone = t("global.validation_message.phone.minLength"); // Minimum 10 digits
    } else if (value.phone.length > 15) {
      error.phone = t("global.validation_message.phone.maxLength"); // Maximum 15 digits
    }

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

    return error;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error_submit = validate(formdata);

    if (Object.keys(error_submit).length === 0) {
      dispatch(LoginAuthorApi(formdata)).then((res) => {
        if (res.payload?.code === 200) {
          setSuccessmessage(res.payload?.message);
          Cookies.set("token", res.payload?.data?.token);
          Cookies.set("role", res.payload?.data?.role);
          setErrorvalid(null);
          setErrormessg(null);
          navigate("/Author");
          setTimeout(() => {
            setSuccessmessage(null);
          }, 2000);
          window.location.reload();
        } else {
          setSuccessmessage(null);
          setErrormessg(res.payload?.message);
          setTimeout(() => {
            setErrormessg(null);
          }, 2000);
        }
      });
    } else {
      setErrorvalid(error_submit);
    }
  };
  return (
    <>
      {/* <!-- Begin page --> */}
      <div class="accountbg"></div>
      <div class="wrapper-page">
        <div class="card">
          <div class="card-body">
            <h3 class="text-center mt-0 m-b-15">
              <Link to="/" class="logo logo-admin">
                <img src="assets/images/favicon.png" height="70" alt="logo" />
              </Link>
            </h3>

            <div class="p-3">
              <form class="form-horizontal m-t-20">
                <div class="form-group row">
                  <div class="col-12">
                    <PhoneInput
                      class="form-control"
                      name="phone"
                      value={formdata.phone}
                      placeholder={t("global.login.phoneNumber")}
                      style={{
                        color: "#000",
                        border: "none",
                        borderBottom: "1px solid ",
                        borderRadius: "0px",
                        outline: "none",
                        boxShadow: "none",
                      }}
                      onChange={(value) => {
                        handleChange("phone", value); // Pass the name of the field and its new value
                      }}
                      required
                    />
                  </div>
                  {errorvalid?.phone && (
                    <>
                      <div class="text-danger p-1">{errorvalid?.phone}</div>
                    </>
                  )}
                </div>

                <div class="form-group row">
                  <div class="col-12">
                    <div className="d-flex  align-items-center  ">
                      <input
                        className={` form-control   `}
                        type={showpass === true ? "text" : "password"}
                        name="password"
                        placeholder={t("global.login.enterPassword")}
                        style={{
                          color: "#000",
                          border: "none",
                          borderBottom: "1px solid ",
                          borderRadius: "0px",
                          outline: "none",
                          boxShadow: "none",
                        }}
                        onChange={(e) => {
                          handleChange(e.target.name, e.target.value);
                        }}
                        required
                      />
                      <div>
                        {showpass === true ? (
                          <IoIosEye
                            style={{ fontSize: "20px" }}
                            onClick={() => setShowpass(false)}
                          />
                        ) : (
                          <IoIosEyeOff
                            style={{ fontSize: "20px" }}
                            onClick={() => setShowpass(true)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {errorvalid?.password && (
                    <>
                      <div class="text-danger p-1">{errorvalid?.password}</div>
                    </>
                  )}
                </div>

                {/* <div class="form-group row">
                                <div class="col-12">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="customCheck1"/>
                                        <label class="custom-control-label" for="customCheck1">Remember me</label>
                                    </div>
                                </div>
                            </div> */}
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
                <div class="form-group text-center row m-t-20">
                  <div class="col-12">
                    <button
                      onClick={(e) => handleSubmit(e)}
                      class="btn btn-danger btn-block waves-effect waves-light"
                      type="button"
                    >
                      {loading === "loading" ? (
                        <>
                          <Loadertwo />
                        </>
                      ) : (
                        t("global.login.login")
                      )}
                    </button>
                  </div>
                </div>

                <div class="form-group m-t-10 mb-0 row">
                  <div class="col-sm-7 m-t-20">
                    <Link to="/forgetpass" class="text-muted">
                      <i class="mdi mdi-lock"></i>{" "}
                      <small>{t("global.login.forgotPassword")}</small>
                    </Link>
                  </div>
                  {/* <div class="col-sm-5 m-t-20">
                                    <Link to="/register" class="text-muted"><i class="mdi mdi-account-circle"></i> <small>Create an account ?</small></Link>
                                </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginAuth;
