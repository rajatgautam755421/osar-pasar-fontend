import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import TrackingOrderComponent from "../../Common/TrackingOrderComponent";
import UpdateModal from "../Track/UpdateModal";

const OrderTable = ({
  allOrders,
  showDetails,
  onShowMoreValueChange,
  setItemToBeDeleted,
  orderSearchQuery,
  onOrderSerachQueryChange,
}) => {
  const [itemToBeEdited, setItemToBeEdited] = useState(null);

  return (
    <>
      <UpdateModal
        open={itemToBeEdited}
        handleClose={() => setItemToBeEdited(null)}
        setItemToBeEdited={setItemToBeEdited}
      />
      <TextField
        id="filled-basic"
        label="Search Order"
        variant="standard"
        sx={{ width: "100%", my: 3 }}
        value={orderSearchQuery}
        onChange={(e) => onOrderSerachQueryChange(e.target.value)}
      />
      {allOrders?.length === 0 && <Typography>No Orders Placed Yet</Typography>}

      {allOrders &&
        allOrders.map((order) => {
          return (
            <TrackingOrderComponent
              order={order}
              showDetails={showDetails}
              onShowMoreValueChange={onShowMoreValueChange}
              setItemToBeDeleted={setItemToBeDeleted}
              setItemToBeEdited={setItemToBeEdited}
            />
          );
        })}
    </>
  );
};

export default OrderTable;
