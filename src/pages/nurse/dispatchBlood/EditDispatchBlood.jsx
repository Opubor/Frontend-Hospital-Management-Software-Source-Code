import React, { useContext, useEffect, useState } from "react";
import { loginContext } from "../../context/auth";
import NurseEditDispatchBlood from "../../../components/multipleUsers/dispatchBlood/EditDispatchBlood";
import NurseSidebar from "../../../components/sidebars/NurseSidebar";

function EditDispatchBlood() {
  const { user } = useContext(loginContext);

  return (
    <NurseSidebar>
      <NurseEditDispatchBlood url={"/nurse/dispatch_blood"} />
    </NurseSidebar>
  );
}

export default EditDispatchBlood;
