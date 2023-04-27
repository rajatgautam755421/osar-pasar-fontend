import { Delete, ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Card,
  Divider,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { ORDER_FIELDS_SHOWN_TO_USER } from "../helpers/constants";

const TrackingOrderComponent = ({
  order,
  showDetails,
  onShowMoreValueChange,
  setItemToBeDeleted,
  setItemToBeEdited,
}) => {
  console.log(setItemToBeEdited, "setItemToBeEdited");
  return (
    <Card variant="outlined" sx={{ p: 2, my: 2 }} component={Paper}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          p: 0.2,
        }}
      >
        <Tooltip
          title={`${showDetails[order?._id] ? "Show Less" : "Show More"}`}
        >
          {showDetails[order?._id] ? (
            <ExpandLess
              onClick={() => onShowMoreValueChange(order?._id, false)}
              sx={{ cursor: "pointer" }}
            />
          ) : (
            <ExpandMore
              sx={{ cursor: "pointer" }}
              onClick={() => onShowMoreValueChange(order?._id, true)}
            />
          )}
        </Tooltip>
        <Tooltip title="Edit">
          <EditIcon
            sx={{
              cursor: "pointer",
              fontSize: "20px",
              mx: 1,
            }}
            onClick={() => setItemToBeEdited({ ...order })}
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Delete
            sx={{
              cursor: "pointer",
              color: "#B90000",
              fontSize: "20px",
            }}
            onClick={() => setItemToBeDeleted({ ...order })}
          />
        </Tooltip>
      </Box>
      <Divider />
      <Grid container>
        {ORDER_FIELDS_SHOWN_TO_USER.filter(({ key }) =>
          !showDetails?.[order?._id]
            ? key === "recieverName" || key === "_id" || key === "status"
            : true
        ).map(({ label, key, icon }) => {
          return (
            <>
              <Grid xs={4} sx={{ mt: 1 }}>
                <Typography style={{ fontSize: "13px", fontWeight: "400" }}>
                  {label} :
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Box>{icon}</Box>
                  <Typography
                    sx={{
                      fontSize: "17px",
                      fontWeight: "700",
                      ml: 1,
                      marginBottom: "5px",
                    }}
                  >
                    {order?.[key]}
                  </Typography>
                </Box>
              </Grid>
            </>
          );
        })}
      </Grid>
    </Card>
  );
};

export default TrackingOrderComponent;
