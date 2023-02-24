import React, { useContext, useEffect, useState } from "react";
import { loginContext } from "../../context/auth";
import NurseBloodDonor from "../../../components/multipleUsers/bloodDonor/BloodDonor";
import NurseSidebar from "../../../components/sidebars/NurseSidebar";

function BloodDonor() {
  const { user } = useContext(loginContext);
  return (
    <NurseSidebar>
      <NurseBloodDonor role={"/nurse"} />
    </NurseSidebar>
  );
}

export default BloodDonor;
