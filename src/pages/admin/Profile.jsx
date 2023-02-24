import React, { useContext, useEffect, useState } from "react";
import { AdminSidebar } from "../../components";
import { loginContext } from "../context/auth";
import AdminProfile from "../../components/multipleUsers/Profile";

function Profile() {
  const { user } = useContext(loginContext);
  return (
    <AdminSidebar>
      <AdminProfile />
    </AdminSidebar>
  );
}

export default Profile;
