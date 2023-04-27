import {
  Button,
  CircularProgress,
  Rating,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import SectionHeader from "../../Common/SectionHeader";
import StarIcon from "@mui/icons-material/Star";
import GoogleMap from "google-maps-react-markers";
import mapOptions from "./map-options.json";
import RoomIcon from "@mui/icons-material/Room";
import { makeApiRequests } from "../../helpers/apiHelper";
import { toast } from "react-hot-toast";
import { searchSubList } from "../../helpers/generalHelper";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = React.useState(-1);
  const [loading, setLoading] = useState(false);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [query, setQuery] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
  const getAllFeedbacks = async () => {
    const response = await makeApiRequests({
      endpoint: "/ratings",
      method: "GET",
    });
    if (response) {
      setAllFeedbacks([...response]);
    }
  };

  const handleRatingChange = async (event, newValue) => {
    setLoading(true);
    const response = await makeApiRequests({
      endpoint: "/rating",
      requestBody: { email: user?.email, rating: newValue },
    });

    if (response) {
      setRating(newValue);
      toast.success("Feedback Provided Successfully");
      getAllFeedbacks();
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllFeedbacks();
  }, []);

  const handleSublistSearch = () => {
    setAllFeedbacks(searchSubList(allFeedbacks, query));
  };

  useEffect(() => {
    getAllFeedbacks();
  }, [query]);

  return (
    <>
      <SectionHeader title="Provide Osar Parsar A Feedback" />

      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Rating
            defaultValue={2.5}
            size="large"
            precision={0.5}
            value={rating}
            getLabelText={getLabelText}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
            onChange={(event, newValue) => {
              handleRatingChange(event, newValue);
            }}
          />
        )}
      </Box>
      {rating !== null && (
        <Box sx={{ ml: 2 }}>
          <Typography style={{ fontSize: "13px", textAlign: "center" }}>
            {labels[hover !== -1 ? hover : rating]}
          </Typography>
        </Box>
      )}
      <Box mt={10}>
        <SectionHeader title="Other Feedbacks" />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            label="search for other people feedbacks"
            variant="outlined"
            size="small"
            style={{ margin: "10px 0", width: "92%" }}
            type="email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="outlined" onClick={handleSublistSearch}>
            Search
          </Button>
        </Box>
        {!allFeedbacks?.length && (
          <Typography sx={{ textAlign: "center", fontWeight: "bold", my: 2 }}>
            No Feedbacks
          </Typography>
        )}

        {allFeedbacks.map((feedback) => (
          <div class="flex flex-wrap -m-2 mt-3">
            <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div class="h-full flex items-center border-gray-400 border p-4 rounded-lg">
                <div class="flex-grow">
                  <h2 class="text-gray-900 title-font font-medium">
                    {feedback?.email}
                  </h2>
                  <Rating
                    size="small"
                    precision={0.5}
                    value={feedback?.rating}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Box>
    </>
  );
};

export default Feedback;
