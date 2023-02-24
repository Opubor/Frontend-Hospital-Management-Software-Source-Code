import React, { useEffect, useState } from "react";
import ReceptionistsEditPatients from "../../../components/multipleUsers/patient/EditPatient";
import ReceptionistSidebar from "../../../components/sidebars/ReceptionistSidebar";

function EditPatient() {
  return (
    <ReceptionistSidebar>
      <ReceptionistsEditPatients url={"/receptionist/patients"} />
    </ReceptionistSidebar>
  );
}

export default EditPatient;
