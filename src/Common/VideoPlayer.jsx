import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lib";
import CloseIcon from "@mui/icons-material/Close";

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

const VideoPlayer = ({
  onPlayerClose,
  videoLinks = [],
  openVideoplayer,
  title,
}) => {
  const [videoLoading, setVideoLoading] = useState(true);
  const [activeVideoTab, setActiveVideoTab] = useState(null);

  useEffect(() => {
    setActiveVideoTab(videoLinks[0]);
  }, [videoLinks]);

  return (
    <>
      <Modal open={openVideoplayer !== null} onClose={onPlayerClose}>
        <Box sx={style}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              id="modal-modal-title"
              component="h2"
              style={{ fontSize: "20px" }}
            >
              {title}
            </Typography>
            {videoLoading && (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <CircularProgress />
              </Box>
            )}
            <CloseIcon
              onClick={onPlayerClose}
              style={{ fontSize: "20px", cursor: "pointer" }}
            />
          </Box>
          <Box style={{ display: "flex", justifyContent: "flex-end" }} mt={2}>
            <ReactPlayer
              onReady={() => setVideoLoading(false)}
              url={activeVideoTab}
              controls
              height={380}
              width={"100%"}
              style={{ margin: "5px auto" }}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default VideoPlayer;
