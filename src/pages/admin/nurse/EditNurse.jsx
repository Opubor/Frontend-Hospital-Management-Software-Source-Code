import axios from "../../../services/axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, AdminSidebar, FormLayout } from "../../../components";
import { toast } from "react-toastify";
import ButtonPreloader from "../../../components/ButtonPreloader";

function EditNurse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "nurse",
    department: "",
    address: "",
    phone: "",
    password: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");

  // To Get Current Department Details
  useEffect(() => {
    axios.get(`/staff/?edit=${id}`).then((response) => {
      setFormData(response.data);
    });
  }, []);

  // To Update Staff
  const UpdateStaff = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`/staff/${id}`, {
        name: formData?.name,
        email: formData?.email,
        role: formData?.role,
        department: formData?.department,
        address: formData?.address,
        phone: formData?.phone,
        password: formData?.password,
      })
      .then((res) => {
        navigate("/admin/nurses", { replace: true }), toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <AdminSidebar>
      <FormLayout formName="EDIT NURSE">
        <form onSubmit={UpdateStaff}>
          <Input
            label={"Name"}
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleChange}
          />
          <Input
            label={"Email"}
            type="text"
            name="email"
            value={formData?.email}
            onChange={handleChange}
          />
          <Input
            label={"Department"}
            type="text"
            name="department"
            value={formData?.department}
            onChange={handleChange}
          />
          <Input
            label={"Address"}
            type="text"
            name="address"
            value={formData?.address}
            onChange={handleChange}
          />
          <Input
            label={"Phone"}
            type="text"
            name="phone"
            value={formData?.phone}
            onChange={handleChange}
          />
          <Input
            label={"Password"}
            type="password"
            name="password"
            value={formData?.password}
            onChange={handleChange}
          />
          <input type="hidden" name="role" onChange={handleChange} />
          <Button>{loading ? <ButtonPreloader /> : "EDIT NURSE"}</Button>
        </form>
      </FormLayout>
    </AdminSidebar>
  );
}

export default EditNurse;
