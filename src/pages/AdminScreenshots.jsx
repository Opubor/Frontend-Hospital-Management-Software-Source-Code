import React from "react";
import { FcCamera } from "react-icons/Fc";
import admindashboard from "../assets/admindashboard.jpg";
import doctorslist from "../assets/doctorslist.jpg";
import adddoctor from "../assets/adddoctor.jpg";
import nurses from "../assets/nurses.jpg";
import labouiratorists from "../assets/labouiratorists.jpg";
import accountants from "../assets/accountants.jpg";
import pharmacists from "../assets/pharmacists.jpg";
import receptionists from "../assets/receptionists.jpg";
import patients from "../assets/patients.jpg";
import departments from "../assets/departments.jpg";
import adddepartment from "../assets/adddepartment.jpg";
import appointments from "../assets/appointments.jpg";
import birth from "../assets/birth.jpg";
import death from "../assets/death.jpg";
import bloodbank from "../assets/bloodbank.jpg";
import operations from "../assets/operations.jpg";
import payments from "../assets/payments.jpg";
import bedallotment from "../assets/bedallotment.jpg";
import realprofile from "../assets/realprofile.jpg";
import { NavLink } from "react-router-dom";

function AdminScreenshots() {
  const photos = [
    { image: admindashboard, title: "Dashboard" },
    { image: doctorslist, title: "Manage Doctors" },
    {
      image: adddoctor,
      title: "Add Doctors",
    },
    { image: nurses, title: "Nurses" },
    { image: labouiratorists, title: "Manage Labouratorists" },
    { image: accountants, title: "Manage Accountants" },
    { image: pharmacists, title: "Manage Pharmacists" },
    { image: receptionists, title: "Manage Receptionists" },
    { image: patients, title: "Manage Patients" },
    { image: departments, title: "Manage Departments" },
    { image: adddepartment, title: "Add Departments" },
    { image: appointments, title: "Appointments" },
    { image: birth, title: "Birth Records" },
    { image: death, title: "Death Records" },
    { image: bloodbank, title: "BloodBank" },
    { image: operations, title: "Operations" },
    { image: payments, title: "Payments" },
    { image: bedallotment, title: "Bed Allotments" },
    { image: realprofile, title: "Profile" },
  ];
  return (
    <div className="flex">
      <div className="w-48 lg:w-64 font-semibold bg-gray-300 fixed px-2 gap-0">
        <div className="pt-8 flex justify-center items-center">
          <span>{React.createElement(FcCamera, { size: "30" })}</span>
          <h1 className="text-center text-sm lg:text-xl text-indigo-900 font-extrabold">
            Admin Screenshots
          </h1>
        </div>
        <div className="pt-8">
          {photos?.map((photo, i) => (
            <a key={i} href={`#${i}`}>
              <div
                className="py-2 flex justify-center items-center flex-col"
                key={i}
              >
                <h1 className="text-sm text-black hover:text-white">
                  {photo?.title}
                </h1>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="ml-48 lg:ml-64 text-left transition duration-500">
          {photos?.map((photo, i) => (
            <div className="py-4 transition duration-500" key={i} id={i}>
              <img src={photo?.image} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminScreenshots;
