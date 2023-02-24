import React, { useContext, useEffect, useState } from "react";
import NurseSidebar from "../../components/sidebars/NurseSidebar";
import { loginContext } from "../context/auth";
import NurseProfile from "../../components/multipleUsers/Profile";

function Profile() {
  const { user } = useContext(loginContext);
  return (
    <NurseSidebar>
      <NurseProfile />
    </NurseSidebar>
  );
}

export default Profile;
