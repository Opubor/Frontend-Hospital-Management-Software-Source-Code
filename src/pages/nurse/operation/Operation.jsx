import React, { useContext, useEffect, useState } from "react";
import { loginContext } from "../../context/auth";
import NurseOperation from "../../../components/multipleUsers/operation/Operation";
import NurseSidebar from "../../../components/sidebars/NurseSidebar";

function Operation() {
  const { user } = useContext(loginContext);

  return (
    <NurseSidebar>
      <NurseOperation role={"/nurse"} />
    </NurseSidebar>
  );
}

export default Operation;
