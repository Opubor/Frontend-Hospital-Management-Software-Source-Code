import React, { useContext } from "react";
import AccountantSidebar from "../../components/sidebars/AccountantSidebar";
import { loginContext } from "../context/auth";
import AccountantProfile from "../../components/multipleUsers/Profile";

function Profile() {
  const { user } = useContext(loginContext);
  return (
    <AccountantSidebar>
      <AccountantProfile />
    </AccountantSidebar>
  );
}

export default Profile;
