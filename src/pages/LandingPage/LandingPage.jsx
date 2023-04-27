import React, { useState } from "react";
import VideoPlayer from "../../Common/VideoPlayer";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Header from "./Header";
import Hero from "./Hero";
import "./Landing.css";
import OurRecommendation from "./OurRecommendation";
import Services from "./Services";
import Footer from "./Footer";

const LandingPage = () => {
  const [watchVideo, setWatchVideo] = useState(null);
  return (
    <>
      {watchVideo && (
        <VideoPlayer
          videoLinks={[watchVideo]}
          title="Watch"
          onPlayerClose={() => setWatchVideo(null)}
          openVideoplayer={watchVideo}
        />
      )}
      <Header />
      <Hero watchVideo={watchVideo} setWatchVideo={setWatchVideo} />
      <AboutUs />
      <Services />
      <OurRecommendation />
      <ContactUs />
      <Footer />
    </>
  );
};

export default LandingPage;
