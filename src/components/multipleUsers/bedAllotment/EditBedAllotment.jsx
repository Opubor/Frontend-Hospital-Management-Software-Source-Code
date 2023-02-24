import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Select, FormLayout } from "../../../components";
import { loginContext } from "../../../pages/context/auth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../services/axios";
import { toast } from "react-toastify";
import ButtonPreloader from "../../ButtonPreloader";

function EditBedAllotment({ url }) {
  const { user } = useContext(loginContext);
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState([]);
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    staffname: `${user?.name}`,
    patientid: "",
    patientstatus: "",
    bedtype: "",
    bednumber: "",
    allotmentdate: "",
    dischargedate: "",
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
    axios.get("/bed").then((res) => {
      setBeds(res.data);
    });
    axios.get(`/bedallotment/?edit=${id}`).then((response) => {
      setFormData(response.data);
      setCurrentPatient(response.data?.patients[0]?.name);
    });
  }, []);

  // To Update
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`/bedallotment/${id}`, {
        patientid: formData?.patientid,
        patientstatus: formData?.patientstatus,
        bedtype: formData?.bedtype,
        bednumber: formData?.bednumber,
        allotmentdate: formData?.allotmentdate,
        dischargedate: formData?.dischargedate,
        staffname: formData?.staffname,
      })
      .then((res) => {
        navigate(`${url}`, { replace: true }), toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <FormLayout formName="EDIT BED ALLOTMENT">
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
          label="Patient Status"
          name="patientstatus"
          type="text"
          onChange={handleChange}
        >
          <option value={formData?.patientstatus}>
            {formData?.patientstatus}
          </option>
          <option value="Admitted">Admitted</option>
          <option value="Under Treatment">Under Treatment</option>
          <option value="Operated">Operated</option>
          <option value="Recovery">Recovery</option>
          <option value="Cured">Cured</option>
          <option value="Discharged">Discharged</option>
          <option value="Death">Death</option>
        </Select>
        <Select
          label="Bed Type"
          name="bedtype"
          type="text"
          onChange={handleChange}
        >
          <option value={formData?.bedtype}>{formData?.bedtype}</option>
          {beds.map((bed, i) => {
            return (
              <option value={bed?.type} key={i}>
                {bed?.type}
              </option>
            );
          })}
        </Select>
        <Input
          label="Bed Number"
          name="bednumber"
          type="text"
          value={formData?.bednumber}
          onChange={handleChange}
        />
        <Input
          label="Allotment Date"
          type="datetime-local"
          name="allotmentdate"
          value={formData?.allotmentdate}
          onChange={handleChange}
        />
        <Input
          label="Discharge Date"
          type="datetime-local"
          name="dischargedate"
          value={formData?.dischargedate}
          onChange={handleChange}
        />
        <input type="hidden" name="staffname" onChange={handleChange} />
        <Button>{loading ? <ButtonPreloader /> : "Edit Bed Allotment"}</Button>
      </form>
    </FormLayout>
  );
}

export default EditBedAllotment;
