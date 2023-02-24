import React from "react";

function AppModules() {
  return (
    <div className="bg-fuchsia-200">
      <h1 className="text-center text-2xl underline p-2">
        App Modules/Features
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 p-8">
        <div className="p-2">
          <h1 className="underline font-semibold">ROLES</h1>
          <ul className="list-disc px-4">
            <li>Admin</li>
            <li>Doctor</li>
            <li>Nurse</li>
            <li>Labouratorist</li>
            <li>Accountant</li>
            <li>Pharmacist</li>
            <li>Receptionist</li>
          </ul>
        </div>
        <div className="p-2">
          <h1 className="underline font-semibold">ADMIN</h1>
          <ul className="list-disc px-4">
            <li>Rich Dashboard</li>
            <li>Manage Doctors(Add, Edit, Delete)</li>
            <li>Manage Nurses</li>
            <li>Manage Labouratorists</li>
            <li>Manage Accountants</li>
            <li>Manage Pharmacists</li>
            <li>Manage Receptionists</li>
            <li>Manage Departments</li>
            <li>View Operation reports</li>
            <li>View Birth reports</li>
            <li>View Death reports</li>
            <li>View Bed Allotment</li>
            <li>View Blood Bank</li>
            <li>View Appointments</li>
            <li>View Payments</li>
            <li>Profile</li>
          </ul>
        </div>
        <div className="p-2">
          <h1 className="underline font-semibold">DOCTOR</h1>
          <ul className="list-disc px-4">
            <li>Rich Dashboard</li>
            <li>Manage Prescriptions</li>
            <li>Manage Queue</li>
            <li>View Vital Signs</li>
            <li>Manage Patients</li>
            <li>Manage Appointments</li>
            <li>Manage Bed-Allotments</li>
            <li>Manage Blood Donor</li>
            <li>Manage Dispatch Blood</li>
            <li>View Blood Bank</li>
            <li>Manage Operation reports</li>
            <li>Manage Birth reports</li>
            <li>Manage Death reports</li>
            <li>Profile</li>
          </ul>
        </div>
        <div className="p-2">
          <h1 className="underline font-semibold">NURSES</h1>
          <ul className="list-disc px-4">
            <li>Rich Dashboard</li>
            <li>Manage Vital Signs</li>
            <li>Manage Patients</li>
            <li>Manage Bed-Allotments</li>
            <li>Manage Bed</li>
            <li>Manage Blood Donor</li>
            <li>Manage Dispatch Blood</li>
            <li>View Blood Bank</li>
            <li>Manage Operation reports</li>
            <li>Manage Birth reports</li>
            <li>Manage Death reports</li>
            <li>Profile</li>
          </ul>
        </div>
        <div className="p-2">
          <h1 className="underline font-semibold">LABOURATORISTS</h1>
          <ul className="list-disc px-4">
            <li>Rich Dashboard</li>
            <li>Manage Blood Donor</li>
            <li>Manage Dispatch Blood</li>
            <li>View Blood Bank</li>
            <li>Profile</li>
          </ul>
        </div>
        <div className="p-2">
          <h1 className="underline font-semibold">ACCOUNTANTS</h1>
          <ul className="list-disc px-4">
            <li>Rich Dashboard</li>
            <li>Take Payments(Prescriptions)</li>
            <li>Other Payments</li>
            <li>Manage Payments</li>
            <li>Profile</li>
          </ul>
        </div>
        <div className="p-2">
          <h1 className="underline font-semibold">PHARMACISTS</h1>
          <ul className="list-disc px-4">
            <li>Rich Dashboard</li>
            <li>Provide Medications</li>
            <li>Add amount to Medications</li>
            <li>Manage Patients</li>
            <li>Profile</li>
          </ul>
        </div>
        <div className="p-2">
          <h1 className="underline font-semibold">RECEPTIONISTS</h1>
          <ul className="list-disc px-4">
            <li>Rich Dashboard</li>
            <li>Manage Patients</li>
            <li>Queue Patients</li>
            <li>View Appointments</li>
            <li>Profile</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AppModules;
