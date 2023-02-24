import React from "react";
import { AdminSidebar } from "../../../components";
import AdminEditPatients from "../../../components/multipleUsers/patient/EditPatient";

function EditPatient() {
  return (
    <AdminSidebar>
      <AdminEditPatients url={"/admin/patients"} />
    </AdminSidebar>
  );
}

export default EditPatient;
