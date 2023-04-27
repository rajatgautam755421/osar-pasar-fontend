import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav class="navigationWrapper">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div class="logoWrapper">
            <span class="stylish" style={{ color: "white" }}>
              Osar
            </span>
            <span class="logo">Pasar</span>
          </div>
        </Link>
        <ul class="navigation">
          <li class="parent">
            <a class="link" href="#">
              Home
            </a>
          </li>
          <li class="parent">
            <a class="link" href="#about-us">
              About
            </a>
          </li>
          <li class="parent">
            <a class="link" href="#our-recommendations">
              Recommendations
            </a>
          </li>

          <li class="parent" id="services">
            <a class="link" href="#our-services">
              <i class="fas fa-minus"></i> Services <i class="fas fa-plus"></i>
            </a>
          </li>
          <li class="parent">
            <a class="link" href="#contact-us">
              Contact
            </a>
          </li>
          <li class="parent">
            <Link to={"/home"} style={{ textDecoration: "none" }}>
              <Button variant="contained" size="small">
                Visit App
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
