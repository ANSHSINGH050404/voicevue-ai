import React from "react";

import CreateOption from "../_components/CreateOption";
import LatestInterviewList from "../_components/LatestInterviewList";
import WelcomeContainer from "../_components/WelcomeContainer";

const page = () => {
  return (
    <div className=" float-right ">
      <WelcomeContainer />
      <CreateOption />
      <LatestInterviewList />
    </div>
  );
};

export default page;
