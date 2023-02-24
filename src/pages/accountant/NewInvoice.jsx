import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountantSidebar from "../../components/sidebars/AccountantSidebar";
import axios from "../../services/axios";
import { Button, Input, Select, FormLayout } from "../../components";
import { toast } from "react-toastify";
import ButtonPreloader from "../../components/ButtonPreloader";

function NewInvoice() {
  const [patients, setPatients] = useState([]);
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
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/patient").then((res) => {
      setPatients(res.data);
    });
  }, []);

  // CREATE
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/payments", {
        patientid: formData?.patientid,
        purpose: formData?.purpose,
        modeofpayment: formData?.modeofpayment,
        amount: formData?.amount,
        date: formData?.date,
      })
      .then((res) =>
        navigate("/accountant/viewpayments", toast.success(res.data), {
          replace: true,
        })
      )
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <AccountantSidebar>
      <FormLayout formName={"New Invoice"}>
        <form onSubmit={handleSubmit}>
          <Select
            label="Patient"
            name="patientid"
            type="number"
            onChange={handleChange}
          >
            <option value="">Select Patient</option>
            {patients.map((patient, i) => {
              return (
                <option value={patient?._id} key={i}>
                  {patient?.registrationId} - {patient?.name}
                </option>
              );
            })}
          </Select>
          <Input
            label="Purpose of Payment"
            type="text"
            name="purpose"
            onChange={handleChange}
          />
          <Select
            label="Mode Of Payment"
            name="modeofpayment"
            type="text"
            onChange={handleChange}
          >
            <option value="">Select Mode of Payment</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </Select>
          <Input
            label="Amount"
            type="text"
            name="amount"
            onChange={handleChange}
          />
          <Input label="Date" type="date" name="date" onChange={handleChange} />
          <Button>{loading ? <ButtonPreloader /> : "Add new Payment"}</Button>
        </form>
      </FormLayout>
    </AccountantSidebar>
  );
}

export default NewInvoice;
