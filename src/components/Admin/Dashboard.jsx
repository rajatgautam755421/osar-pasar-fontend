import {
  Box,
  Card,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Typography,
} from "@mui/material";
import React, { useDeferredValue, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DeleteModal from "../../Common/DeleteModal";
import NoInfoToShow from "../../Common/NoInfoToShow";
import { makeApiRequests } from "../../helpers/apiHelper";
import { ADMIN_ROLE } from "../../helpers/constants";
import {
  filterOrdersOnSearchQuery,
  generateOrderLineChart,
  months,
} from "../../helpers/generalHelper";
import NotFound from "../NotFound";
import LineChartDashboard from "./LineChart";
import OrderTable from "./OrderTable";
import UsersList from "./UsersList";
import UpdateModal from "../Track/UpdateModal";

const rangeArray = [
  {
    key: "startMonth",
    label: "Start Month",
  },
  {
    key: "endMonth",
    label: "End Month",
  },
];

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [lineChartData, setLineChartData] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [rangeDates, setRangeDates] = useState({ startMonth: 0, endMonth: 11 });
  const [showDetails, setShowDetails] = useState({});
  const [itemToBeDeleted, setItemToBeDeleted] = useState(null);
  const [deletionLoading, setDeletionLoading] = useState(false);
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [initialOrderResults, setInitialOrderresults] = useState([]);
  const [allOrdersLoading, setAllOrdersLoading] = useState(false);
  const [avgRating, setAvgrating] = useState(0);

  const defferedOrderSearchQuery = useDeferredValue(orderSearchQuery);

  const onRangeDatesChange = (key, value) => {
    rangeDates[key] = value;
    setRangeDates({ ...rangeDates });
  };

  const onOrderSerachQueryChange = (e) => {
    setOrderSearchQuery(e);
  };

  useEffect(() => {
    const getAllOrders = async () => {
      setAllOrdersLoading(true);
      const response = await makeApiRequests({
        endpoint: "/shipment/all",
        method: "POST",
      });
      setAllOrders([...response]);
      setInitialOrderresults([...response]);
      setAllOrdersLoading(false);
    };
    getAllOrders();
  }, []);

  useEffect(() => {
    if (rangeDates?.endMonth >= rangeDates?.startMonth) {
      setLineChartData(
        generateOrderLineChart(
          allOrders,
          rangeDates?.startMonth,
          rangeDates?.endMonth
        )
      );
    } else {
      toast.error("End Month Should Be Greater Than Start Month ");
      setRangeDates({ startMonth: 0, endMonth: 11 });
    }
  }, [rangeDates]);

  useEffect(() => {
    setRangeDates({ startMonth: 0, endMonth: 11 });
  }, [allOrders]);

  useEffect(() => {
    allOrders &&
      allOrders.forEach((order) => {
        showDetails[order?._id] = false;
      });

    setShowDetails({ ...showDetails });
  }, [allOrders]);

  const onShowMoreValueChange = (key, value) => {
    showDetails[key] = value;
    setShowDetails({ ...showDetails });
  };

  const deleteModalCancelAction = () => setItemToBeDeleted(null);

  const deleteModalDeletionAction = async () => {
    setDeletionLoading(true);
    const response = await makeApiRequests({
      endpoint: `/shipment/remove/${itemToBeDeleted?._id}`,
      method: "GET",
    });

    if (response) {
      setAllOrders([
        ...allOrders.filter((order) => order._id !== response?._id),
      ]);
      setInitialOrderresults([
        ...initialOrderResults.filter((order) => order._id !== response?._id),
      ]);
      setItemToBeDeleted(null);
      toast.success("Successfully Deleted");
    }
    setDeletionLoading(false);
  };

  useEffect(() => {
    if (!defferedOrderSearchQuery) {
      setAllOrders([...initialOrderResults]);
    } else {
      setAllOrders([
        ...filterOrdersOnSearchQuery(allOrders, defferedOrderSearchQuery),
      ]);
    }
  }, [defferedOrderSearchQuery]);

  useEffect(() => {
    const fetchRatings = async () => {
      const response = await makeApiRequests({
        endpoint: "/ratings",
        method: "GET",
      });

      setAvgrating(
        response.reduce((total, curr) => {
          return total + Number(curr?.rating);
        }, 0)
      );
    };
    fetchRatings();
  }, []);

  if (user?.role !== ADMIN_ROLE) {
    return <NotFound />;
  }

  return (
    <>
      <Typography>Our Rating</Typography>
      <Rating name="size-medium" value={avgRating} readOnly precision={0.5} />

      <DeleteModal
        open={itemToBeDeleted}
        primaryText="Are You Sure Youu Want To Delete This Order?"
        cancelAction={deleteModalCancelAction}
        deleteAction={deleteModalDeletionAction}
        isLoading={deletionLoading}
      />
      {allOrdersLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress style={{ width: "30px", height: "30px" }} />
        </Box>
      ) : (
        <>
          <Typography sx={{ fontSize: "14", textAlign: "center", mb: 2 }}>
            Evaluate Number of Orders Per Month
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {rangeArray.map(({ key, label }, id) => {
              return (
                <>
                  <FormControl
                    fullWidth
                    size="small"
                    sx={{ margin: "10px 0", width: "20%", ml: 2 }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      {label}
                    </InputLabel>
                    <Select
                      label={label}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={months[rangeDates?.[key]]}
                      onChange={(e) =>
                        onRangeDatesChange(key, months.indexOf(e.target.value))
                      }
                    >
                      {months.map((month) => (
                        <MenuItem value={month}>{month}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              );
            })}
          </Box>
          <Grid container style={{ height: "200px", width: "100%" }} gap={1}>
            <Grid md={9} xs={12}>
              <LineChartDashboard lineChartData={lineChartData} />
            </Grid>
            <Grid md={2} xs={12} style={{ marginLeft: "auto" }}>
              <Card sx={{ p: 3, mt: 1 }}>
                <UsersList />
              </Card>
            </Grid>
          </Grid>
          <OrderTable
            allOrders={allOrders}
            showDetails={showDetails}
            onShowMoreValueChange={onShowMoreValueChange}
            setItemToBeDeleted={setItemToBeDeleted}
            orderSearchQuery={orderSearchQuery}
            onOrderSerachQueryChange={onOrderSerachQueryChange}
          />
          {orderSearchQuery && !allOrders.length && (
            <NoInfoToShow title="There Are No Orders Related To This Query" />
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
