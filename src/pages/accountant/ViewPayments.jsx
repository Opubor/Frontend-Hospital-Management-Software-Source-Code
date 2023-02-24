import React, { useEffect, useState } from "react";
import AccountantSidebar from "../../components/sidebars/AccountantSidebar";
import AccountantViewPayments from "../../components/multipleUsers/payment/ViewPayments";

function ViewPayments() {
  return (
    <div>
      <AccountantSidebar>
        <AccountantViewPayments />
      </AccountantSidebar>
    </div>
  );
}

export default ViewPayments;
