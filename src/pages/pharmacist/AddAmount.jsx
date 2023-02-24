import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PharmacistSidebar from "../../components/sidebars/PharmacistSidebar";
import axios from "../../services/axios";
import { Button, Input } from "../../components";
import { toast } from "react-toastify";
import ButtonPreloader from "../../components/ButtonPreloader";

function AddAmount() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    drugamount: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const [medications, setMedications] = useState([]);
  const [currentPatient, setCurrentPatient] = useState([]);
  const [currentDoctor, setCurrentDoctor] = useState([]);

  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");

  useEffect(() => {
    axios.get(`/prescription/?edit=${id}`).then((response) => {
      setMedications(response.data);
      setFormData(response.data);
      setCurrentPatient(response.data?.patients[0]?.name);
      setCurrentDoctor(response.data?.doctor[0]?.name);
    });
  }, []);

  // To Update Prescription
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`/pharmacist_amount/${id}`, {
        drugamount: formData.drugamount,
      })
      .then((res) => {
        navigate("/pharmacist/provide_medications", { replace: true }),
          toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };
  return (
    <PharmacistSidebar>
      <div className="p-8 bg-indigo-50 rounded-xl">
        <h1 className="font-bold text-lg pb-8 text-indigo-900">
          Patient: {currentPatient}
        </h1>
        <h2 className="font-bold border-b border-b-indigo-900 text-indigo-900">
          MEDICATIONS
        </h2>
        <div className="pt-4">
          {medications?.medication?.split("\n").map((drug, i) => (
            <div key={i} className="flex gap-2 text-lg">
              <p>{i + 1}.</p>
              <p>{drug}</p>
            </div>
          ))}
        </div>
        <div className="pt-8">
          <form onSubmit={handleSubmit}>
            <Input
              label="Amount"
              type="text"
              name="drugamount"
              value={formData?.drugamount}
              onChange={handleChange}
            />
            <Button>{loading ? <ButtonPreloader /> : "Add Amount"}</Button>
          </form>
        </div>
      </div>
    </PharmacistSidebar>
  );
}

export default AddAmount;
