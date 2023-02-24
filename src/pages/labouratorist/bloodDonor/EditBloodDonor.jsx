import React, { useContext, useEffect, useState } from "react";
import { loginContext } from "../../context/auth";
import LabouratoristEditBloodDonor from "../../../components/multipleUsers/bloodDonor/EditBloodDonor";
import LabouratoristSidebar from "../../../components/sidebars/LabouratoristSidebar";

function EditBloodDonor() {
  const { user } = useContext(loginContext);
  return (
    <LabouratoristSidebar>
      <LabouratoristEditBloodDonor url={"/labouratorist/blood_donor"} />
    </LabouratoristSidebar>
  );
}

export default EditBloodDonor;
