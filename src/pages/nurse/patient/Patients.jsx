import React, { useEffect, useState, useContext } from "react";
import { loginContext } from "../../context/auth";
import NursePatients from "../../../components/multipleUsers/patient/Patients";
import NurseSidebar from "../../../components/sidebars/NurseSidebar";

function Patients() {
  const { user } = useContext(loginContext);

  return (
    <NurseSidebar>
      <NursePatients role={"/nurse"} />
    </NurseSidebar>
  );
}

export default Patients;
