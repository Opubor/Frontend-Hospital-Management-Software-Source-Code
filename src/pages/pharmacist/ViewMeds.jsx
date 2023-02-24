import React, { useEffect, useState } from "react";
import PharmacistSidebar from "../../components/sidebars/PharmacistSidebar";
import PharmacistViewMeds from "../../components/multipleUsers/viewMeds/ViewMeds";

function ViewMeds() {
  return (
    <PharmacistSidebar>
      <PharmacistViewMeds />
    </PharmacistSidebar>
  );
}

export default ViewMeds;
