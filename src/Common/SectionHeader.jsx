import { Typography } from "@mui/material";
import React from "react";

const SectionHeader = ({ title }) => {
  return (
    <Typography
      style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}
    >
      {title}
    </Typography>
  );
};

export default SectionHeader;
