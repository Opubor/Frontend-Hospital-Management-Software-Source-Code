import React, { useContext, useEffect, useState } from "react";
import PharmacistSidebar from "../../components/sidebars/PharmacistSidebar";
import { loginContext } from "../context/auth";
import PharmacistProfile from "../../components/multipleUsers/Profile";

function Profile() {
  const { user } = useContext(loginContext);
  return (
    <PharmacistSidebar>
      <PharmacistProfile />
    </PharmacistSidebar>
  );
}

export default Profile;
