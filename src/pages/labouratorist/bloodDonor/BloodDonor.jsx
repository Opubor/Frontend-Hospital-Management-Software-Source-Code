import React, { useContext, useEffect, useState } from "react";
import LabouratoristSidebar from "../../../components/sidebars/LabouratoristSidebar";
import { loginContext } from "../../context/auth";
import LabouratoristBloodDonor from "../../../components/multipleUsers/bloodDonor/BloodDonor";

function BloodDonor() {
  const { user } = useContext(loginContext);
  return (
    <LabouratoristSidebar>
      <LabouratoristBloodDonor role={"/labouratorist"} />
    </LabouratoristSidebar>
  );
}

export default BloodDonor;
