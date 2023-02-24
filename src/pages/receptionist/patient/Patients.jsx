import React, { useEffect, useState, useContext } from "react";
import { loginContext } from "../../context/auth";
import ReceptionistsPatients from "../../../components/multipleUsers/patient/Patients";
import ReceptionistSidebar from "../../../components/sidebars/ReceptionistSidebar";

function Patients() {
  const { user } = useContext(loginContext);

  return (
    <ReceptionistSidebar>
      <ReceptionistsPatients role={"/receptionist"} />
    </ReceptionistSidebar>
  );
}

export default Patients;
