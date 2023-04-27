import { Skeleton } from "@mui/material";
import React from "react";

const CardSkeleton = ({ height }) => {
  return (
    <Skeleton
      variant="rounded"
      width="100%"
      height={height}
      sx={{ p: 2, my: 2 }}
    />
  );
};

export default CardSkeleton;
