import React, { useContext, useEffect, useState } from "react";
import { loginContext } from "../../context/auth";
import NurseEditBirth from "../../../components/multipleUsers/birth/EditBirth";
import NurseSidebar from "../../../components/sidebars/NurseSidebar";

function EditBirth() {
  const { user } = useContext(loginContext);

  return (
    <NurseSidebar>
      <NurseEditBirth url={"/nurse/birth"} />
    </NurseSidebar>
  );
}

export default EditBirth;
