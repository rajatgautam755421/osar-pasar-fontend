import React, { useEffect, useState } from "react";
import { makeApiRequests } from "../../helpers/apiHelper";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { binarySearch, camelToNormal } from "../../helpers/generalHelper";
import DeleteIcon from "@mui/icons-material/Delete";
import { ADMIN_ROLE } from "../../helpers/constants";
import { toast } from "react-hot-toast";
import SectionHeader from "../../Common/SectionHeader";

const columns = ["name", "email", "otp", "role"];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAllUsers = async () => {
    setLoading(true);
    const response = await makeApiRequests({
      endpoint: "/users/all",
      method: "GET",
    });
    if (response) {
      setUsers([...response.filter((r) => r.role !== ADMIN_ROLE)]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (query === "") {
      fetchAllUsers();
    }
  }, [query]);

  const handleDelete = async (email) => {
    const response = await makeApiRequests({
      endpoint: "/users/delete",
      requestBody: { email },
    });

    if (response) {
      setUsers([...users.filter((user) => user?.email !== response)]);
      toast.success("Successfully Deleted");
    }
  };

  const handleBinarySearch = () => {
    users.sort((a, b) => a.name.localeCompare(b.name));
    setUsers([...users]);
    const arrayWithName = users.map((user) => user?.name);

    arrayWithName.sort();

    const returnedIndex = binarySearch(
      [...arrayWithName],
      query,
      0,
      users.length - 1,
      "name"
    );

    setUsers(returnedIndex !== -1 ? [users?.[returnedIndex]] : []);
  };

  return (
    <>
      <SectionHeader title="All Users" />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          label="search"
          variant="outlined"
          size="small"
          style={{ margin: "10px 0", width: "92%" }}
          type="email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="outlined" onClick={handleBinarySearch}>
          Search
        </Button>
      </Box>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 1 }}>
          <CircularProgress />
        </Box>
      )}

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          {users && users?.length ? (
            <TableHead>
              <TableRow>
                {columns.map((o) => {
                  return <TableCell>{camelToNormal(o)}</TableCell>;
                })}
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
          ) : null}

          <TableBody>
            {users && users?.length
              ? users?.map((user, index) => {
                  return (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {columns.map((col) => {
                        return (
                          <TableCell component="th" scope="row">
                            {user?.[col]}
                          </TableCell>
                        );
                      })}
                      <Tooltip title={`Delete ${user?.email}`}>
                        <DeleteIcon
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => handleDelete(user?.email)}
                        />
                      </Tooltip>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      {users?.length <= 0 && (
        <Typography
          sx={{ textAlign: "center", margin: "10px 0", fontWeight: "bold" }}
        >
          No User Found With Name {query}
        </Typography>
      )}
    </>
  );
};

export default Users;
