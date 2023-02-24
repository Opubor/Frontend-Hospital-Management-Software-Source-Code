import React, { useContext, useEffect, useState } from "react";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import { loginContext } from "../../context/auth";
import DoctorBloodDonor from "../../../components/multipleUsers/bloodDonor/BloodDonor";

function BloodDonor() {
  const { user } = useContext(loginContext);
  return (
    <DoctorSidebar>
      <DoctorBloodDonor role={"/doctor"} />
    </DoctorSidebar>
  );
}

export default BloodDonor;
