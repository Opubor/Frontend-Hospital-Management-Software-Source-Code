import React, { useContext } from "react";
import NurseSidebar from "../../../components/sidebars/NurseSidebar";
import { loginContext } from "../../context/auth";
import DoctorBloodBank from "../../../components/multipleUsers/bloodBank/BloodBank";

function BloodBank() {
  const { user } = useContext(loginContext);

  return (
    <NurseSidebar>
      <DoctorBloodBank />
    </NurseSidebar>
  );
}

export default BloodBank;
