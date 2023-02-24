import React, { useContext, useEffect, useState } from "react";
import {
  DeleteButton,
  EditButton,
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

function Appointment() {
  const { user } = useContext(loginContext);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    doctorid: `${user?._id}`,
    patientid: "",
    date: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function getAppointments() {
    axios
      .get("/appointment")
      .then((response) => {
        setAppointments(response.data);
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
      .post("/appointment", {
        doctorid: formData?.doctorid,
        patientid: formData?.patientid,
        date: formData?.date,
      })
      .then((res) => {
        setLoading(false);
        getAppointments();
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
    getAppointments();
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/appointment?q=${data}`).then((response) => {
      setAppointments(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = appointments.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(appointments.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <DoctorSidebar>
      <Tabs
        label1="Appointments"
        label2="Add Appointment"
        content1={
          <div>
            <div className="flex justify-between items-center">
              <SearchInput onSearch={search} />
              <div className="items-center flex flex-col lg:flex-row">
                <TotalNo totalnumber={appointments?.length} />
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
                <Th>Date (yy/mm/dd)</Th>
                <Th>Doctor</Th>
                <OptionsTh>Options</OptionsTh>
              </Thead>
              {currentPosts.map((appointment, i) => {
                return (
                  <Tbody key={i}>
                    <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                    <Td className="font-bold">
                      {appointment?.patients[0]?.registrationId}
                    </Td>
                    <Td>{appointment?.patients[0]?.name}</Td>
                    <Td>{appointment?.date}</Td>
                    <Td>{appointment?.doctor[0]?.name}</Td>
                    {user._id === appointment?.doctorid && (
                      <OptionsTd>
                        <EditButton
                          editFunction={`/doctor/edit_appointment?edit=${appointment?._id}`}
                        >
                          Edit
                          <RiEdit2Line />
                        </EditButton>
                        <DeleteButton
                          path={"appointment"}
                          id={appointment?._id}
                          record={getAppointments}
                        >
                          Delete
                          <MdDeleteForever />
                        </DeleteButton>
                      </OptionsTd>
                    )}
                  </Tbody>
                );
              })}
            </Table>
          </div>
        }
        content2={
          <FormLayout formName="ADD APPOINTMENT">
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="doctorid" onChange={handleChange} />
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
              <Input
                label="Date"
                type="date"
                name="date"
                onChange={handleChange}
              />
              <Button>
                {loading ? <ButtonPreloader /> : "Add Appointment"}
              </Button>
            </form>
          </FormLayout>
        }
      />
    </DoctorSidebar>
  );
}

export default Appointment;
