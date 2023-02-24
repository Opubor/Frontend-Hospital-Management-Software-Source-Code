import React, { useContext, useEffect, useState } from "react";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import { loginContext } from "../../context/auth";
import DoctorEditOperation from "../../../components/multipleUsers/operation/EditOperation";

function EditOperation() {
  const { user } = useContext(loginContext);

  return (
    <DoctorSidebar>
      <DoctorEditOperation url={"/doctor/operation"} />
    </DoctorSidebar>
  );
}

export default EditOperation;
