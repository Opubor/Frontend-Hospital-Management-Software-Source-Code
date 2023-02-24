import React, { useContext, useEffect, useState } from "react";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import { loginContext } from "../../context/auth";
import DoctorEditBirth from "../../../components/multipleUsers/birth/EditBirth";

function EditBirth() {
  const { user } = useContext(loginContext);

  return (
    <DoctorSidebar>
      <DoctorEditBirth url={"/doctor/birth"} />
    </DoctorSidebar>
  );
}

export default EditBirth;
