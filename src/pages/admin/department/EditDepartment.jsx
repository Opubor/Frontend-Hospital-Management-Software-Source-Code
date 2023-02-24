import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, AdminSidebar, FormLayout } from "../../../components";
import ButtonPreloader from "../../../components/ButtonPreloader";
import axios from "../../../services/axios";
import { loginContext } from "../../context/auth";
import { toast } from "react-toastify";

function EditDepartment() {
  const { user } = useContext(loginContext);
  const [loading, setLoading] = useState(false);
  const admin = user?.role === "admin";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");

  // To Get Current Department Details
  useEffect(() => {
    axios.get(`/department/?edit=${id}`).then((response) => {
      setFormData(response.data);
    });
  }, []);

  // To Update Department
  const UpdateDepartment = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`/department/${id}`, {
        name: formData?.name,
        description: formData?.description,
      })
      .then((res) => {
        navigate("/admin/departments", { replace: true }),
          toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <>
      <AdminSidebar>
        <FormLayout formName="EDIT DEPARTMENT">
          <form onSubmit={UpdateDepartment}>
            <Input
              label={"Department Name"}
              name="name"
              value={formData?.name}
              type="text"
              onChange={handleChange}
            />
            <Input
              label={"Description"}
              name="description"
              value={formData?.description}
              type="text"
              onChange={handleChange}
            />
            <Button>{loading ? <ButtonPreloader /> : "Edit Department"}</Button>
          </form>
        </FormLayout>
      </AdminSidebar>
    </>
  );
}

export default EditDepartment;
