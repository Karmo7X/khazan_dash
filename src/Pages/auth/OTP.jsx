import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  ResendCodeApi,
  VerifyCodeApi,

} from "../../Api/Auth/AuthSlice";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
const OTP = () => {
  const { t } = useTranslation();
    const navigate =useNavigate()
  const phonenum = localStorage.getItem("phone");
  const loading = useSelector((state) => state.auth.status);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [timer, setTimer] = useState(30); // Countdown time in seconds
  const [canResend, setCanResend] = useState(false);
  const [successmessage, setSuccessmessage] = useState();
  const [error, setError] = useState(null);
  
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  useEffect(() => {
    inputRefs.current[0]?.focus(); // Auto-focus the first input on load
  }, []);

  // Start countdown timer on component load or when resend is clicked
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = () => {
    const data = {
      phone: phonenum,
    };
    setOtp(new Array(4).fill("")); // Clear OTP fields
    setTimer(30); // Reset timer to 30 seconds
    setCanResend(false); // Disable resend button until countdown completes
    inputRefs.current[0].focus(); // Refocus the first input
    dispatch(ResendCodeApi(data));
  };

  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/, ""); // Only allow numbers
    setOtp([...otp.slice(0, index), value, ...otp.slice(index + 1)]);

    // Auto-focus the next input if a number was entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      phone: phonenum,
      resetCode: otp.join(""),
    };
    dispatch(VerifyCodeApi(data)).then((res) => {
      if (res.payload?.code === 200) {
        setSuccessmessage(res.payload?.message);
        // Cookies.set("token", res.payload?.data?.token);
        navigate('/resetpass')
        setTimeout(() => {
          setSuccessmessage(null);
        }, 2000);
      } else {
        setError(res.payload?.message);
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    });
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
            <div class="identityBox">
              <div class="form-wrapper d-flex align-items-center justify-content-center flex-column gap-5">
                <div className="d-flex align-items-center justify-content-center flex-column text-center">
                  <h1 id="loginModalLabel">{t("global.otp.verifyPhone")}</h1>
                  <p className="w-75">{t("global.otp.enterOtpCode")}</p>
                </div>

                <div
                  className="otp-inputs d-flex align-items-center justify-content-center gap-2"
                  style={{ direction: "ltr" }}
                >
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="form-control  otp-input"
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      style={{
                        width: "50px",
                        height: "50px",
                        margin: "0 5px",
                        textAlign: "center",
                      }}
                    />
                  ))}
                </div>

                <div className="mt-3 ">
                  {canResend ? (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <p>{t("global.otp.didntReceiveCode")}</p>
                      <button className="btn btn-link" onClick={handleResend}>
                        {t("global.otp.resendCode")}
                      </button>
                    </div>
                  ) : (
                    <span>
                      {t("global.otp.resendTimer")} {timer}
                    </span>
                  )}
                </div>
                {successmessage && (
                  <>
                    <div class="alert alert-success" role="alert">
                      {successmessage}
                    </div>
                  </>
                )}
                {error && (
                  <>
                    <div class="alert alert-danger" role="alert">
                      {error}
                    </div>
                  </>
                )}

                <button
                  className="btn btn-danger rounded-0 w-100  mt-3"
                  onClick={(e) => handleSubmit(e)}
                >
                  {loading === "loading" ? (
                    <>
                      <div class="spinner-border text-light" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </>
                  ) : (
                    t("global.otp.verifyOtp")
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTP;
