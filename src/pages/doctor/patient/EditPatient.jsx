import React, { useEffect, useState } from "react";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import DoctorEditPatients from "../../../components/multipleUsers/patient/EditPatient";

function EditPatient() {
  return (
    <DoctorSidebar>
      <DoctorEditPatients url={"/doctor/patients"} />
    </DoctorSidebar>
  );
}

export default EditPatient;
