import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Select, FormLayout } from "../../../components";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import { loginContext } from "../../context/auth";
import axios from "../../../services/axios";
import { toast } from "react-toastify";
import ButtonPreloader from "../../../components/ButtonPreloader";

function EditAppointment() {
  const navigate = useNavigate();
  const { user } = useContext(loginContext);
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    doctorid: `${user?._id}`,
    patientid: "",
    date: "",
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
    axios.get(`/appointment/?edit=${id}`).then((response) => {
      setFormData(response.data);
      setCurrentPatient(response.data?.patients[0]?.name);
    });
  }, []);

  // To Update
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`/appointment/${id}`, {
        doctorid: formData.doctorid,
        patientid: formData.patientid,
        date: formData.date,
      })
      .then((res) => {
        navigate("/doctor/appointments", { replace: true }),
          toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <DoctorSidebar>
      <FormLayout formName="EDIT APPOINTMENT">
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
          <Input
            label="Date"
            type="date"
            name="date"
            value={formData?.date}
            onChange={handleChange}
          />
          <Button>{loading ? <ButtonPreloader /> : "Edit Appointment"}</Button>
        </form>
      </FormLayout>
    </DoctorSidebar>
  );
}

export default EditAppointment;
