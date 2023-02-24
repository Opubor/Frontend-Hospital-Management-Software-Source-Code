import React, { useContext, useEffect, useState } from "react";
import ReceptionistSidebar from "../../components/sidebars/ReceptionistSidebar";
import { loginContext } from "../context/auth";
import ReceptionistProfile from "../../components/multipleUsers/Profile";

function Profile() {
  const { user } = useContext(loginContext);
  return (
    <ReceptionistSidebar>
      <ReceptionistProfile />
    </ReceptionistSidebar>
  );
}

export default Profile;
