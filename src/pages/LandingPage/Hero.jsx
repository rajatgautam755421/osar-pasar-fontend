import { PlayCircle } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MainImage from "./Main.svg";

const Hero = ({ setWatchVideo }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function getWidthOfElement() {
      setWidth(document.getElementById("hero-text").clientWidth);
    }

    window.addEventListener("resize", getWidthOfElement);
    return () => window.removeEventListener("resize", getWidthOfElement);
  }, []);

  const navigateToAbout = () => {
    document.getElementById("about-us").scrollIntoView();
  };

  return (
    <>
      <div
        id="hero-text"
        style={{
          display: "flex",
          alignItems: "center",
          height: "80vh",
          flexWrap: "wrap",
        }}
      >
        {!width || width > 774 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "50px",
            }}
          >
            <Typography
              style={{
                fontSize: "40px",
                color: "#D50000",
                textAlign: "center",
              }}
            >
              OSAR PASAR
            </Typography>
            <Typography style={{ fontSize: "20px", textAlign: "center" }}>
              BEST COURIER DEALS FOR YOU
            </Typography>
            <Button
              variant="outlined"
              style={{ width: "50%", margin: "10px auto" }}
              onClick={navigateToAbout}
            >
              About Us
            </Button>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px",
              }}
            >
              <PlayCircle
                style={{
                  fontSize: "40px",
                  marginRight: "5px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  setWatchVideo(
                    "https://www.youtube.com/watch?v=PQZgMz_tsO8&ab_channel=RizwanMahir"
                  )
                }
              />
              <Typography>Watch Video On Osar Pasar</Typography>
            </div>
          </div>
        ) : null}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginLeft: "auto",
            marginRight: "10px",
          }}
        >
          <img src={MainImage} />
        </div>
      </div>
      <div class="custom-shape-divider-bottom-1678251383">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
    </>
  );
};

export default Hero;
