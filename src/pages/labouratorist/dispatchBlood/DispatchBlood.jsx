import React, { useContext, useEffect, useState } from "react";
import { loginContext } from "../../context/auth";
import LabouratoristDispatchBlood from "../../../components/multipleUsers/dispatchBlood/DispatchBlood";
import LabouratoristSidebar from "../../../components/sidebars/LabouratoristSidebar";

function DispatchBlood() {
  const { user } = useContext(loginContext);

  return (
    <LabouratoristSidebar>
      <LabouratoristDispatchBlood role={"/labouratorist"} />
    </LabouratoristSidebar>
  );
}

export default DispatchBlood;
