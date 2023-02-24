import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NurseSidebar from "../../../components/sidebars/NurseSidebar";
import { Button, Input, Select, FormLayout } from "../../../components";
import axios from "../../../services/axios";
import { toast } from "react-toastify";
import ButtonPreloader from "../../../components/ButtonPreloader";

function EditVitalSign() {
  const navigate = useNavigate();
  const [currentPatient, setCurrentPatient] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    patientid: "",
    bloodpressure: "",
    temperature: "",
    pulse: "",
    spo: "",
    weight: "",
    respirationrate: "",
    height: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    axios.get("/patient").then((res) => {
      setPatients(res.data);
    });
    axios.get(`/vital_signs/?edit=${id}`).then((response) => {
      setFormData(response.data);
      setCurrentPatient(response.data?.patients[0]?.name);
    });
  }, []);

  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");

  // To Update
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`/vital_signs/${id}`, {
        patientid: formData?.patientid,
        bloodpressure: formData?.bloodpressure,
        temperature: formData?.temperature,
        pulse: formData?.pulse,
        spo: formData?.spo,
        weight: formData?.weight,
        respirationrate: formData?.respirationrate,
        height: formData?.height,
      })
      .then((res) => {
        navigate("/nurse/vitalSigns", { replace: true }),
          toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <NurseSidebar>
      <FormLayout formName={"EDIT VITAL SIGNS"}>
        <form onSubmit={handleSubmit}>
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
          <div className="grid lg:grid-cols-2 gap-2">
            <Input
              label="Blood Pressure"
              type="text"
              name="bloodpressure"
              value={formData?.bloodpressure}
              onChange={handleChange}
            />
            <Input
              label="Temperature"
              type="text"
              name="temperature"
              value={formData?.temperature}
              onChange={handleChange}
            />
            <Input
              label="Pulse"
              type="text"
              name="pulse"
              value={formData?.pulse}
              onChange={handleChange}
            />
            <Input
              label="SPO 2"
              type="text"
              name="spo"
              value={formData?.spo}
              onChange={handleChange}
            />
            <Input
              label="Respiration Rate"
              type="text"
              name="respirationrate"
              value={formData?.respirationrate}
              onChange={handleChange}
            />
            <Input
              label="Weight"
              type="text"
              name="weight"
              value={formData?.weight}
              onChange={handleChange}
            />
            <Input
              label="Height"
              type="text"
              name="height"
              value={formData?.height}
              onChange={handleChange}
            />
          </div>

          <Button>{loading ? <ButtonPreloader /> : "Edit Vital Signs"}</Button>
        </form>
      </FormLayout>
    </NurseSidebar>
  );
}

export default EditVitalSign;
