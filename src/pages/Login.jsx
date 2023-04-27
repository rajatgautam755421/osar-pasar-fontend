import { ArrowBack } from "@mui/icons-material";
import {
  Button,
  Card,
  CircularProgress,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { makeApiRequests } from "../helpers/apiHelper";
import { ADMIN_ROLE, LOGIN_FIELDS } from "../helpers/constants";
import logo from "../logo.png";

const Login = () => {
  const [userInfo, setUserInfo] = useState({});
  const [authInProgress, setAuthInProgress] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const onUserInfoChange = (key, value) => {
    userInfo[key] = value;
    setUserInfo({ ...userInfo });
  };

  const handleUserLogin = async () => {
    const emptyField = LOGIN_FIELDS.find((e) => !userInfo[e.key]);

    if (emptyField) {
      return toast.error(`${emptyField?.label} Field Shouldn't Be Empty`);
    }

    setAuthInProgress(true);

    const response = await makeApiRequests({
      endpoint: showOtpField ? "/users/login/otp" : "/users/login",
      requestBody: { ...userInfo, otp: Number(userInfo?.otp) },
    });

    if (response && !showOtpField) {
      setShowOtpField(true);
      toast.success("OTP has been send successfully to your email.");
    }

    if (response && showOtpField) {
      localStorage.setItem("user", JSON.stringify(response));
      response?.role === ADMIN_ROLE
        ? navigate("/dashboard")
        : navigate("/my-track");
    }
    setAuthInProgress(false);
  };

  useEffect(() => {
    if (user) {
      user?.role === ADMIN_ROLE
        ? navigate("/dashboard")
        : navigate("/my-track");
    }
  }, [user]);

  return (
    <>
      <Tooltip title="Go Back To Home">
        <ArrowBack
          style={{ fontSize: "40px", margin: "2px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </Tooltip>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Card sx={{ width: "35%", padding: "10px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {authInProgress && (
              <CircularProgress
                style={{ position: "absolute", marginTop: "10px" }}
                size={125}
              />
            )}
            <img
              src={logo}
              alt=""
              srcset=""
              style={{ width: "30%", height: "30%" }}
            />
          </div>

          <Typography style={{ textAlign: "center", fontSize: "20px" }}>
            Login To Continue
          </Typography>
          {LOGIN_FIELDS.map(({ label, key, type }) => {
            return (
              <>
                <TextField
                  label={label}
                  variant="outlined"
                  size="small"
                  style={{ margin: "10px 0", width: "100%" }}
                  type={type}
                  value={userInfo[key]}
                  onChange={(e) => onUserInfoChange(key, e.target.value)}
                  disabled={showOtpField}
                />
                <br />
              </>
            );
          })}
          {showOtpField && (
            <TextField
              label="Your OTP"
              variant="outlined"
              size="small"
              style={{ margin: "10px 0", width: "100%" }}
              type="text"
              value={userInfo?.otp}
              onChange={(e) => onUserInfoChange("otp", e.target.value)}
            />
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 0",
            }}
          >
            <Button
              variant="contained"
              style={{
                marginLeft: "auto",
                textAlign: "center",
              }}
              onClick={handleUserLogin}
              disabled={authInProgress}
            >
              {!showOtpField ? "Login" : "Verify OTP"}
            </Button>
          </div>

          <Typography style={{ textAlign: "center", fontSize: "14px" }}>
            Not Registered?{" "}
            <span>
              <Link to="/register">Goto Register</Link>
            </span>
          </Typography>
        </Card>
      </div>
    </>
  );
};

export default Login;
