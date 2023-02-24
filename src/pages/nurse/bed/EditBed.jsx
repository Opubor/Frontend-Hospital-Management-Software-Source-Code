import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, FormLayout } from "../../../components";
import axios from "../../../services/axios";
import NurseSidebar from "../../../components/sidebars/NurseSidebar";
import { toast } from "react-toastify";
import ButtonPreloader from "../../../components/ButtonPreloader";

function EditBed() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    type: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");

  useEffect(() => {
    axios.get(`/bed/?edit=${id}`).then((response) => {
      setFormData(response.data);
    });
  }, []);

  // To Update
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`/bed/${id}`, {
        type: formData?.type,
      })
      .then((res) => {
        navigate("/nurse/add_bed", { replace: true }), toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <NurseSidebar>
      <FormLayout formName="EDIT APPOINTMENT">
        <form onSubmit={handleSubmit}>
          <Input
            label="Bed Name"
            type="type"
            name="type"
            value={formData?.type}
            onChange={handleChange}
          />
          <Button>{loading ? <ButtonPreloader /> : "Edit Bed"}</Button>
        </form>
      </FormLayout>
    </NurseSidebar>
  );
}

export default EditBed;
