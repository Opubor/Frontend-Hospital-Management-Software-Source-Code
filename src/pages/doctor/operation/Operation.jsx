import React, { useContext, useEffect, useState } from "react";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import { loginContext } from "../../context/auth";
import DoctorOperation from "../../../components/multipleUsers/operation/Operation";

function Operation() {
  const { user } = useContext(loginContext);

  return (
    <DoctorSidebar>
      <DoctorOperation role={"/doctor"} />
    </DoctorSidebar>
  );
}

export default Operation;
