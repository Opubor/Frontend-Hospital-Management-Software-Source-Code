import React, { useContext, useEffect, useState } from "react";
import NurseBedAllotment from "../../../components/multipleUsers/bedAllotment/BedAllotment";
import NurseSidebar from "../../../components/sidebars/NurseSidebar";

function BedAllotment() {
  return (
    <NurseSidebar>
      <NurseBedAllotment role={"/nurse"} />
    </NurseSidebar>
  );
}

export default BedAllotment;
