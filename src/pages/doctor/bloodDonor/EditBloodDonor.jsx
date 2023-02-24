import React, { useContext, useEffect, useState } from "react";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import { loginContext } from "../../context/auth";
import DoctorEditBloodDonor from "../../../components/multipleUsers/bloodDonor/EditBloodDonor";

function EditBloodDonor() {
  const { user } = useContext(loginContext);
  return (
    <DoctorSidebar>
      <DoctorEditBloodDonor url={"/doctor/blood_donor"} />
    </DoctorSidebar>
  );
}

export default EditBloodDonor;
