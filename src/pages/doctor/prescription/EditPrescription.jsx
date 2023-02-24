import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Select,
  FormLayout,
  Textarea,
} from "../../../components";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import { loginContext } from "../../context/auth";
import axios from "../../../services/axios";
import { toast } from "react-toastify";
import ButtonPreloader from "../../../components/ButtonPreloader";

function EditPrescription() {
  const { user } = useContext(loginContext);
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    doctorid: `${user?._id}`,
    patientid: "",
    casehistory: "",
    description: "",
    medication: "",
    date: "",
    drugamount: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");

  useEffect(() => {
    axios.get("/patient").then((res) => {
      setPatients(res.data);
    });
    axios.get(`/prescription/?edit=${id}`).then((response) => {
      setFormData(response.data);
      setCurrentPatient(response.data?.patients[0]?.name);
    });
  }, []);

  // To Update Prescription
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`/prescription/${id}`, {
        doctorid: formData?.doctorid,
        patientid: formData?.patientid,
        casehistory: formData?.casehistory,
        description: formData?.description,
        medication: formData?.medication,
        date: formData?.date,
        drugamount: formData?.drugamount,
      })
      .then((res) => {
        navigate("/doctor/prescriptions", { replace: true }),
          toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <DoctorSidebar>
      <FormLayout formName="EDIT PRESCRIPTION">
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="doctorid" onChange={handleChange} />
          <Select
            label="Patient"
            name="patientid"
            type="number"
            onChange={handleChange}
          >
            <option value={formData?.patientid}>{currentPatient}</option>
            {patients.map((patient, i) => {
              return (
                <option value={patient?._id} key={i}>
                  {patient?.name}
                </option>
              );
            })}
          </Select>
          <Textarea
            label="Case History"
            name="casehistory"
            type="text"
            value={formData?.casehistory}
            onChange={handleChange}
          />
          <Textarea
            label="Ailment/Description"
            name="description"
            type="text"
            value={formData?.description}
            onChange={handleChange}
          />
          <Textarea
            label="Medication"
            name="medication"
            type="text"
            value={formData?.medication}
            onChange={handleChange}
          />
          <Input
            label="Amount"
            type="text"
            name="drugamount"
            value={formData?.drugamount}
            onChange={handleChange}
          />
          <Input
            label="Date"
            type="date"
            name="date"
            value={formData?.date}
            onChange={handleChange}
          />
          <Button>{loading ? <ButtonPreloader /> : "Edit Prescription"}</Button>
        </form>
      </FormLayout>
    </DoctorSidebar>
  );
}

export default EditPrescription;
