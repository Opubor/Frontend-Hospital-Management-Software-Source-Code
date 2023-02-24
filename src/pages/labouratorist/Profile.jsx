import React, { useContext, useEffect, useState } from "react";
import LabouratoristSidebar from "../../components/sidebars/LabouratoristSidebar";
import { loginContext } from "../context/auth";
import LabouratoristProfile from "../../components/multipleUsers/Profile";

function Profile() {
  const { user } = useContext(loginContext);
  return (
    <LabouratoristSidebar>
      <LabouratoristProfile />
    </LabouratoristSidebar>
  );
}

export default Profile;
