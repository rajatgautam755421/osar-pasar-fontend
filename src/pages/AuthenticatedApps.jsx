import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import { makeApiRequests } from "../helpers/apiHelper";
import { ADMIN_ROLE } from "../helpers/constants";

const AuthenticatedApps = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [myOrders, setMyOrders] = useState([]);
  const [myOrderLoading, setMyOrderLoading] = useState(false);

  useEffect(() => {
    const fetchUserShipment = async () => {
      if (user && user?.role !== ADMIN_ROLE) {
        setMyOrderLoading(true);
        const response = await makeApiRequests({
          endpoint: `/shipment/${user?._id}`,
          method: "GET",
        });

        setMyOrders(response);
        setMyOrderLoading(false);
      }
    };

    fetchUserShipment();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (user && pathname === "/home") {
      navigate(user?.role === "Admin" ? "/dashboard" : "/my-track");
    }
  }, [user]);
  return (
    <>
      <MainHeader
        myOrders={myOrders}
        myOrderLoading={myOrderLoading}
        setMyOrders={setMyOrders}
      />
    </>
  );
};

export default AuthenticatedApps;
