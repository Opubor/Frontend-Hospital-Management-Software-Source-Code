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
} from "../../../components";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { loginContext } from "../../../pages/context/auth";
import axios from "../../../services/axios";
import ReactPagination from "../../../components/ReactPagination";
import TotalNo from "../../TotalNo";
import { toast } from "react-toastify";
import ButtonPreloader from "../../ButtonPreloader";

function Operation({ role }) {
  const { user } = useContext(loginContext);
  const [patients, setPatients] = useState([]);
  const [operations, setOperations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    staffname: `${user?.name}`,
    type: "operation",
    patientid: "",
    description: "",
    date: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function getOperation() {
    axios
      .get("/report?type=operation")
      .then((response) => {
        setOperations(response.data);
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
      .post("/report", {
        type: formData?.type,
        staffname: formData?.staffname,
        patientid: formData?.patientid,
        description: formData?.description,
        date: formData?.date,
      })
      .then((res) => {
        setLoading(false);
        getOperation();
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
    getOperation();
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/report?type=operation&q=${data}`).then((response) => {
      setOperations(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = operations.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(operations.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <Tabs
      label1="Operations"
      label2="Add Operation"
      content1={
        <div>
          <div className="flex justify-between items-center">
            <SearchInput onSearch={search} />
            <div className="items-center flex flex-col lg:flex-row">
              <TotalNo totalnumber={operations?.length} />
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
              <Th>Operation Name</Th>
              <Th>Surgeon</Th>
              <Th>Date</Th>
              <Th>Outcome Status</Th>
              {user?.role !== "admin" && <OptionsTh>Options</OptionsTh>}
            </Thead>
            {currentPosts.map((operation, i) => {
              return (
                <Tbody key={i}>
                  <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                  <Td className="font-bold">
                    {operation?.patients[0]?.registrationId}
                  </Td>
                  <Td>{operation?.patients[0]?.name}</Td>
                  <Td>{operation?.description}</Td>
                  <Td>{operation?.staffname}</Td>
                  <Td>{operation?.date}</Td>
                  <Td>{operation?.outcomestatus}</Td>
                  {user?.role !== "admin" && (
                    <OptionsTd>
                      <EditButton
                        editFunction={`${role}/edit_operation?edit=${operation?._id}`}
                      >
                        Edit
                        <RiEdit2Line />
                      </EditButton>
                      <DeleteButton
                        path={"report"}
                        id={operation?._id}
                        record={getOperation}
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
        <FormLayout formName="ADD OPERATION">
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="type" onChange={handleChange} />
            <input type="hidden" name="staffname" onChange={handleChange} />
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
              label="Operation Type"
              type="text"
              name="description"
              onChange={handleChange}
            />
            <Input
              label="Date"
              type="date"
              name="date"
              onChange={handleChange}
            />
            {/* <Select label="Outcome Status">
                <option value="">Select Outcome</option>
                <option value="">Successful</option>
                <option value="">Failed</option>
              </Select> */}
            <Button>{loading ? <ButtonPreloader /> : "Add Operation"}</Button>
          </form>
        </FormLayout>
      }
    />
  );
}

export default Operation;
