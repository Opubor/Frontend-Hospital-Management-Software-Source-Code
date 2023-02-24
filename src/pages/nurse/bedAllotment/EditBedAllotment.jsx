import React, { useContext, useEffect, useState } from "react";
import NurseEditBedAllotment from "../../../components/multipleUsers/bedAllotment/EditBedAllotment";
import NurseSidebar from "../../../components/sidebars/NurseSidebar";

function EditBedAllotment() {
  return (
    <NurseSidebar>
      <NurseEditBedAllotment url={"/nurse/bed_allotment"} />
    </NurseSidebar>
  );
}

export default EditBedAllotment;
