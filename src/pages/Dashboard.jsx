import React, { useState, useContext, useEffect } from "react";
import axios from "../services/axios";
import AdminSidebar from "../components/sidebars/AdminSidebar";
import pictwo from "../assets/Patient.png";
import doctorpic from "../assets/doctor.png";
import nursepic from "../assets/nurse.png";
import supportpic from "../assets/support-staft.png";
import pharmacistpic from "../assets/pharmacist.png";
import laboratoristpic from "../assets/laboratorist.png";
import accountantpic from "../assets/accountant.png";
import bedpic from "../assets/assign-bed-image.png";
import reportpic from "../assets/report.png";
import appointmentpic from "../assets/appointment-image.png";
import settingpic from "../assets/setting-image.png";
import atm from "../assets/undraw_Plain_credit_card_re_c07w.png";
import atmtwo from "../assets/undraw_Credit_card_re_blml.png";
import preseription from "../assets/preseription-image.png";
import diagnosis from "../assets/diagnosis-image.png";
import tretment from "../assets/tretment-image.png";
import queue from "../assets/undraw_wait_in_line_o2aq.png";
import Card from "../components/Card";
import { loginContext } from "./context/auth";
import DoctorSidebar from "../components/sidebars/DoctorSidebar";
import NurseSidebar from "../components/sidebars/NurseSidebar";
import PharmacistSidebar from "../components/sidebars/PharmacistSidebar";
import LabouratoristSidebar from "../components/sidebars/LabouratoristSidebar";
import AccountantSidebar from "../components/sidebars/AccountantSidebar";
import ReceptionistSidebar from "../components/sidebars/ReceptionistSidebar";
import ReactCalendar from "../components/Calendar";

function Dashboard() {
  const { user } = useContext(loginContext);
  const admin = user?.role === "admin";
  const doctor = user?.role === "doctor";
  const nurse = user?.role === "nurse";
  const pharmacists = user?.role === "pharmacist";
  const labouratorist = user?.role === "labouratorist";
  const accountant = user?.role === "accountant";
  const receptionist = user?.role === "receptionist";

  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [receptionists, setReceptionist] = useState([]);
  const [pharmacist, setPharmacist] = useState([]);
  const [labouratorists, setLabouratorists] = useState([]);
  const [accountants, setAccountants] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [bedallotments, setBedallotments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [dispatchblood, setDispatchblood] = useState([]);
  const [blooddonnors, setBlooddonnors] = useState([]);
  const [operations, setOperations] = useState([]);
  const [births, setBirths] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [Queues, setQueues] = useState([]);
  const [vitalSigns, setVitalSigns] = useState([]);

  // READ
  // TO GET TOTAL NUMBER OF MODEL
  useEffect(() => {
    axios.get("/staff?role=doctor").then((res) => {
      setDoctors(res.data);
    });
    axios.get("/staff?role=nurse").then((res) => {
      setNurses(res.data);
    });
    axios.get("/staff?role=receptionist").then((res) => {
      setReceptionist(res.data);
    });
    axios.get("/staff?role=pharmacist").then((res) => {
      setPharmacist(res.data);
    });
    axios.get("/staff?role=labouratorist").then((res) => {
      setLabouratorists(res.data);
    });
    axios.get("/staff?role=accountant").then((res) => {
      setAccountants(res.data);
    });
    axios.get("/patient").then((res) => {
      setPatients(res.data);
    });
    axios.get("/appointment").then((res) => {
      setAppointments(res.data);
    });
    axios.get("/bedallotment").then((res) => {
      setBedallotments(res.data);
    });
    axios.get("/prescription").then((res) => {
      setPrescriptions(res.data);
    });
    axios.get("/dischargeblood").then((res) => {
      setDispatchblood(res.data);
    });
    axios.get("/blooddonor").then((res) => {
      setBlooddonnors(res.data);
    });
    axios.get("/report?type=operation").then((res) => {
      setOperations(res.data);
    });
    axios.get("/report?type=birth").then((res) => {
      setBirths(res.data);
    });
    axios.get("/report?type=death").then((res) => {
      setDeaths(res.data);
    });
    axios.get("/queue").then((res) => {
      setQueues(res.data);
    });
    axios.get("/vital_signs").then((res) => {
      setVitalSigns(res.data);
    });
  }, []);

  return (
    <>
      {admin && (
        <AdminSidebar>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 m-2">
            <Card
              cardname="Patients"
              number={patients?.length}
              pic={`${pictwo}`}
              linkTo={"/admin/patients"}
            />
            <Card
              cardname="Doctor"
              number={doctors?.length}
              pic={`${doctorpic}`}
              linkTo={"/admin/doctors"}
            />
            <Card
              cardname="Nurse"
              number={nurses?.length}
              pic={`${nursepic}`}
              linkTo={"/admin/nurses"}
            />
            <Card
              cardname="Receptionist"
              number={receptionists?.length}
              pic={`${supportpic}`}
              linkTo={"/admin/receptionists"}
            />
            <Card
              cardname="Pharmacist"
              number={pharmacist?.length}
              pic={`${pharmacistpic}`}
              linkTo={"/admin/pharmacists"}
            />
            <Card
              cardname="Labouratorists"
              number={labouratorists?.length}
              pic={`${laboratoristpic}`}
              linkTo={"/admin/labouratorists"}
            />
            <Card
              cardname="Accountants"
              number={accountants?.length}
              pic={`${accountantpic}`}
              linkTo={"/admin/accountants"}
            />
            <Card
              cardname="Bed"
              number={bedallotments?.length}
              pic={`${bedpic}`}
              linkTo={"/admin/bed_allotment"}
            />
            <Card
              cardname="Blood Bank"
              number="#"
              pic={`${reportpic}`}
              linkTo={"/admin/blood_bank"}
            />
            <Card
              cardname="Appointments"
              number={appointments?.length}
              pic={`${appointmentpic}`}
              linkTo={"/admin/appointments"}
            />
            <Card
              cardname="Payments"
              number={<span>&#8358;</span>}
              pic={`${atm}`}
              linkTo={"/admin/payments"}
            />
            <Card
              cardname="Profile"
              number="@"
              pic={`${settingpic}`}
              linkTo={"/admin/profile"}
              // styles="border-b-blue-900"
            />
          </div>
          <ReactCalendar />
        </AdminSidebar>
      )}

      {doctor && (
        <DoctorSidebar>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 m-2">
            <Card
              cardname="Patients"
              number={patients?.length}
              pic={`${pictwo}`}
              linkTo={"/doctor/patients"}
            />
            <Card
              cardname="Queue"
              number={Queues?.length}
              pic={`${queue}`}
              linkTo={"/doctor/queue"}
            />
            <Card
              cardname="Prescriptions"
              number={prescriptions?.length}
              pic={`${preseription}`}
              linkTo={"/doctor/prescriptions"}
            />
            <Card
              cardname="Appointments"
              number={appointments?.length}
              pic={`${appointmentpic}`}
              linkTo={"/doctor/appointments"}
            />
            <Card
              cardname="Bed"
              number={bedallotments?.length}
              pic={`${bedpic}`}
              linkTo={"/doctor/bed_allotment"}
            />
            <Card
              cardname="Blood Donor"
              number={blooddonnors?.length}
              pic={`${reportpic}`}
              linkTo={"/doctor/blood_donor"}
            />
            <Card
              cardname="Dispatch Blood"
              number={dispatchblood?.length}
              pic={`${laboratoristpic}`}
              linkTo={"/doctor/dispatch_blood"}
            />
            <Card
              cardname="Blood Bank"
              number="#"
              pic={`${diagnosis}`}
              linkTo={"/doctor/blood_bank"}
            />
            <Card
              cardname="Operation"
              number={operations?.length}
              pic={`${tretment}`}
              linkTo={"/doctor/operation"}
            />
            <Card
              cardname="Birth Report"
              number={births?.length}
              pic={`${reportpic}`}
              linkTo={"/doctor/birth"}
            />
            <Card
              cardname="Death Report"
              number={deaths?.length}
              pic={`${reportpic}`}
              linkTo={"/doctor/death"}
            />
            <Card
              cardname="Profile"
              number="@"
              pic={`${settingpic}`}
              linkTo={"/doctor/profile"}
            />
          </div>
          <ReactCalendar />
        </DoctorSidebar>
      )}

      {nurse && (
        <NurseSidebar>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 m-2">
            <Card
              cardname="Vital Signs"
              number={vitalSigns?.length}
              pic={`${preseription}`}
              linkTo={"/nurse/vitalSigns"}
            />
            <Card
              cardname="Patients"
              number={patients?.length}
              pic={`${pictwo}`}
              linkTo={"/nurse/patients"}
            />
            <Card
              cardname="Bed Allotment"
              number={bedallotments?.length}
              pic={`${bedpic}`}
              linkTo={"/nurse/bed_allotment"}
            />
            <Card
              cardname="Blood Donor"
              number={blooddonnors?.length}
              pic={`${reportpic}`}
              linkTo={"/nurse/blood_donor"}
            />
            <Card
              cardname="Dispatch Blood"
              number={dispatchblood?.length}
              pic={`${laboratoristpic}`}
              linkTo={"/nurse/dispatch_blood"}
            />
            <Card
              cardname="Blood Bank"
              number="#"
              pic={`${diagnosis}`}
              linkTo={"/nurse/blood_bank"}
            />
            <Card
              cardname="Operation"
              number={operations?.length}
              pic={`${tretment}`}
              linkTo={"/nurse/operation"}
            />
            <Card
              cardname="Birth Report"
              number={births?.length}
              pic={`${reportpic}`}
              linkTo={"/nurse/birth"}
            />
            <Card
              cardname="Death Report"
              number={deaths?.length}
              pic={`${reportpic}`}
              linkTo={"/nurse/death"}
            />
            <Card
              cardname="Profile"
              number="@"
              pic={`${settingpic}`}
              linkTo={"/nurse/profile"}
            />
          </div>
          <ReactCalendar />
        </NurseSidebar>
      )}

      {pharmacists && (
        <PharmacistSidebar>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 m-2">
            <Card
              cardname="Patients"
              number={patients?.length}
              pic={`${pictwo}`}
              linkTo={"/pharmacist/patients"}
            />
            <Card
              cardname="Provide Medication"
              number={prescriptions?.length}
              pic={`${pharmacistpic}`}
              linkTo={"/pharmacist/provide_medications"}
            />
            <Card
              cardname="Profile"
              number="@"
              pic={`${settingpic}`}
              linkTo={"/pharmacist/profile"}
            />
          </div>
          <ReactCalendar />
        </PharmacistSidebar>
      )}

      {labouratorist && (
        <LabouratoristSidebar>
          {" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 m-2">
            {/* <Card
              cardname="Add Diagnosis"
              number="3"
              pic={`${doctorpic}`}
              linkTo={"/admin/doctors"}
            /> */}
            <Card
              cardname="Blood Donor"
              number={blooddonnors?.length}
              pic={`${reportpic}`}
              linkTo={"/labouratorist/blood_donor"}
            />

            <Card
              cardname="Dispatch Blood"
              number={dispatchblood?.length}
              pic={`${laboratoristpic}`}
              linkTo={"/labouratorist/dispatch_blood"}
            />
            <Card
              cardname="Blood Bank"
              number="#"
              pic={`${diagnosis}`}
              linkTo={"/labouratorist/blood_bank"}
            />

            <Card
              cardname="Profile"
              number="@"
              pic={`${settingpic}`}
              linkTo={"/labouratorist/profile"}
            />
          </div>
          <ReactCalendar />
        </LabouratoristSidebar>
      )}
      {accountant && (
        <AccountantSidebar>
          {" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 m-2">
            <Card
              cardname="Take Payments"
              number={<span>&#8358;</span>}
              pic={`${atm}`}
              linkTo={"/accountant/payment"}
            />
            <Card
              cardname="New Invoice"
              number={<span>&#8358;</span>}
              pic={`${atmtwo}`}
              linkTo={"/accountant/new_invoice"}
            />
            <Card
              cardname="View Payments"
              number={<span>&#8358;</span>}
              pic={`${accountantpic}`}
              linkTo={"/accountant/viewpayments"}
            />

            <Card
              cardname="Profile"
              number="@"
              pic={`${settingpic}`}
              linkTo={"/accountant/profile"}
            />
          </div>
          <ReactCalendar />
        </AccountantSidebar>
      )}
      {receptionist && (
        <ReceptionistSidebar>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 m-2">
            <Card
              cardname="Patients"
              number={patients?.length}
              pic={`${pictwo}`}
              linkTo={"/receptionist/patients"}
            />
            <Card
              cardname="Queue"
              number={Queues?.length}
              pic={`${queue}`}
              linkTo={"/receptionist/queue"}
            />
            <Card
              cardname="Appointments"
              number={appointments?.length}
              pic={`${appointmentpic}`}
              linkTo={"/receptionist/appointments"}
            />
            <Card
              cardname="Profile"
              number="@"
              pic={`${settingpic}`}
              linkTo={"/receptionist/profile"}
            />
          </div>
          <ReactCalendar />
        </ReceptionistSidebar>
      )}
    </>
  );
}

export default Dashboard;
