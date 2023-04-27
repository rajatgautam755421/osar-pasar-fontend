import { Typography } from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import Title from "./Title";
import { makeApiRequests } from "../../helpers/apiHelper";
import { ADMIN_ROLE } from "../../helpers/constants";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    const response = await makeApiRequests({
      endpoint: "/users/all",
      method: "GET",
    });
    if (response) {
      setUsers([...response.filter((r) => r.role !== ADMIN_ROLE)]);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <>
      <Title>Total Users</Title>
      <Typography component="p" variant="h4">
        {users?.length}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {moment().format("MMMM Do YYYY")}
      </Typography>
      <div></div>
    </>
  );
};

export default UsersList;
