import React, { useEffect, useState, useContext } from "react";
import { loginContext } from "../context/auth";
import PharmacistPatients from "../../components/multipleUsers/patient/Patients";
import PharmacistSidebar from "../../components/sidebars/PharmacistSidebar";

function Patients() {
  const { user } = useContext(loginContext);

  return (
    <PharmacistSidebar>
      <PharmacistPatients role={"/pharmacist"} />
    </PharmacistSidebar>
  );
}

export default Patients;
