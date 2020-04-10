import React from "react";
import { HomeTopSection } from "./HomeTopSection";
import SwipeSection from "./SwipeSection";
import { HomeMiddleSection } from "./HomeMiddleSection";
import "./HomeContainer.scss";

export const HomeContainer = () => {
  return (
    <div className="homeContainer">
      <HomeTopSection />
      <HomeMiddleSection />
      <SwipeSection />
    </div>
  );
};
