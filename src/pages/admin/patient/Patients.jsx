import React from "react";
import { AdminSidebar } from "../../../components";
import AdminPatients from "../../../components/multipleUsers/patient/Patients";

function Patients() {
  return (
    <AdminSidebar>
      <AdminPatients role={"/admin"} />
    </AdminSidebar>
  );
}

export default Patients;
