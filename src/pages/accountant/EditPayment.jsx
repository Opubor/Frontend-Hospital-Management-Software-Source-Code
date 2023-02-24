import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AccountantSidebar from "../../components/sidebars/AccountantSidebar";
import axios from "../../services/axios";
import { Button, Input, Select, FormLayout } from "../../components";
import ButtonPreloader from "../../components/ButtonPreloader";
import { toast } from "react-toastify";

function EditPayment() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    patientid: "",
    purpose: "",
    modeofpayment: "",
    amount: "",
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
    axios.get(`/payments/?edit=${id}`).then((response) => {
      setFormData(response.data);
      setCurrentPatient(response.data?.patients[0]?.name);
    });
  }, []);

  // To Update
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`/payments/${id}`, {
        patientid: formData?.patientid,
        purpose: formData?.purpose,
        modeofpayment: formData?.modeofpayment,
        amount: formData?.amount,
        date: formData?.date,
      })
      .then((res) => {
        navigate("/accountant/viewpayments", { replace: true }),
          toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <AccountantSidebar>
      {" "}
      <FormLayout formName={"Edit Invoice"}>
        <form onSubmit={handleSubmit}>
          {formData?.purpose !== "Medication/drugs" ? (
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
          ) : (
            <input
              type="hidden"
              name="patientid"
              value={formData?.patientid}
              onChange={handleChange}
            />
          )}

          {formData?.purpose !== "Medication/drugs" ? (
            <Input
              label="Purpose of Payment"
              type="text"
              name="purpose"
              value={formData?.purpose}
              onChange={handleChange}
            />
          ) : (
            <input
              type="hidden"
              name="purpose"
              value={formData?.purpose}
              onChange={handleChange}
            />
          )}

          <Select
            label="Mode Of Payment"
            name="modeofpayment"
            type="text"
            onChange={handleChange}
          >
            <option value={formData?.modeofpayment}>
              {formData?.modeofpayment}
            </option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </Select>
          {formData?.purpose !== "Medication/drugs" ? (
            <Input
              label="Amount"
              type="text"
              name="amount"
              value={formData?.amount}
              onChange={handleChange}
            />
          ) : (
            <input
              type="hidden"
              name="amount"
              value={formData?.amount}
              onChange={handleChange}
            />
          )}

          <Input
            label="Date"
            type="date"
            name="date"
            value={formData?.date}
            onChange={handleChange}
          />
          <Button>{loading ? <ButtonPreloader /> : "Edit Payment"}</Button>
        </form>
      </FormLayout>
    </AccountantSidebar>
  );
}

export default EditPayment;
