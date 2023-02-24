import React, { useContext, useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoIosPeople } from "react-icons/Io";
import { AiOutlineSetting } from "react-icons/Ai";
import { FaBed } from "react-icons/fa";
import { BiBed } from "react-icons/bi";
import { AiOutlineBank } from "react-icons/Ai";
import { MdOutlineBloodtype } from "react-icons/md";
import { BiDonateBlood } from "react-icons/bi";
import { CgCross } from "react-icons/cg";
import { FaBaby } from "react-icons/fa";
import { GiHospitalCross } from "react-icons/Gi";
import { GiNurseMale } from "react-icons/Gi";
import { AiOutlineGitlab } from "react-icons/Ai";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { loginContext } from "../../pages/context/auth";
import Forbidden from "../Forbidden";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function NurseSidebar({ children }) {
  const [open, setOpen] = useState(true);
  const { logout, loggedIn, user } = useContext(loginContext);
  const nurse = user?.role === "nurse";
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
    { name: "Vital Signs", link: "/nurse/vitalSigns", icon: GiHospitalCross },
    { name: "Patients", link: "/nurse/patients", icon: IoIosPeople },
    { name: "Bed Allotment", link: "/nurse/bed_allotment", icon: FaBed },
    { name: "Add Bed", link: "/nurse/add_bed", icon: BiBed },
    { name: "Blood Bank", link: "/nurse/blood_bank", icon: AiOutlineBank },
    { name: "Blood Donor", link: "/nurse/blood_donor", icon: BiDonateBlood },
    {
      name: "Dispatch Blood",
      link: "/nurse/dispatch_blood",
      icon: MdOutlineBloodtype,
    },
    { name: "Operation", link: "/nurse/operation", icon: AiOutlineGitlab },
    { name: "Birth", link: "/nurse/birth", icon: FaBaby },
    { name: "Death", link: "/nurse/death", icon: CgCross },
    { name: "Profile", link: "/nurse/profile", icon: AiOutlineSetting },
  ];

  return (
    <>
      {nurse ? (
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
                {React.createElement(GiNurseMale, { size: "20" })}NURSE
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

export default NurseSidebar;
