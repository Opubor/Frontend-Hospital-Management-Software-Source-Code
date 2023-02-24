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

function Death({ role }) {
  const { user } = useContext(loginContext);
  const [patients, setPatients] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    staffname: `${user?.name}`,
    type: "death",
    patientid: "",
    description: "",
    date: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function getDeaths() {
    axios
      .get("/report?type=death")
      .then((response) => {
        setDeaths(response.data);
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
        getDeaths();
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
    getDeaths();
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/report?type=death&q=${data}`).then((response) => {
      setDeaths(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = deaths.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(deaths.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <Tabs
      label1="Deaths"
      label2="Add Death"
      content1={
        <div>
          <div className="flex justify-between items-center">
            <SearchInput onSearch={search} />
            <div className="items-center flex flex-col lg:flex-row">
              <TotalNo totalnumber={deaths?.length} />
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
              <Th>Cause</Th>
              <Th>Date</Th>
              {user?.role !== "admin" && <OptionsTh>Options</OptionsTh>}
            </Thead>
            {currentPosts.map((death, i) => {
              return (
                <Tbody key={i}>
                  <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                  <Td className="font-bold">
                    {death?.patients[0]?.registrationId}
                  </Td>
                  <Td>{death?.patients[0]?.name}</Td>
                  <Td>{death?.description}</Td>
                  <Td>{death?.date}</Td>
                  {user?.role !== "admin" && (
                    <OptionsTd>
                      <EditButton
                        editFunction={`${role}/edit_death?edit=${death?._id}`}
                      >
                        Edit
                        <RiEdit2Line />
                      </EditButton>
                      <DeleteButton
                        path={"report"}
                        id={death?._id}
                        record={getDeaths}
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
        <FormLayout formName="ADD DEATH">
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
              label="Cause"
              name="description"
              type="text"
              onChange={handleChange}
            />
            <Input
              label="Date"
              type="datetime-local"
              name="date"
              onChange={handleChange}
            />
            <Button>{loading ? <ButtonPreloader /> : "Add Death"}</Button>
          </form>
        </FormLayout>
      }
    />
  );
}

export default Death;
