import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useOutletContext } from "react-router-dom";
import SectionHeader from "../../Common/SectionHeader";
import { makeApiRequests } from "../../helpers/apiHelper";
import { CREATE_ORDER_FIELDS } from "../../helpers/constants";
import { totalCostForAnOrder } from "../../helpers/generalHelper";
import KhaltiIntegration from "./KhaltiIntegration";
import PriceDescription from "./PriceDescription";

const NewOrder = () => {
  const [orderInfo, setOrderInfo] = useState({});
  const [oderrInProgress, setOrderInProgress] = useState(false);
  const [completePriceDescription, setCompletePriceDescription] =
    useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const { myOrders, setMyOrders } = useOutletContext();

  const onOrderInfoChange = (key, value) => {
    orderInfo[key] = value;
    setOrderInfo({ ...orderInfo });
  };

  const handleCreateOrder = async () => {
    const emptyField = CREATE_ORDER_FIELDS().find((e) => !orderInfo?.[e.key]);

    if (emptyField) {
      return toast.error(`${emptyField?.label} Field Should'not Be Empty`);
    }
    if (completePriceDescription && !orderInfo?.paymentMethod) {
      return toast.error("Please Choose Any One Payment Method.");
    }
    setOrderInProgress(true);

    if (completePriceDescription) {
      const response = await makeApiRequests({
        endpoint: "/shipment",
        requestBody: {
          ...orderInfo,
          user: user?._id,
          isPaid: orderInfo?.paymentMethod === "Online Payment",
        },
      });

      if (response) {
        toast.success(
          `Order Successfully Created And Email Is Sent To ${orderInfo?.recieverEmail}`
        );
        setCompletePriceDescription(null);
        setOrderInfo({});
        setMyOrders([...myOrders, { ...response }]);
      }
    } else {
      setCompletePriceDescription(totalCostForAnOrder(orderInfo, user));
    }
    setOrderInProgress(false);
  };

  return (
    <>
      <SectionHeader title="Create A New Courier Order" />

      <Grid container mt={2}>
        {CREATE_ORDER_FIELDS(
          orderInfo?.deliveryProvience,
          orderInfo?.deliveryDistrict
        ).map(({ label, type, key, options, disabled }) => {
          return (
            <Grid xs={4}>
              {type === "dropdown" ? (
                <FormControl
                  fullWidth
                  size="small"
                  style={{ margin: "10px 0", width: "90%" }}
                >
                  <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                  <Select
                    label={label}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={orderInfo?.[key]}
                    onChange={(e) => onOrderInfoChange(key, e.target.value)}
                    disabled={disabled}
                  >
                    {options.map((option) => (
                      <MenuItem value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  label={label}
                  variant="outlined"
                  size="small"
                  style={{ margin: "10px 0", width: "90%" }}
                  type={type}
                  value={orderInfo?.[key]}
                  onChange={(e) => onOrderInfoChange(key, e.target.value)}
                />
              )}
            </Grid>
          );
        })}
      </Grid>
      {completePriceDescription && (
        <Box>
          <Typography
            style={{
              fontSize: "24px",
              margin: "10px 0",
              textAlign: "center",
              fontWeight: "700px",
            }}
          >
            Total Cost For This Order
          </Typography>

          <PriceDescription
            completePriceDescription={completePriceDescription}
          />
        </Box>
      )}
      {orderInfo?.["paymentMethod"] === "Online Payment" &&
        completePriceDescription && (
          <KhaltiIntegration
            totalPrice={completePriceDescription?.["exactPrice"]}
            paymentMethod={orderInfo?.paymentMethod}
          />
        )}

      {completePriceDescription && (
        <FormControl fullWidth size="small" style={{ margin: "10px 0" }}>
          <InputLabel id="demo-simple-select-label">
            Choose Payment Method
          </InputLabel>
          <Select
            label="Choose Payment Method"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={orderInfo?.["paymentMethod"]}
            onChange={(e) => onOrderInfoChange("paymentMethod", e.target.value)}
          >
            <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem>
            <MenuItem value="Online Payment">Online Payment</MenuItem>
          </Select>
        </FormControl>
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
          onClick={handleCreateOrder}
          disabled={oderrInProgress}
        >
          {oderrInProgress ? (
            <CircularProgress size={20} />
          ) : completePriceDescription ? (
            "Create"
          ) : (
            "Evaluate The Cost"
          )}
        </Button>
      </div>
    </>
  );
};

export default NewOrder;
