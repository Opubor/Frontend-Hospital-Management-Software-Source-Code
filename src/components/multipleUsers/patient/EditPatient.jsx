import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Select, FormLayout } from "../../../components";
import axios from "../../../services/axios";
import { toast } from "react-toastify";
import ButtonPreloader from "../../ButtonPreloader";

function EditPatient({ url }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    sex: "",
    dob: "",
    age: "",
    bloodgroup: "",
    tor: "",
    registrationId: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");

  // To Get Current patient Details
  useEffect(() => {
    axios.get(`/patient/?edit=${id}`).then((response) => {
      setFormData(response.data);
    });
  }, []);

  // To Update patient
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`/patient/${id}`, {
        name: formData?.name,
        email: formData?.email,
        address: formData?.address,
        phone: formData?.phone,
        sex: formData?.sex,
        dob: formData?.dob,
        age: formData?.age,
        bloodgroup: formData?.bloodgroup,
        tor: formData?.tor,
        registrationId: formData?.registrationId,
      })
      .then((res) => {
        navigate(`${url}`, { replace: true }), toast.success(res.data);
      })
      .catch((err) => toast.error(err.response.data));
  };

  return (
    <FormLayout formName="EDIT PATIENT">
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          type="text"
          name="name"
          value={formData?.name}
          onChange={handleChange}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleChange}
        />
        <Input
          label="Address"
          type="text"
          name="address"
          value={formData?.address}
          onChange={handleChange}
        />
        <Input
          label="Phone Number"
          type="text"
          name="phone"
          value={formData?.phone}
          onChange={handleChange}
        />
        <Select label="Sex" name="sex" onChange={handleChange}>
          <option value={formData?.sex}>{formData?.sex}</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Select>
        <Input
          label="Date of Birth"
          type="date"
          name="dob"
          value={formData?.dob}
          onChange={handleChange}
        />
        <Input
          label="Age"
          type="number"
          name="age"
          value={formData?.age}
          onChange={handleChange}
        />
        <Select label="Blood Group" name="bloodgroup" onChange={handleChange}>
          <option value={formData?.bloodgroup}>{formData?.bloodgroup}</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </Select>
        <Input
          label="Time Of Registration"
          type="datetime-local"
          name="tor"
          value={formData?.tor}
          onChange={handleChange}
        />
        <input
          type="hidden"
          name="registrationId"
          value={formData?.registrationId}
          onChange={handleChange}
        />
        <Button>{loading ? <ButtonPreloader /> : "Edit Patient"}</Button>
      </form>
    </FormLayout>
  );
}

export default EditPatient;
