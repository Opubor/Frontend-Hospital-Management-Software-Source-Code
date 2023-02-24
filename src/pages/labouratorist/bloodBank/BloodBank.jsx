import React, { useContext } from "react";
import { loginContext } from "../../context/auth";
import LabouratoristBloodBank from "../../../components/multipleUsers/bloodBank/BloodBank";
import LabouratoristSidebar from "../../../components/sidebars/LabouratoristSidebar";

function BloodBank() {
  const { user } = useContext(loginContext);

  return (
    <LabouratoristSidebar>
      <LabouratoristBloodBank />
    </LabouratoristSidebar>
  );
}

export default BloodBank;
