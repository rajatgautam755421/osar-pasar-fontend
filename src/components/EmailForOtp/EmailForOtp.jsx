import { TextField } from "@mui/material";
import React, { useState } from "react";

const EmailForOtp = () => {
  const [email, setEmail] = useState("");

  return (
    <TextField
      label="Email"
      variant="outlined"
      size="small"
      style={{ margin: "10px 0", width: "100%" }}
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  );
};

export default EmailForOtp;
