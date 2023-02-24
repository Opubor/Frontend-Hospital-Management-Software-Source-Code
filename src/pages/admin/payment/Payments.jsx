import React from "react";
import { AdminSidebar } from "../../../components";
import AdminViewPayments from "../../../components/multipleUsers/payment/ViewPayments";

function Payments() {
  return (
    <AdminSidebar>
      <AdminViewPayments />
    </AdminSidebar>
  );
}

export default Payments;
