import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginProvider } from "./pages/context/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// ADMIN
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Departments = React.lazy(() =>
  import("../src/pages/admin/department/Departments")
);
const Accountant = React.lazy(() =>
  import("./pages/admin/accountant/Accountant")
);
const EditAccountant = React.lazy(() =>
  import("./pages/admin/accountant/EditAccountant")
);
const EditDepartment = React.lazy(() =>
  import("./pages/admin/department/EditDepartment")
);
const Doctors = React.lazy(() => import("./pages/admin/doctor/Doctors"));
const EditDoctor = React.lazy(() => import("./pages/admin/doctor/EditDoctor"));
const EditLabouratorist = React.lazy(() =>
  import("./pages/admin/labouratorist/EditLabouratorist")
);
const Labouratorist = React.lazy(() =>
  import("./pages/admin/labouratorist/Labouratorist")
);
const EditNurse = React.lazy(() => import("./pages/admin/nurse/EditNurse"));
const Nurses = React.lazy(() => import("./pages/admin/nurse/Nurses"));
const AdEditPatient = React.lazy(() =>
  import("./pages/admin/patient/EditPatient")
);
const AdPatients = React.lazy(() => import("./pages/admin/patient/Patients"));
const EditPharmacist = React.lazy(() =>
  import("./pages/admin/pharmacist/EditPharmacist")
);
const Pharmacist = React.lazy(() =>
  import("./pages/admin/pharmacist/Pharmacist")
);
const Profile = React.lazy(() => import("./pages/admin/Profile"));
const EditReceptionist = React.lazy(() =>
  import("./pages/admin/receptionist/EditReceptionist")
);
const Receptionist = React.lazy(() =>
  import("./pages/admin/receptionist/Receptionist")
);
const AdminBedAllotment = React.lazy(() =>
  import("./pages/admin/bedAllotment/BedAllotment")
);
const AdminBloodBank = React.lazy(() =>
  import("./pages/admin/bloodBank/BloodBank")
);
const AdminAppointment = React.lazy(() =>
  import("./pages/admin/appointment/Appointment")
);
const AdminOperation = React.lazy(() =>
  import("./pages/admin/operation/Operation")
);
const AdminBirth = React.lazy(() => import("./pages/admin/birth/Birth"));
const AdminDeath = React.lazy(() => import("./pages/admin/death/Death"));
const AdminPayments = React.lazy(() =>
  import("./pages/admin/payment/Payments")
);
const Login = React.lazy(() => import("./pages/Login"));
// DOCTOR
const DocPatients = React.lazy(() => import("./pages/doctor/patient/Patients"));
const DocEditPatient = React.lazy(() =>
  import("./pages/doctor/patient/EditPatient")
);
const Appointment = React.lazy(() =>
  import("./pages/doctor/appointment/Appointment")
);
const EditAppointment = React.lazy(() =>
  import("./pages/doctor/appointment/EditAppointment")
);
const Prescription = React.lazy(() =>
  import("./pages/doctor/prescription/Prescription")
);
const EditPrescription = React.lazy(() =>
  import("./pages/doctor/prescription/EditPrescription")
);
const BedAllotment = React.lazy(() =>
  import("./pages/doctor/bedAllotment/BedAllotment")
);
const EditBedAllotment = React.lazy(() =>
  import("./pages/doctor/bedAllotment/EditBedAllotment")
);
const BloodDonor = React.lazy(() =>
  import("./pages/doctor/bloodDonor/BloodDonor")
);
const EditBloodDonor = React.lazy(() =>
  import("./pages/doctor/bloodDonor/EditBloodDonor")
);
const DispatchBlood = React.lazy(() =>
  import("./pages/doctor/dispatchBlood/DispatchBlood")
);
const EditDispatchBlood = React.lazy(() =>
  import("./pages/doctor/dispatchBlood/EditDispatchBlood")
);
const BloodBank = React.lazy(() =>
  import("./pages/doctor/bloodBank/BloodBank")
);
const Operation = React.lazy(() =>
  import("./pages/doctor/operation/Operation")
);
const EditOperation = React.lazy(() =>
  import("./pages/doctor/operation/EditOperation")
);
const Birth = React.lazy(() => import("./pages/doctor/birth/Birth"));
const EditBirth = React.lazy(() => import("./pages/doctor/birth/EditBirth"));
const Death = React.lazy(() => import("./pages/doctor/death/Death"));
const EditDeath = React.lazy(() => import("./pages/doctor/death/EditDeath"));
const DoctorViewMeds = React.lazy(() =>
  import("./pages/doctor/prescription/ViewMeds")
);
const DoctorVitalSigns = React.lazy(() =>
  import("./pages/doctor/vitalSign/VitalSign")
);
const DoctorQueue = React.lazy(() => import("./pages/doctor/queue/Queue"));
const DoctorProfile = React.lazy(() => import("./pages/doctor/Profile"));
// NURSE
const Patients = React.lazy(() => import("./pages/nurse/patient/Patients"));
const EditPatient = React.lazy(() =>
  import("./pages/nurse/patient/EditPatient")
);
const NurseBedAllotment = React.lazy(() =>
  import("./pages/nurse/bedAllotment/BedAllotment")
);
const NurseEditBedAllotment = React.lazy(() =>
  import("./pages/nurse/bedAllotment/EditBedAllotment")
);
const NurseBloodBank = React.lazy(() =>
  import("./pages/nurse/bloodBank/BloodBank")
);
const NurseBloodDonor = React.lazy(() =>
  import("./pages/nurse/bloodDonor/BloodDonor")
);
const NurseEditBloodDonor = React.lazy(() =>
  import("./pages/nurse/bloodDonor/EditBloodDonor")
);
const NurseDispatchBlood = React.lazy(() =>
  import("./pages/nurse/dispatchBlood/DispatchBlood")
);
const NurseEditDispatchBlood = React.lazy(() =>
  import("./pages/nurse/dispatchBlood/EditDispatchBlood")
);
const NurseOperation = React.lazy(() =>
  import("./pages/nurse/operation/Operation")
);
const NurseEditOperation = React.lazy(() =>
  import("./pages/nurse/operation/EditOperation")
);
const NurseBirth = React.lazy(() => import("./pages/nurse/birth/Birth"));
const NurseEditBirth = React.lazy(() =>
  import("./pages/nurse/birth/EditBirth")
);
const NurseDeath = React.lazy(() => import("./pages/nurse/death/Death"));
const NurseEditDeath = React.lazy(() =>
  import("./pages/nurse/death/EditDeath")
);
const Bed = React.lazy(() => import("./pages/nurse/bed/Bed"));
const EditBed = React.lazy(() => import("./pages/nurse/bed/EditBed"));
const VitalSign = React.lazy(() => import("./pages/nurse/vitalSign/VitalSign"));
const EditVitalSign = React.lazy(() =>
  import("./pages/nurse/vitalSign/EditVitalSign")
);
const NurseProfile = React.lazy(() => import("./pages/nurse/Profile"));
// PHARMACIST
const AddAmount = React.lazy(() => import("./pages/pharmacist/AddAmount"));
const ProvideMeds = React.lazy(() => import("./pages/pharmacist/ProvideMeds"));
const ViewMeds = React.lazy(() => import("./pages/pharmacist/ViewMeds"));
const PharmacistPatients = React.lazy(() =>
  import("./pages/pharmacist/Patients")
);
const PharmacistProfile = React.lazy(() =>
  import("./pages/pharmacist/Profile")
);
// ACCOUNTANT
const Payment = React.lazy(() => import("./pages/accountant/Payments"));
const Invoice = React.lazy(() => import("./pages/accountant/Invoice"));
const ViewPayments = React.lazy(() =>
  import("./pages/accountant/ViewPayments")
);
const AccountantProfile = React.lazy(() =>
  import("./pages/accountant/Profile")
);
const AccountantNewInvoice = React.lazy(() =>
  import("./pages/accountant/NewInvoice")
);
const AccountantEditPayment = React.lazy(() =>
  import("./pages/accountant/EditPayment")
);
// LABOURATORIST
const LabouratoristBloodDonor = React.lazy(() =>
  import("./pages/labouratorist/bloodDonor/BloodDonor")
);
const LabouratoristEditBloodDonor = React.lazy(() =>
  import("./pages/labouratorist/bloodDonor/EditBloodDonor")
);
const LabouratoristDispatchBlood = React.lazy(() =>
  import("./pages/labouratorist/dispatchBlood/DispatchBlood")
);
const LabouratoristEditDispatchBlood = React.lazy(() =>
  import("./pages/labouratorist/dispatchBlood/EditDispatchBlood")
);
const LabouratoristBloodBank = React.lazy(() =>
  import("./pages/labouratorist/bloodBank/BloodBank")
);
const LabouratoristProfile = React.lazy(() =>
  import("./pages/labouratorist/Profile")
);
// RECEPTIONIST
const ReceptionistsPatients = React.lazy(() =>
  import("./pages/receptionist/patient/Patients")
);
const ReceptionistsEditPatient = React.lazy(() =>
  import("./pages/receptionist/patient/EditPatient")
);
const ReceptionistProfile = React.lazy(() =>
  import("./pages/receptionist/Profile")
);
const ReceptionistsQueue = React.lazy(() =>
  import("./pages/receptionist/queue/Queue")
);
const ReceptionistsEditQueue = React.lazy(() =>
  import("./pages/receptionist/queue/EditQueue")
);
const ReceptionistAppointments = React.lazy(() =>
  import("./pages/receptionist/appointment/Appointment")
);
// PRELOADER
const Preloader = React.lazy(() => import("./components/Preloader"));
const AdminScreenshots = React.lazy(() => import("./pages/AdminScreenshots"));
const AppModules = React.lazy(() => import("./pages/AppModules"));
const Forbidden = React.lazy(() => import("../src/components/Forbidden"));

function App() {
  return (
    <Suspense fallback={<Preloader />}>
      <LoginProvider>
        <BrowserRouter>
          <ToastContainer autoClose={2000} position="top-center" />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/adminScreenshots" element={<AdminScreenshots />} />
            <Route path="/forbidden" element={<Forbidden />} />
            <Route path="/AppModules" element={<AppModules />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/departments" element={<Departments />} />
            <Route path="/admin/edit_department" element={<EditDepartment />} />
            <Route path="/admin/doctors" element={<Doctors />} />
            <Route path="/admin/edit_doctor" element={<EditDoctor />} />
            <Route path="/admin/patients" element={<AdPatients />} />
            <Route path="/admin/edit_patient" element={<AdEditPatient />} />
            <Route path="/admin/nurses" element={<Nurses />} />
            <Route path="/admin/edit_nurse" element={<EditNurse />} />
            <Route path="/admin/pharmacists" element={<Pharmacist />} />
            <Route path="/admin/edit_pharmacist" element={<EditPharmacist />} />
            <Route path="/admin/labouratorists" element={<Labouratorist />} />
            <Route
              path="/admin/edit_labouratorist"
              element={<EditLabouratorist />}
            />
            <Route path="/admin/accountants" element={<Accountant />} />
            <Route path="/admin/edit_accountant" element={<EditAccountant />} />
            <Route path="/admin/receptionists" element={<Receptionist />} />
            <Route
              path="/admin/edit_receptionist"
              element={<EditReceptionist />}
            />
            <Route
              path="/admin/bed_allotment"
              element={<AdminBedAllotment />}
            />
            <Route path="/admin/blood_bank" element={<AdminBloodBank />} />
            <Route path="/admin/appointments" element={<AdminAppointment />} />
            <Route path="/admin/operations" element={<AdminOperation />} />
            <Route path="/admin/births" element={<AdminBirth />} />
            <Route path="/admin/deaths" element={<AdminDeath />} />
            <Route path="/admin/payments" element={<AdminPayments />} />
            <Route path="/admin/profile" element={<Profile />} />

            {/* ==============DOCTOR================== */}
            <Route path="doctor">
              <Route path="patients" element={<DocPatients />} />
              <Route path="edit_patient" element={<DocEditPatient />} />
              <Route path="appointments" element={<Appointment />} />
              <Route path="edit_appointment" element={<EditAppointment />} />
              <Route path="prescriptions" element={<Prescription />} />
              <Route path="edit_prescription" element={<EditPrescription />} />
              <Route path="bed_allotment" element={<BedAllotment />} />
              <Route path="edit_bedAllotment" element={<EditBedAllotment />} />
              <Route path="blood_donor" element={<BloodDonor />} />
              <Route path="edit_blooddonor" element={<EditBloodDonor />} />
              <Route path="dispatch_blood" element={<DispatchBlood />} />
              <Route
                path="edit_dispatchedblood"
                element={<EditDispatchBlood />}
              />
              <Route path="blood_bank" element={<BloodBank />} />
              <Route path="operation" element={<Operation />} />
              <Route path="edit_operation" element={<EditOperation />} />
              <Route path="birth" element={<Birth />} />
              <Route path="edit_birth" element={<EditBirth />} />
              <Route path="death" element={<Death />} />
              <Route path="edit_death" element={<EditDeath />} />
              <Route path="view_medications" element={<DoctorViewMeds />} />
              <Route path="vital_sign" element={<DoctorVitalSigns />} />
              <Route path="queue" element={<DoctorQueue />} />
              <Route path="profile" element={<DoctorProfile />} />
            </Route>
            {/* =============================NURSE=========================== */}
            <Route path="/nurse/patients" element={<Patients />} />
            <Route path="/nurse/edit_patient" element={<EditPatient />} />
            <Route
              path="/nurse/bed_allotment"
              element={<NurseBedAllotment />}
            />
            <Route
              path="/nurse/edit_bedAllotment"
              element={<NurseEditBedAllotment />}
            />
            <Route path="/nurse/blood_bank" element={<NurseBloodBank />} />
            <Route path="/nurse/blood_donor" element={<NurseBloodDonor />} />
            <Route
              path="/nurse/edit_blooddonor"
              element={<NurseEditBloodDonor />}
            />
            <Route
              path="/nurse/dispatch_blood"
              element={<NurseDispatchBlood />}
            />
            <Route
              path="/nurse/edit_dispatchedblood"
              element={<NurseEditDispatchBlood />}
            />
            <Route path="/nurse/operation" element={<NurseOperation />} />
            <Route
              path="/nurse/edit_operation"
              element={<NurseEditOperation />}
            />
            <Route path="/nurse/birth" element={<NurseBirth />} />
            <Route path="/nurse/edit_birth" element={<NurseEditBirth />} />
            <Route path="/nurse/death" element={<NurseDeath />} />
            <Route path="/nurse/edit_death" element={<NurseEditDeath />} />
            <Route path="/nurse/add_bed" element={<Bed />} />
            <Route path="/nurse/edit_bed" element={<EditBed />} />
            <Route path="/nurse/vitalSigns" element={<VitalSign />} />
            <Route path="/nurse/edit_vitalSigns" element={<EditVitalSign />} />
            <Route
              path="/pharmacist/provide_medications"
              element={<ProvideMeds />}
            />
            <Route path="/nurse/profile" element={<NurseProfile />} />
            {/* ==============PHARMACIST================== */}
            <Route path="/pharmacist/view_medications" element={<ViewMeds />} />
            <Route path="/pharmacist/add_amount" element={<AddAmount />} />
            <Route
              path="/pharmacist/patients"
              element={<PharmacistPatients />}
            />
            <Route path="/pharmacist/profile" element={<PharmacistProfile />} />
            {/* ==============ACCOUNTANT================== */}
            <Route path="/accountant/payment" element={<Payment />} />
            <Route path="/accountant/invoice" element={<Invoice />} />
            <Route path="/accountant/viewpayments" element={<ViewPayments />} />
            <Route path="/accountant/profile" element={<AccountantProfile />} />
            <Route
              path="/accountant/new_invoice"
              element={<AccountantNewInvoice />}
            />
            <Route
              path="/accountant/edit_payment"
              element={<AccountantEditPayment />}
            />
            {/* ==============LABOURATORIST================== */}
            <Route
              path="/labouratorist/blood_donor"
              element={<LabouratoristBloodDonor />}
            />
            <Route
              path="/labouratorist/edit_blooddonor"
              element={<LabouratoristEditBloodDonor />}
            />
            <Route
              path="/labouratorist/dispatch_blood"
              element={<LabouratoristDispatchBlood />}
            />
            <Route
              path="/labouratorist/edit_dispatchedblood"
              element={<LabouratoristEditDispatchBlood />}
            />
            <Route
              path="/labouratorist/blood_bank"
              element={<LabouratoristBloodBank />}
            />
            <Route
              path="/labouratorist/profile"
              element={<LabouratoristProfile />}
            />
            {/* ==============RECEPTIONIST================== */}
            <Route
              path="/receptionist/patients"
              element={<ReceptionistsPatients />}
            />
            <Route
              path="/receptionist/edit_patient"
              element={<ReceptionistsEditPatient />}
            />
            <Route
              path="/receptionist/queue"
              element={<ReceptionistsQueue />}
            />
            <Route
              path="/receptionist/edit_queue"
              element={<ReceptionistsEditQueue />}
            />
            <Route
              path="/receptionist/appointments"
              element={<ReceptionistAppointments />}
            />
            <Route
              path="/receptionist/profile"
              element={<ReceptionistProfile />}
            />
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </Suspense>
  );
}

export default App;
