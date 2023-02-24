import React, { useContext, useEffect, useState } from "react";
import { loginContext } from "../../context/auth";
import NurseDeath from "../../../components/multipleUsers/death/Death";
import NurseSidebar from "../../../components/sidebars/NurseSidebar";

function Death() {
  const { user } = useContext(loginContext);

  return (
    <NurseSidebar>
      <NurseDeath role={"/nurse"} />
    </NurseSidebar>
  );
}

export default Death;
