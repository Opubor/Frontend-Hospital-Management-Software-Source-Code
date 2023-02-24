import React, { useContext, useEffect, useState } from "react";
import { loginContext } from "../../context/auth";
import NurseDispatchBlood from "../../../components/multipleUsers/dispatchBlood/DispatchBlood";
import NurseSidebar from "../../../components/sidebars/NurseSidebar";

function DispatchBlood() {
  const { user } = useContext(loginContext);

  return (
    <NurseSidebar>
      <NurseDispatchBlood role={"/nurse"} />
    </NurseSidebar>
  );
}

export default DispatchBlood;
