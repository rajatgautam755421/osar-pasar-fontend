import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const PriceDescription = ({ completePriceDescription }) => {
  return (
    <nav aria-label="secondary mailbox folders">
      <List>
        {Object.keys(completePriceDescription)
          .filter((desc) => desc !== "exactPrice")
          .map((desc) => {
            return (
              <>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText
                      primary={
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: desc === "Total Price" && "21px",
                              fontWeight: desc === "Total Price" && "700",
                            }}
                          >
                            {desc}
                          </Typography>
                          <Typography
                            style={{
                              fontSize: desc === "Total Price" && "21px",
                              fontWeight: desc === "Total Price" && "700",
                            }}
                          >
                            {completePriceDescription[desc]}
                          </Typography>
                        </div>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            );
          })}
      </List>
    </nav>
  );
};

export default PriceDescription;
