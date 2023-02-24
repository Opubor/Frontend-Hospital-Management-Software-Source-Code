import axios from "../../services/axios";
import React, { useState } from "react";
import { Button, FormLayout, Input } from "../../components";
import { toast } from "react-toastify";
import ButtonPreloader from "../../components/ButtonPreloader";

function CreateStaff({ role, buttonName, formName, getStaffs }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role,
    department: "",
    address: "",
    phone: "",
    password: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/staff", {
        name: formData?.name,
        email: formData?.email,
        role: formData?.role,
        department: formData?.department,
        address: formData?.address,
        phone: formData?.phone,
        password: formData?.password,
      })
      .then((res) => {
        setLoading(false);
        getStaffs();
        toast.success(res.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };
  return (
    <div>
      <FormLayout formName={formName}>
        <form onSubmit={handleSubmit}>
          <Input
            label={"Name"}
            type="text"
            name="name"
            onChange={handleChange}
          />
          <Input
            label={"Email"}
            type="text"
            name="email"
            onChange={handleChange}
          />
          <Input
            label={"Department"}
            type="text"
            name="department"
            placeholder="(Optional)"
            onChange={handleChange}
          />
          <Input
            label={"Address"}
            type="text"
            name="address"
            onChange={handleChange}
          />
          <Input
            label={"Phone"}
            type="text"
            name="phone"
            onChange={handleChange}
          />
          <Input
            label={"Password"}
            type="password"
            name="password"
            onChange={handleChange}
          />
          <input
            type="hidden"
            value={role}
            name="role"
            onChange={handleChange}
          />
          <Button> {loading ? <ButtonPreloader /> : buttonName}</Button>
        </form>
      </FormLayout>
    </div>
  );
}

export default CreateStaff;
