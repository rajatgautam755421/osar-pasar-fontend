import { ArrowBack } from "@mui/icons-material";
import {
  Button,
  Card,
  CircularProgress,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { makeApiRequests } from "../helpers/apiHelper";
import { REGISTER_FIELDS } from "../helpers/constants";
import logo from "../logo.png";

const Register = () => {
  const [userInfo, setUserInfo] = useState({});
  const [authInProgress, setAuthInProgress] = useState(false);

  const navigate = useNavigate();

  const onUserInfoChange = (key, value) => {
    userInfo[key] = value;
    setUserInfo({ ...userInfo });
  };

  const handleUserRegistration = async () => {
    const emptyField = REGISTER_FIELDS.find((e) => !userInfo[e.key]);

    if (emptyField) {
      return toast.error(`${emptyField?.label} Field Shouldn't Be Empty`);
    }

    if (userInfo?.password !== userInfo?.confirmPassword) {
      return toast.error("Password Don't Match");
    }

    setAuthInProgress(true);
    const data = await makeApiRequests({
      endpoint: "/users/register",
      requestBody: { ...userInfo },
    });

    if (data) {
      navigate("/login");
    }
    setAuthInProgress(false);
  };

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
            Register To Continue
          </Typography>
          {REGISTER_FIELDS.map(({ label, key, type }) => {
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
                />
                <br />
              </>
            );
          })}
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
              onClick={handleUserRegistration}
              disabled={authInProgress}
            >
              Regster
            </Button>
          </div>

          <Typography style={{ textAlign: "center", fontSize: "14px" }}>
            Already Registered?{" "}
            <span>
              <Link to="/login">Goto Login</Link>
            </span>
          </Typography>
        </Card>
      </div>
    </>
  );
};

export default Register;
