import React, { useContext, useEffect, useState } from "react";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import { loginContext } from "../../context/auth";
import DoctorBirth from "../../../components/multipleUsers/birth/Birth";

function Birth() {
  const { user } = useContext(loginContext);

  return (
    <DoctorSidebar>
      <DoctorBirth role={"/doctor"} />
    </DoctorSidebar>
  );
}

export default Birth;
