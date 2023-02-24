import React, { useContext, useEffect, useState } from "react";
import {
  DeleteButton,
  EditButton,
  ViewButton,
  Button,
  Input,
  SearchInput,
  Select,
  OptionsTd,
  OptionsTh,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  FormLayout,
  Tabs,
  Textarea,
  IndexNo,
  TotalNo,
} from "../../../components";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { loginContext } from "../../context/auth";
import axios from "../../../services/axios";
import ReactPagination from "../../../components/ReactPagination";
import { toast } from "react-toastify";
import ButtonPreloader from "../../../components/ButtonPreloader";

function Prescription() {
  const { user } = useContext(loginContext);
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // CREATE
  const [formData, setFormData] = useState({
    doctorid: `${user?._id}`,
    patientid: "",
    casehistory: "",
    description: "",
    medication: "",
    date: "",
    drugamount: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function getPrescriptions() {
    axios
      .get("/prescription")
      .then((response) => {
        setPrescriptions(response.data);
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
      .post("/prescription", {
        doctorid: formData?.doctorid,
        patientid: formData?.patientid,
        casehistory: formData?.casehistory,
        description: formData?.description,
        medication: formData?.medication,
        date: formData?.date,
        drugamount: formData?.drugamount,
      })
      .then((res) => {
        window.location.reload(true);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data);
        setLoading(false);
      });
  };

  // READ
  useEffect(() => {
    axios.get("/patient").then((res) => {
      setPatients(res.data);
    });
    getPrescriptions();
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/prescription?q=${data}`).then((response) => {
      setPrescriptions(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = prescriptions.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(prescriptions.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <DoctorSidebar>
      <Tabs
        label1="Prescriptions"
        label2="Add Prescription"
        content1={
          <div>
            <div className="flex justify-between items-center">
              <SearchInput onSearch={search} />
              <div className="items-center flex flex-col lg:flex-row">
                <TotalNo totalnumber={prescriptions?.length} />
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
                <Th>Patient</Th>
                <Th>Date</Th>
                <Th>Doctor</Th>
                <OptionsTh>Options</OptionsTh>
              </Thead>
              {currentPosts.map((prescription, i) => {
                return (
                  <Tbody key={i}>
                    <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                    <Td className="font-bold">
                      {prescription?.patients[0]?.registrationId}
                    </Td>
                    <Td>{prescription?.patients[0]?.name}</Td>
                    <Td>{prescription?.date}</Td>
                    <Td>{prescription?.doctor[0]?.name}</Td>
                    <OptionsTd>
                      <ViewButton
                        viewFunction={`/doctor/view_medications?edit=${prescription?._id}`}
                      >
                        <RiEdit2Line />
                        View
                      </ViewButton>
                      {user?._id === prescription?.doctorid && (
                        <>
                          <EditButton
                            editFunction={`/doctor/edit_prescription?edit=${prescription?._id}`}
                          >
                            Edit
                            <RiEdit2Line />
                          </EditButton>
                          <DeleteButton
                            path={"prescription"}
                            id={prescription?._id}
                            record={getPrescriptions}
                          >
                            Delete
                            <MdDeleteForever />
                          </DeleteButton>
                        </>
                      )}
                    </OptionsTd>
                  </Tbody>
                );
              })}
            </Table>
          </div>
        }
        content2={
          <FormLayout formName="ADD PRESCRIPTION">
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="doctorid" onChange={handleChange} />
              <Select
                label="Patient"
                name="patientid"
                type="number"
                onChange={handleChange}
              >
                <option>Select Patient</option>
                {patients.map((patient, i) => {
                  return (
                    <option value={patient?._id} key={i}>
                      {patient?.registrationId} - {patient?.name}
                    </option>
                  );
                })}
              </Select>
              <Textarea
                label="Case History"
                name="casehistory"
                type="text"
                onChange={handleChange}
              />
              <Textarea
                label="Ailment/Description"
                name="description"
                type="text"
                onChange={handleChange}
              />
              <Textarea
                label="Medication"
                name="medication"
                type="text"
                onChange={handleChange}
              />
              <Input
                label="Amount"
                name="drugamount"
                type="text"
                onChange={handleChange}
              />
              <Input
                label="Date"
                type="date"
                name="date"
                onChange={handleChange}
              />
              <Button>
                {loading ? <ButtonPreloader /> : "Add Prescription"}
              </Button>
            </form>
          </FormLayout>
        }
      />
    </DoctorSidebar>
  );
}

export default Prescription;
