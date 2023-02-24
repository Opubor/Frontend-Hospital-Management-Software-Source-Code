import React, { useContext, useEffect, useState } from "react";
import { loginContext } from "../../context/auth";
import NurseEditOperation from "../../../components/multipleUsers/operation/EditOperation";
import NurseSidebar from "../../../components/sidebars/NurseSidebar";

function EditOperation() {
  const { user } = useContext(loginContext);

  return (
    <NurseSidebar>
      <NurseEditOperation url={"/nurse/operation"} />
    </NurseSidebar>
  );
}

export default EditOperation;
