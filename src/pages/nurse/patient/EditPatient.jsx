import React, { useEffect, useState } from "react";
import NurseEditPatients from "../../../components/multipleUsers/patient/EditPatient";
import NurseSidebar from "../../../components/sidebars/NurseSidebar";

function EditPatient() {
  return (
    <NurseSidebar>
      <NurseEditPatients url={"/nurse/patients"} />
    </NurseSidebar>
  );
}

export default EditPatient;
