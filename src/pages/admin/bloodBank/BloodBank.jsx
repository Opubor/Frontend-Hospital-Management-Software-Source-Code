import React, { useContext } from "react";
import { loginContext } from "../../context/auth";
import AdminBloodBank from "../../../components/multipleUsers/bloodBank/BloodBank";
import { AdminSidebar } from "../../../components";

function BloodBank() {
  const { user } = useContext(loginContext);

  return (
    <AdminSidebar>
      <div className="bg-gray-100 p-8">
        <AdminBloodBank />
      </div>
    </AdminSidebar>
  );
}

export default BloodBank;
