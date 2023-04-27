import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeApiRequests } from "../helpers/apiHelper";
import { camelToNormal } from "../helpers/generalHelper";

const RecieversView = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);

  const getUniqueShipmentForUser = async () => {
    setLoading(true);
    const response = await makeApiRequests({
      endpoint: `/shipment/reciever/${id}`,
      method: "GET",
    });
    if (response) {
      setOrder({ ...response });
    }
    setLoading(false);
  };

  useEffect(() => {
    getUniqueShipmentForUser();
  }, []);

  return (
    <>
      {loading && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <CircularProgress size={40} />
        </Box>
      )}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {Object.keys(order).map((o) => {
                return <TableCell>{camelToNormal(o)}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {Object.keys(order).map((row) => (
                <TableCell component="th" scope="row">
                  {row !== "user" ? order[row] : order?.user?.email}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RecieversView;
