import React, { useState } from "react";
import ButtonPreloader from "../ButtonPreloader";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "../../services/axios";

function DeleteButton({ path, id, record, children }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    confirmAlert({
      title: "Are you sure you want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            axios.delete(`/${path}/${id}`).then((res) => {
              setLoading(false);
              record();
              toast.success(res.data);
            }),
        },
        {
          label: "No",
          onClick: () => setLoading(false),
        },
      ],
    });
  };

  return (
    <button
      className="bg-red-500 px-2 flex justify-center items-center rounded-full text-sm text-white p-2 hover:bg-red-900"
      onClick={handleDelete}
    >
      {loading ? <ButtonPreloader /> : children}
    </button>
  );
}

export default DeleteButton;
