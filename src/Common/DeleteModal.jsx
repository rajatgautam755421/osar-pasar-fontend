import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const DeleteModal = ({
  open,
  handleClose,
  primaryText,
  cancelAction,
  deleteAction,
  isLoading,
}) => {
  return (
    <Modal open={open !== null} onClose={handleClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" component="h2">
          {primaryText}
        </Typography>
        <Box style={{ display: "flex", justifyContent: "flex-end" }} mt={2}>
          <Button
            variant="outlined"
            color="error"
            onClick={cancelAction}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="success"
            sx={{ ml: 1 }}
            onClick={deleteAction}
            disabled={isLoading}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
