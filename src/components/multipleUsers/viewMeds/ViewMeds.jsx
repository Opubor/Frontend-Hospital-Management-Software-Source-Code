import React, { useEffect, useState } from "react";
import image from "../../../assets/undraw_medical_care_movn.png";
import { useLocation } from "react-router-dom";
import axios from "../../../services/axios";

function ViewMeds() {
  const [formData, setFormData] = useState([]);
  const [currentPatient, setCurrentPatient] = useState([]);
  const [currentDoctor, setCurrentDoctor] = useState([]);

  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");

  useEffect(() => {
    axios.get(`/prescription/?edit=${id}`).then((response) => {
      setFormData(response.data);
      setCurrentPatient(response.data?.patients[0]?.name);
      setCurrentDoctor(response.data?.doctor[0]?.name);
    });
  }, []);

  return (
    <div className="p-4 bg-gray-100">
      <div className="bg-white p-8 rounded-xl">
        <div className="grid grid-cols-2">
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-indigo-700 pb-4">
                + St. Andrew's Hospital
              </h1>
              <p className="text-base font-semibold">
                No. 9 Airport Road opp. Jakpa Junction
              </p>
              <p className="text-base font-semibold">
                Mail: standrewhospital@gmail.com
              </p>
              <p className="text-base font-semibold">Tel: 09139124809</p>
            </div>
            <div className="font-semibold">
              <p className="text-base">Patient: {currentPatient}</p>
              <p className="text-base">Doctor: {currentDoctor}</p>
              <div className="text-base">
                Payment Status:{" "}
                {formData?.paymentstatus === "Paid" ? (
                  <p className="font-bold rounded px-2 inline text-base bg-green-700 text-center w-16 text-white">
                    {formData?.paymentstatus}
                  </p>
                ) : (
                  <p className="font-bold rounded px-2 inline text-base bg-red-700 text-center w-16 text-white">
                    Unpaid
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <img src={image} className="w-80" alt="" />
          </div>
        </div>
        <h1 className="text-center pt-4 font-bold text-2xl border-b border-b-indigo-700 text-indigo-700">
          PATIENTS MEDICATION
        </h1>
        <div className="py-4">
          <p className="font-bold">Ailment : {formData?.description}</p>
          <div className="py-2 text-lg">
            {formData?.medication?.split("\n").map((drug, i) => (
              <div key={i} className="flex gap-2 text-lg">
                <span>{i + 1}.</span>
                <span>{drug}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-base pt-4">
          NB: Please make sure to always take your drugs
        </p>
      </div>
    </div>
  );
}

export default ViewMeds;
