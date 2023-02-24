import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../services/axios";
import ReceptionistSidebar from "../../../components/sidebars/ReceptionistSidebar";
import { Button, Select, FormLayout } from "../../../components";
import { toast } from "react-toastify";
import ButtonPreloader from "../../../components/ButtonPreloader";

function EditQueue() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    axios.get("/patient").then((res) => {
      setPatients(res.data);
    });
    axios.get(`/queue/?edit=${id}`).then((response) => {
      setFormData(response.data);
      setCurrentPatient(response.data?.name);
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
      .put(`/queue/${id}`, {
        name: formData?.name,
      })
      .then((res) => {
        navigate("/receptionist/queue", { replace: true }),
          toast.success(res.data);
      })
      .catch((res) => {
        toast.error(res.response.data);
      });
  };
  return (
    <ReceptionistSidebar>
      <FormLayout formName={"Edit Queue"}>
        <form onSubmit={handleSubmit}>
          {" "}
          <Select
            label="Patient"
            name="name"
            type="text"
            onChange={handleChange}
          >
            <option value={formData?.name}>{currentPatient}</option>
            {patients.map((patient, i) => {
              return (
                <option value={patient?.name} key={i}>
                  {patient?.name}
                </option>
              );
            })}
          </Select>
          <Button>{loading ? <ButtonPreloader /> : "Edit Queue"}</Button>
        </form>
      </FormLayout>
    </ReceptionistSidebar>
  );
}

export default EditQueue;
