import React, { useContext, useEffect, useState } from "react";
import DoctorSidebar from "../../components/sidebars/DoctorSidebar";
import { loginContext } from "../context/auth";
import DoctorProfile from "../../components/multipleUsers/Profile";

function Profile() {
  const { user } = useContext(loginContext);
  return (
    <DoctorSidebar>
      <DoctorProfile />
    </DoctorSidebar>
  );
}

export default Profile;
