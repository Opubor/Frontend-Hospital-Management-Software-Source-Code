import React, { useContext } from "react";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import { loginContext } from "../../context/auth";
import DoctorBloodBank from "../../../components/multipleUsers/bloodBank/BloodBank";

function BloodBank() {
  const { user } = useContext(loginContext);

  return (
    <DoctorSidebar>
      <DoctorBloodBank />
    </DoctorSidebar>
  );
}

export default BloodBank;
