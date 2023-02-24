import React, { useContext, useEffect, useState } from "react";
import { loginContext } from "../../context/auth";
import LabouratoristEditDispatchBlood from "../../../components/multipleUsers/dispatchBlood/EditDispatchBlood";
import LabouratoristSidebar from "../../../components/sidebars/LabouratoristSidebar";

function EditDispatchBlood() {
  const { user } = useContext(loginContext);

  return (
    <LabouratoristSidebar>
      <LabouratoristEditDispatchBlood url={"/labouratorist/dispatch_blood"} />
    </LabouratoristSidebar>
  );
}

export default EditDispatchBlood;
