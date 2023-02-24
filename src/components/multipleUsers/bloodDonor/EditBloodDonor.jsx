import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Select, FormLayout } from "../../../components";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import { loginContext } from "../../../pages/context/auth";
import axios from "../../../services/axios";
import { toast } from "react-toastify";
import ButtonPreloader from "../../ButtonPreloader";

function EditBloodDonor({ url }) {
  const { user } = useContext(loginContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    staffname: `${user?.name}`,
    name: "",
    email: "",
    address: "",
    phone: "",
    gender: "",
    age: "",
    bloodgroup: "",
    bags: "",
    lastdonationdate: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");

  useEffect(() => {
    axios.get(`/blooddonor/?edit=${id}`).then((response) => {
      setFormData(response.data);
    });
  }, []);

  // To Update
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`/blooddonor/${id}`, {
        name: formData?.name,
        email: formData?.email,
        address: formData?.address,
        phone: formData?.phone,
        gender: formData?.gender,
        age: formData?.age,
        bloodgroup: formData?.bloodgroup,
        bags: formData?.bags,
        lastdonationdate: formData?.lastdonationdate,
        staffname: formData?.staffname,
      })
      .then((res) => {
        navigate(`${url}`, { replace: true }), toast.success(res.data);
      })
      .catch((err) => toast.error(err.response.data));
  };

  return (
    <FormLayout formName="EDIT BLOOD DONOR">
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
          label="Phone"
          type="text"
          name="phone"
          value={formData?.phone}
          onChange={handleChange}
        />
        <Select
          label="Gender"
          name="gender"
          type="text"
          onChange={handleChange}
        >
          <option value={formData?.gender}>{formData?.gender}</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Select>
        <Input
          label="Age"
          type="text"
          name="age"
          value={formData?.age}
          onChange={handleChange}
        />
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
          type="text"
          name="bags"
          value={formData?.bags}
          onChange={handleChange}
        />
        <Input
          label="Last Donation Date"
          type="date"
          name="lastdonationdate"
          value={formData?.lastdonationdate}
          onChange={handleChange}
        />
        <Button>{loading ? <ButtonPreloader /> : "Edit Blood Donor"}</Button>
      </form>
    </FormLayout>
  );
}

export default EditBloodDonor;
