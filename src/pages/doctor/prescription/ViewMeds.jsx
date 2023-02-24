import React, { useEffect, useState } from "react";
import DoctorViewMeds from "../../../components/multipleUsers/viewMeds/ViewMeds";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";

function ViewMeds() {
  return (
    <DoctorSidebar>
      <DoctorViewMeds />
    </DoctorSidebar>
  );
}

export default ViewMeds;
