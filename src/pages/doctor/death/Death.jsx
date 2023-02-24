import React, { useContext, useEffect, useState } from "react";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import { loginContext } from "../../context/auth";
import DoctorDeath from "../../../components/multipleUsers/death/Death";

function Death() {
  const { user } = useContext(loginContext);

  return (
    <DoctorSidebar>
      <DoctorDeath role={"/doctor"} />
    </DoctorSidebar>
  );
}

export default Death;
