import React, { useEffect, useState, useContext } from "react";
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
} from "../../../components";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import axios from "../../../services/axios";
import ReactPagination from "../../ReactPagination";
import { loginContext } from "../../../pages/context/auth";
import TotalNo from "../../TotalNo";
import { toast } from "react-toastify";
import ButtonPreloader from "../../ButtonPreloader";

function Patients({ role }) {
  const { user } = useContext(loginContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    sex: "",
    dob: "",
    age: "",
    bloodgroup: "",
    tor: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function getPatients() {
    axios
      .get("/patient")
      .then((response) => {
        setPatients(response.data);
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
      .post("/patient", {
        name: formData?.name,
        email: formData?.email,
        address: formData?.address,
        phone: formData?.phone,
        sex: formData?.sex,
        dob: formData?.dob,
        age: formData?.age,
        bloodgroup: formData?.bloodgroup,
        tor: formData?.tor,
      })
      .then((res) => {
        setLoading(false);
        getPatients();
        toast.success(res.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  // READ : READ : READ : READ
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getPatients();
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/patient?q=${data}`).then((response) => {
      setPatients(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = patients.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(patients.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <Tabs
      label1="Patients"
      content1={
        <div>
          <div className="flex justify-between items-center">
            <SearchInput onSearch={search} />
            <div className="items-center flex flex-col lg:flex-row">
              <TotalNo totalnumber={patients?.length} />
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
              <Th>Name</Th>
              <Th>Phone</Th>
              <Th>Sex</Th>
              <Th>Age</Th>
              <Th>Blood Group</Th>
              <Th>Time Of Registration</Th>
              <OptionsTh>Options</OptionsTh>
            </Thead>
            {currentPosts.map((patient, i) => {
              return (
                <Tbody key={i}>
                  <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                  <Td className="font-bold">{patient?.registrationId}</Td>
                  <Td>{patient?.name}</Td>
                  <Td>{patient?.phone}</Td>
                  <Td>{patient?.sex}</Td>
                  <Td>{patient?.age}</Td>
                  <Td>{patient?.bloodgroup}</Td>
                  <Td>{patient?.tor}</Td>
                  <OptionsTd>
                    <EditButton
                      editFunction={`${role}/edit_patient?edit=${patient?._id}`}
                    >
                      Edit
                      <RiEdit2Line />
                    </EditButton>
                    <DeleteButton
                      path={"patient"}
                      id={patient?._id}
                      record={getPatients}
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
      label2="Add Patient"
      content2={
        <FormLayout formName="ADD PATIENT">
          <form onSubmit={handleSubmit}>
            <Input
              label="Name"
              type="text"
              name="name"
              onChange={handleChange}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
            />
            <Input
              label="Address"
              type="text"
              name="address"
              onChange={handleChange}
            />
            <Input
              label="Phone Number"
              type="text"
              name="phone"
              onChange={handleChange}
            />
            <Select label="Sex" name="sex" onChange={handleChange}>
              <option value="">Select Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
            <Input
              label="Date of Birth"
              type="date"
              name="dob"
              onChange={handleChange}
            />
            <Input
              label="Age"
              type="number"
              name="age"
              onChange={handleChange}
            />
            <Select
              label="Blood Group"
              name="bloodgroup"
              onChange={handleChange}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </Select>
            <Input
              label="Time Of Registration"
              type="datetime-local"
              name="tor"
              onChange={handleChange}
            />
            <Button>{loading ? <ButtonPreloader /> : "Add Patient"}</Button>
          </form>
        </FormLayout>
      }
    />
  );
}

export default Patients;
