import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Select, FormLayout, Tabs } from "../../../components";
import { loginContext } from "../../../pages/context/auth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../services/axios";
import { toast } from "react-toastify";
import ButtonPreloader from "../../ButtonPreloader";

function EditOperation({ url }) {
  const { user } = useContext(loginContext);
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    staffname: `${user?.name}`,
    type: "operation",
    patientid: "",
    description: "",
    date: "",
    outcomestatus: "",
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
      setCurrentPatient(response.data?.patients[0]?.name);
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
        outcomestatus: formData?.outcomestatus,
      })
      .then((res) => {
        navigate(`${url}`, { replace: true }), toast.success(res.data);
      })
      .catch((err) => toast.error(err.response.data));
  };

  return (
    <FormLayout formName="Edit OPERATION">
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
          label="Operation Type"
          type="text"
          name="description"
          value={formData?.description}
          onChange={handleChange}
        />
        <Input
          label="Date"
          type="date"
          name="date"
          onChange={handleChange}
          value={formData?.date}
        />
        <Select
          label="Outcome Status"
          name="outcomestatus"
          type="text"
          onChange={handleChange}
        >
          <option value={formData?.outcomestatus}>
            {formData?.outcomestatus}
          </option>
          <option value="Successful">Successful</option>
          <option value="Failed">Failed</option>
        </Select>
        <Button>{loading ? <ButtonPreloader /> : "Edit Operation"}</Button>
      </form>
    </FormLayout>
  );
}

export default EditOperation;
