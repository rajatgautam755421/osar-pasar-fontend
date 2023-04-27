import React, { useState } from "react";
import SectionHeader from "../../Common/SectionHeader";
import { Box, Button, TextareaAutosize } from "@mui/material";
import { makeApiRequests } from "../../helpers/apiHelper";
import { toast } from "react-hot-toast";

const Email = () => {
  const [message, setMessage] = useState("");
  const handleEmail = async () => {
    if (!message) {
      return toast.error("Messge Field Cannot Be Empty");
    }

    const response = await makeApiRequests({
      endpoint: "/users/email",
      requestBody: { message },
      method: "POST",
    });
    if (response) {
      toast.success("Email Send To All Users Successfully");
      setMessage("");
    }
  };
  return (
    <>
      <SectionHeader title="Send Mail To All Osar Pasar Family" />
      <TextareaAutosize
        placeholder="Enter The Message"
        minRows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          border: "1px solid lightgray",
          borderRadius: "8px",
          margin: "10px 0",
          width: "100%",
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={handleEmail}>
          Send
        </Button>
      </Box>
    </>
  );
};

export default Email;
