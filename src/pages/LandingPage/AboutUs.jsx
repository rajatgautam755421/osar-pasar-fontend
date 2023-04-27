import { Grid, Typography } from "@mui/material";
import React from "react";
import SectionBreaker from "../../Common/SectionBreaker";
import Image from "./About.svg";

const AboutUs = () => {
  return (
    <>
      <SectionBreaker
        text="About Us"
        customStyle={{ marginTop: "70px" }}
        id={"about-us"}
      />
      <Grid container style={{ marginTop: "10px" }}>
        <Grid md={6} xs={12}>
          <img src={Image} />
        </Grid>
        <Grid md={6} xs={12} style={{ marginTop: "10px" }}>
          <Typography>
            "Welcome to Osar Pasar Courier - the leading online courier delivery
            app that's changing the way people send and receive packages. Our
            mission is to provide fast, reliable, and affordable courier
            services to individuals and businesses across the country. At Osar
            Pasar Courier, we know that time is of the essence when it comes to
            package delivery.
            <br /> That's why we offer a wide range of courier services to meet
            your needs, including same-day, next-day, and express delivery
            options. Whether you're sending a small package or a large shipment,
            we've got you covered. Our team of experienced couriers is dedicated
            to providing exceptional service and ensuring that your package
            arrives on time and in excellent condition. We use the latest
            technology and logistics solutions to optimize delivery routes and
            streamline the delivery process, so you can have peace of mind
            knowing that your package is in good hands.
            <br /> We believe that transparency and trust are essential to
            building strong relationships with our customers. That's why we're
            committed to providing clear and honest communication about our
            services and prices. With Osar Pasar, you can rest assured that
            there are no hidden fees or surprise charges - just reliable,
            affordable courier delivery services that you can count on. <br />
            Thank you for choosing Osar Pasar Courier. We look forward to
            serving you and making your courier delivery experience as smooth
            and hassle-free as possible."
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default AboutUs;
