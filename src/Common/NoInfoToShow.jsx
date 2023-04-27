import { Block, ReportProblem } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

const NoInfoToShow = ({ title }) => {
  return (
    <Box
      mt={4}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <ReportProblem style={{ fontSize: "50px" }} />
      <Typography style={{ fontSize: "20px", textAlign: "center" }}>
        Sorry No {title} To Show
      </Typography>
    </Box>
  );
};

export default NoInfoToShow;
