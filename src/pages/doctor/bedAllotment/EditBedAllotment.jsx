import React, { useContext, useEffect, useState } from "react";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import DoctorEditBedAllotment from "../../../components/multipleUsers/bedAllotment/EditBedAllotment";

function EditBedAllotment() {
  return (
    <DoctorSidebar>
      <DoctorEditBedAllotment url={"/doctor/bed_allotment"} />
    </DoctorSidebar>
  );
}

export default EditBedAllotment;
