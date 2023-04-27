import { Grid } from "@mui/material";
import React from "react";
import SectionBreaker from "../../Common/SectionBreaker";
import { OUR_SERVICES_INFO } from "../../helpers/constants";

const Services = () => {
  return (
    <>
      <SectionBreaker text="Our Services" id="our-services" />
      <section
        class="we-offer-area text-center bg-gray"
        style={{ minHeight: 0 }}
      >
        <div class="row our-offer-items less-carousel">
          <Grid container>
            {OUR_SERVICES_INFO.map(({ title, icon }) => {
              return (
                <Grid md={4} sm={6}>
                  <div
                    class="equal-height"
                    style={{ width: "80%", margin: "5px auto" }}
                  >
                    <div class="item">
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {icon}
                      </div>
                      <h4>{title}</h4>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p>
                    </div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </section>
    </>
  );
};

export default Services;
