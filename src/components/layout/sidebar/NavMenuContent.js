import React from "react";
import Calender from "./calender/Calender";
import MainSideBarContent from "./MainSideBarContent";
import Profile from "./Profile";

const NavMenuContent = ({ mode, side, chartArea, setMode }) => {
  switch (mode) {
    case "Profile":
      return <Profile setMode={setMode} />;
    case "Calender":
      return <Calender className="w-8" />;
    default:
      return <MainSideBarContent side={side} chartArea={chartArea} />;
  }
};

export default NavMenuContent;
