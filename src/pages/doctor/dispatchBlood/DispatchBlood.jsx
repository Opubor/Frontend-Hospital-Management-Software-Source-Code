import React, { useContext, useEffect, useState } from "react";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import { loginContext } from "../../context/auth";
import DoctorDispatchBlood from "../../../components/multipleUsers/dispatchBlood/DispatchBlood";

function DispatchBlood() {
  const { user } = useContext(loginContext);

  return (
    <DoctorSidebar>
      <DoctorDispatchBlood role={"/doctor"} />
    </DoctorSidebar>
  );
}

export default DispatchBlood;
