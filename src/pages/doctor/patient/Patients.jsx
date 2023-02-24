import React, { useEffect, useState, useContext } from "react";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import { loginContext } from "../../context/auth";
import DoctorPatients from "../../../components/multipleUsers/patient/Patients";

function Patients() {
  const { user } = useContext(loginContext);

  return (
    <DoctorSidebar>
      <DoctorPatients role={"/doctor"} />
    </DoctorSidebar>
  );
}

export default Patients;
