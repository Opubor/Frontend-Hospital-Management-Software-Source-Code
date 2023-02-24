import React, { useContext, useEffect, useState } from "react";
import { loginContext } from "../../context/auth";
import NurseEditBloodDonor from "../../../components/multipleUsers/bloodDonor/EditBloodDonor";
import NurseSidebar from "../../../components/sidebars/NurseSidebar";

function EditBloodDonor() {
  const { user } = useContext(loginContext);
  return (
    <NurseSidebar>
      <NurseEditBloodDonor url={"/nurse/blood_donor"} />
    </NurseSidebar>
  );
}

export default EditBloodDonor;
