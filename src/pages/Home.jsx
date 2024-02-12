import React from "react";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import MainSection from "../components/MainSection";
import SearchSection from "../components/SearchSection";

const Home = () => {
  return (
    <>
      <Navbar />
      <SearchSection />
      <MainSection/>
      <Player />
    </>
  );
};

export default Home;
