import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useOutletContext } from "react-router-dom";
import CardSkeleton from "../../Common/CardSkeleton";
import DeleteModal from "../../Common/DeleteModal";
import NoInfoToShow from "../../Common/NoInfoToShow";
import SectionHeader from "../../Common/SectionHeader";
import TrackingOrderComponent from "../../Common/TrackingOrderComponent";
import EditIcon from "@mui/icons-material/Edit";
import { makeApiRequests } from "../../helpers/apiHelper";
import UpdateModal from "./UpdateModal";

const Track = () => {
  const [showDetails, setShowDetails] = useState({});
  const [itemToBeDeleted, setItemToBeDeleted] = useState(null);
  const [itemToBeEdited, setItemToBeEdited] = useState(null);
  const [deletionLoading, setDeletionLoading] = useState(false);

  const { myOrders, myOrderLoading, setMyOrders } = useOutletContext();

  useEffect(() => {
    myOrders.forEach((order) => {
      showDetails[order?._id] = false;
    });

    setShowDetails({ ...showDetails });
  }, [myOrders]);

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
      setMyOrders([...myOrders.filter((order) => order._id !== response?._id)]);
      setItemToBeDeleted(null);
      toast.success("Successfully Deleted");
    }
    setDeletionLoading(false);
  };

  return (
    <>
      <UpdateModal
        open={itemToBeEdited}
        handleClose={() => setItemToBeEdited(null)}
        onDataChange={setItemToBeEdited}
        setItemToBeEdited={setItemToBeEdited}
      />
      <DeleteModal
        open={itemToBeDeleted}
        primaryText="Are You Sure Youu Want To Delete This Order?"
        cancelAction={deleteModalCancelAction}
        deleteAction={deleteModalDeletionAction}
        isLoading={deletionLoading}
      />
      <SectionHeader title="Moniter My Orders" />

      {myOrderLoading &&
        Array(5)
          ?.fill(0)
          ?.map(() => <CardSkeleton height={100} />)}
      {!myOrderLoading && !myOrders.length && <NoInfoToShow title="Orders" />}

      {myOrders.map((order) => {
        return (
          <>
            <TrackingOrderComponent
              order={order}
              showDetails={showDetails}
              onShowMoreValueChange={onShowMoreValueChange}
              setItemToBeDeleted={setItemToBeDeleted}
              setItemToBeEdited={setItemToBeEdited}
            />
          </>
        );
      })}
    </>
  );
};

export default Track;
