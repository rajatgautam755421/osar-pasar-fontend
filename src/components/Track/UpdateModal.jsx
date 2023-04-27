import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { CREATE_ORDER_FIELDS } from "../../helpers/constants";
import { makeApiRequests } from "../../helpers/apiHelper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UpdateModal = ({ open, handleClose, setItemToBeEdited }) => {
  const handleUpdate = async () => {
    const response = await makeApiRequests({
      endpoint: `/shipment/update/${open?._id}`,
      requestBody: { ...open },
      method: "PUT",
    });

    if (response) {
      window.location.reload();
    }
  };
  return (
    <>
      <Modal
        open={open !== null}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {CREATE_ORDER_FIELDS(
            open?.deliveryProvience,
            open?.deliveryDistrict
          ).map(({ label, type, key, options, disabled }) => {
            return (
              <Grid xs={4}>
                {type === "dropdown" ? (
                  <FormControl
                    fullWidth
                    size="small"
                    style={{ margin: "10px 0", width: "90%" }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      {label}
                    </InputLabel>
                    <Select
                      label={label}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={open?.[key]}
                      onChange={(e) => {
                        open[key] = e.target.value;
                        setItemToBeEdited({ ...open });
                      }}
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
                    value={open?.[key]}
                    onChange={(e) => {
                      open[key] = e.target.value;
                      setItemToBeEdited({ ...open });
                    }}
                  />
                )}
              </Grid>
            );
          })}
          <Button onClick={handleUpdate} color="success">
            Update
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateModal;
