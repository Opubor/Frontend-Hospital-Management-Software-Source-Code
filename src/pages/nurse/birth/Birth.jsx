import React, { useContext, useEffect, useState } from "react";
import { loginContext } from "../../context/auth";
import NurseBirth from "../../../components/multipleUsers/birth/Birth";
import NurseSidebar from "../../../components/sidebars/NurseSidebar";

function Birth() {
  const { user } = useContext(loginContext);

  return (
    <NurseSidebar>
      <NurseBirth role={"/nurse"} />
    </NurseSidebar>
  );
}

export default Birth;
