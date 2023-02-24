import React, { useContext, useEffect, useState } from "react";
import {
  DeleteButton,
  EditButton,
  Button,
  Input,
  SearchInput,
  Select,
  AdminSidebar,
  OptionsTd,
  OptionsTh,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  FormLayout,
  Tabs,
  IndexNo,
  TotalNo,
} from "../../../components";
import { loginContext } from "../../context/auth";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import axios from "../../../services/axios";
import NurseSidebar from "../../../components/sidebars/NurseSidebar";
import ReactPagination from "../../../components/ReactPagination";
import { toast } from "react-toastify";
import ButtonPreloader from "../../../components/ButtonPreloader";

function VitalSign() {
  const { user } = useContext(loginContext);
  const [patients, setPatients] = useState([]);
  const [vitalSigns, setVitalSigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    patientid: "",
    bloodpressure: "",
    temperature: "",
    pulse: "",
    spo: "",
    weight: "",
    respirationrate: "",
    height: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function getVitalSigns() {
    axios
      .get("/vital_signs")
      .then((response) => {
        setVitalSigns(response.data);
      })
      .catch((response) => {
        toast.error(response.data);
      });
  }

  // CREATE
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/vital_signs", {
        patientid: formData?.patientid,
        bloodpressure: formData?.bloodpressure,
        temperature: formData?.temperature,
        pulse: formData?.pulse,
        spo: formData?.spo,
        weight: formData?.weight,
        respirationrate: formData?.respirationrate,
        height: formData?.height,
      })
      .then((res) => {
        setLoading(false);
        getVitalSigns();
        toast.success(res.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  useEffect(() => {
    axios.get("/patient").then((res) => {
      setPatients(res.data);
    });
    getVitalSigns();
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/vital_signs?q=${data}`).then((response) => {
      setVitalSigns(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = vitalSigns.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(vitalSigns.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <NurseSidebar>
      <Tabs
        label1={"Vital Signs"}
        label2={"Add Vital Signs"}
        content1={
          <div>
            <div className="flex justify-between items-center">
              <SearchInput onSearch={search} />
              <div className="items-center flex flex-col lg:flex-row">
                <TotalNo totalnumber={vitalSigns?.length} />
                <ReactPagination
                  pageCount={pageCount}
                  handlePageClick={handlePageClick}
                />
              </div>
            </div>
            <Table>
              <Thead>
                <IndexNo>#</IndexNo>
                <Th>Reg. Id</Th>
                <Th>Patient Name</Th>
                <Th>Blood Pressure</Th>
                <Th>Temperature</Th>
                <Th>Pulse</Th>
                <Th>
                  SPO<sub>2</sub>
                </Th>
                <Th>Weight</Th>
                <OptionsTh>Options</OptionsTh>
              </Thead>
              {currentPosts.map((vitalSign, i) => {
                return (
                  <Tbody key={i}>
                    <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                    <Td className="font-bold">
                      {vitalSign?.patients[0]?.registrationId}
                    </Td>
                    <Td>{vitalSign?.patients[0]?.name}</Td>
                    <Td>
                      {vitalSign?.bloodpressure
                        ? vitalSign?.bloodpressure
                        : "---"}
                    </Td>
                    <Td>
                      {vitalSign?.temperature ? vitalSign?.temperature : "---"}
                    </Td>
                    <Td>{vitalSign?.pulse ? vitalSign?.pulse : "---"}</Td>
                    <Td>{vitalSign?.spo ? vitalSign?.spo : "---"}</Td>
                    <Td>{vitalSign?.weight ? vitalSign?.weight : "---"}</Td>
                    <OptionsTd>
                      <EditButton
                        editFunction={`/nurse/edit_vitalSigns?edit=${vitalSign?._id}`}
                      >
                        Edit
                        <RiEdit2Line />
                      </EditButton>
                      <DeleteButton
                        path={"vital_signs"}
                        id={vitalSign?._id}
                        record={getVitalSigns}
                      >
                        Delete
                        <MdDeleteForever />
                      </DeleteButton>
                    </OptionsTd>
                  </Tbody>
                );
              })}
            </Table>
          </div>
        }
        content2={
          <FormLayout formName={"ADD VITAL SIGNS"}>
            <form onSubmit={handleSubmit}>
              <Select
                label="Patient"
                name="patientid"
                type="number"
                onChange={handleChange}
              >
                <option value="">Select Patient</option>
                {patients.map((patient, i) => {
                  return (
                    <option value={patient?._id} key={i}>
                      {patient?.registrationId} - {patient?.name}
                    </option>
                  );
                })}
              </Select>
              <div className="grid lg:grid-cols-2 gap-2">
                <Input
                  label="Blood Pressure"
                  type="text"
                  name="bloodpressure"
                  onChange={handleChange}
                />
                <Input
                  label="Temperature"
                  type="text"
                  name="temperature"
                  onChange={handleChange}
                />
                <Input
                  label="Pulse"
                  type="text"
                  name="pulse"
                  onChange={handleChange}
                />
                <Input
                  label="SPO 2"
                  type="text"
                  name="spo"
                  onChange={handleChange}
                />
                <Input
                  label="Respiration Rate"
                  type="text"
                  name="respirationrate"
                  onChange={handleChange}
                />
                <Input
                  label="Weight"
                  type="text"
                  name="weight"
                  onChange={handleChange}
                />
                <Input
                  label="Height"
                  type="text"
                  name="height"
                  onChange={handleChange}
                />
              </div>

              <Button>
                {loading ? <ButtonPreloader /> : "Add Vital Signs"}
              </Button>
            </form>
          </FormLayout>
        }
      />
    </NurseSidebar>
  );
}

export default VitalSign;
