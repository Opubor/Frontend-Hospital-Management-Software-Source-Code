import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Select, FormLayout } from "../../../components";
import { loginContext } from "../../../pages/context/auth";
import axios from "../../../services/axios";
import { toast } from "react-toastify";
import ButtonPreloader from "../../ButtonPreloader";

function EditDispatchBlood({ url }) {
  const { user } = useContext(loginContext);
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    staffname: `${user?.name}`,
    patientid: "",
    bloodgroup: "",
    bags: "",
    charges: "",
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
    axios.get(`/dischargeblood/?edit=${id}`).then((response) => {
      setFormData(response.data);
      setCurrentPatient(response.data?.patients[0]?.name);
    });
  }, []);

  // To Update
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`/dischargeblood/${id}`, {
        patientid: formData?.patientid,
        bloodgroup: formData?.bloodgroup,
        bags: formData?.bags,
        charges: formData?.charges,
        date: formData?.date,
        staffname: formData?.staffname,
      })
      .then((res) => {
        navigate(`${url}`, { replace: true }), toast.success(res.data);
      })
      .catch((err) => toast.error(err.response.data));
  };

  return (
    <FormLayout formName="EDIT DISPATCHED BLOOD">
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
        <Select
          label="Blood Group"
          type="text"
          name="bloodgroup"
          onChange={handleChange}
        >
          <option value={formData?.bloodgroup}>{formData?.bloodgroup}</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </Select>
        <Input
          label="No. Of Bags"
          type="number"
          name="bags"
          value={formData?.bags}
          onChange={handleChange}
        />
        <Input
          label="Charges"
          type="text"
          name="charges"
          value={formData?.charges}
          onChange={handleChange}
        />
        <Input
          label="Date"
          type="date"
          name="date"
          value={formData?.date}
          onChange={handleChange}
        />
        <input type="hidden" name="staffname" onChange={handleChange} />
        <Button>
          {loading ? <ButtonPreloader /> : "Edit Dispatched Blood"}
        </Button>
      </form>
    </FormLayout>
  );
}

export default EditDispatchBlood;
