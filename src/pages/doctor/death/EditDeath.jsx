import React, { useContext, useEffect, useState } from "react";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import { loginContext } from "../../context/auth";
import DoctorEditDeath from "../../../components/multipleUsers/death/EditDeath";

function EditDeath() {
  const { user } = useContext(loginContext);

  return (
    <DoctorSidebar>
      <DoctorEditDeath url={"/doctor/death"} />
    </DoctorSidebar>
  );
}

export default EditDeath;
