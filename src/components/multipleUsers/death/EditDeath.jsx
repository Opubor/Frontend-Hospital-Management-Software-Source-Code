import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Select, FormLayout, Tabs } from "../../../components";
import { loginContext } from "../../../pages/context/auth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../services/axios";
import { toast } from "react-toastify";
import ButtonPreloader from "../../ButtonPreloader";

function EditDeath({ url }) {
  const { user } = useContext(loginContext);
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    staffname: `${user?.name}`,
    type: "death",
    patientid: "",
    description: "",
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
    axios.get(`/report/?edit=${id}`).then((response) => {
      setFormData(response.data);
      setCurrentPatient(response.data?.patients[0].name);
    });
  }, []);

  // To Update
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`/report/${id}`, {
        type: formData?.type,
        staffname: formData?.staffname,
        patientid: formData?.patientid,
        description: formData?.description,
        date: formData?.date,
      })
      .then((res) => {
        navigate(`${url}`, { replace: true }), toast.success(res.data);
      })
      .catch((err) => toast.error(err.response.data));
  };

  return (
    <FormLayout formName="EDIT DEATH">
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="type" onChange={handleChange} />
        <input type="hidden" name="staffname" onChange={handleChange} />
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
          label="Cause"
          name="description"
          type="text"
          value={formData?.description}
          onChange={handleChange}
        />
        <Input
          label="Date"
          type="date"
          name="date"
          value={formData?.date}
          onChange={handleChange}
        />
        <Button>{loading ? <ButtonPreloader /> : "Edit Death"}</Button>
      </form>
    </FormLayout>
  );
}

export default EditDeath;
