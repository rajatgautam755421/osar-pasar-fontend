import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OurRecommendation from "../../pages/LandingPage/OurRecommendation";

const Subscriptions = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const pathname = useLocation();

  return (
    <>
      {pathname?.search || !user?.subscription ? (
        <OurRecommendation />
      ) : (
        <>
          <Box>
            <Typography style={{ textAlign: "center" }}>
              You are already subscribed to our {user?.subscription} Plan.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={() => navigate("/subscribe?resubscribe=true")}>
                Change plan
              </Button>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Subscriptions;
