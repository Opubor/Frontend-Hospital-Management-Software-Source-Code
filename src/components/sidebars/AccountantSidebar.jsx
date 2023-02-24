import React, { useContext, useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { GiMoneyStack } from "react-icons/Gi";
import { AiOutlineSetting } from "react-icons/Ai";
import { BsEyeFill } from "react-icons/bs";
import { FaFileInvoice } from "react-icons/fa";
import { GiNurseMale } from "react-icons/Gi";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { loginContext } from "../../pages/context/auth";
import Forbidden from "../Forbidden";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function AccountantSidebar({ children }) {
  const [open, setOpen] = useState(true);
  const { logout, loggedIn, user } = useContext(loginContext);
  const accountant = user?.role === "accountant";
  if (!loggedIn) {
    return <Navigate to={"/"} />;
  }

  const handleLogout = () => {
    confirmAlert({
      title: "Confirm Logout...",
      buttons: [
        {
          label: "Yes",
          onClick: logout,
        },
        {
          label: "No",
        },
      ],
    });
  };

  const menus = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: MdOutlineDashboardCustomize,
    },
    {
      name: "Prescription Payments",
      link: "/accountant/payment",
      icon: GiMoneyStack,
    },
    {
      name: "New Invoice",
      link: "/accountant/new_invoice",
      icon: FaFileInvoice,
    },
    {
      name: "View Payments",
      link: "/accountant/viewpayments",
      icon: BsEyeFill,
    },
    { name: "Profile", link: "/accountant/profile", icon: AiOutlineSetting },
  ];

  return (
    <>
      {accountant ? (
        <section className="flex">
          <div
            className={`bg-gray-200 min-h-screen ${
              open ? "w-72" : "w-16"
            } duration-500 text-gray-100 px-4`}
          >
            <div className="py-3 flex justify-end">
              <HiMenuAlt3
                size={26}
                className="cursor-pointer text-black"
                onClick={() => setOpen(!open)}
              />
            </div>
            <div className="mt-4 flex flex-col gap-4 relative">
              {menus?.map((menu, i) => (
                <NavLink
                  to={menu?.link}
                  key={i}
                  className={({ isActive }) =>
                    isActive
                      ? "group flex items-center text-sm gap-3.5 p-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-md shadow-lg shadow-gray-400"
                      : "group flex items-center text-sm gap-3.5 p-2 bg-white text-black hover:bg-gray-100 rounded-md shadow-lg shadow-gray-400"
                  }
                >
                  <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                  <h2
                    style={{ transitionDelay: `${i + 3}00ms` }}
                    className={`whitespace-pre duration-200 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu?.name}
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                  >
                    {menu?.name}
                  </h2>
                </NavLink>
              ))}
            </div>
          </div>
          <div className="text-xl text-gray-900 w-full bg-gray-50">
            <div className="bg-white h-16 p-4 flex items-center justify-between gap-3">
              <h1 className="text-indigo-900 text-lg lg:text-2xl font-bold flex items-center gap-2">
                {React.createElement(GiNurseMale, { size: "20" })}ACCOUNTANT
              </h1>
              <div className="flex items-center gap-2">
                <h1 className="d-inline font-semibold text-indigo-900">
                  {user?.name}
                </h1>
                <button
                  className="bg-blue-200 p-2 rounded-xl text-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="bg-white m-4 p-4 min-h-screen">{children}</div>
          </div>
        </section>
      ) : (
        <Forbidden />
      )}
    </>
  );
}

export default AccountantSidebar;
