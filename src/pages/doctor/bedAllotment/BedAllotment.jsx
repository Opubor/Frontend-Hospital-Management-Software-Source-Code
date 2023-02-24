import React, { useContext, useEffect, useState } from "react";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import DoctorBedAllotment from "../../../components/multipleUsers/bedAllotment/BedAllotment";

function BedAllotment() {
  return (
    <DoctorSidebar>
      <DoctorBedAllotment role={"/doctor"} />
    </DoctorSidebar>
  );
}

export default BedAllotment;
