import Typewriter from "typewriter-effect";
import React from "react";

const SectionBreaker = ({ text, customStyle, id }) => {
  return (
    <div
      id={id}
      style={{
        ...customStyle,
        padding: "15px",
        backgroundColor: "#D50000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "20px",
      }}
    >
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString(text)
            .pauseFor(1000)
            .deleteAll()
            .typeString(text)
            .start();
        }}
      />
    </div>
  );
};

export default SectionBreaker;
