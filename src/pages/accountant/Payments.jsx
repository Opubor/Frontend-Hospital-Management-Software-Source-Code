import React, { useContext, useEffect, useState } from "react";
import { loginContext } from "../context/auth";
import AccountantSidebar from "../../components/sidebars/AccountantSidebar";
import AccPayments from "../../components/multipleUsers/payment/Payments";

function Payments() {
  const { user } = useContext(loginContext);

  return (
    <AccountantSidebar>
      <AccPayments />
    </AccountantSidebar>
  );
}

export default Payments;
