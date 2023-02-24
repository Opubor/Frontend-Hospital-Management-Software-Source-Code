import React, { useContext, useEffect, useState } from "react";
import { loginContext } from "../../context/auth";
import NurseEditDeath from "../../../components/multipleUsers/death/EditDeath";
import NurseSidebar from "../../../components/sidebars/NurseSidebar";

function EditDeath() {
  const { user } = useContext(loginContext);

  return (
    <NurseSidebar>
      <NurseEditDeath url={"/nurse/death"} />
    </NurseSidebar>
  );
}

export default EditDeath;
