import React, { useContext, useEffect, useState } from "react";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import { loginContext } from "../../context/auth";
import DoctorEditDispatchBlood from "../../../components/multipleUsers/dispatchBlood/EditDispatchBlood";

function EditDispatchBlood() {
  const { user } = useContext(loginContext);

  return (
    <DoctorSidebar>
      <DoctorEditDispatchBlood url={"/doctor/dispatch_blood"} />
    </DoctorSidebar>
  );
}

export default EditDispatchBlood;
