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
  Textarea,
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

function Birth({ role }) {
  const { user } = useContext(loginContext);
  const [patients, setPatients] = useState([]);
  const [births, setBirths] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    staffname: `${user?.name}`,
    type: "birth",
    patientid: "",
    description: "",
    date: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function getBirths() {
    axios
      .get("/report?type=birth")
      .then((response) => {
        setBirths(response.data);
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
        getBirths();
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
    getBirths();
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/report?type=birth&q=${data}`).then((response) => {
      setBirths(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = births.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(births.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <Tabs
      label1="Births"
      label2="Add Birth"
      content1={
        <div>
          <div className="flex justify-between items-center">
            <SearchInput onSearch={search} />
            <div className="items-center flex flex-col lg:flex-row">
              <TotalNo totalnumber={births?.length} />
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
              <Th>Birth Type</Th>
              <Th>Doctor</Th>
              <Th>Date</Th>
              {user?.role !== "admin" && <OptionsTh>Options</OptionsTh>}
            </Thead>
            {currentPosts.map((birth, i) => {
              return (
                <Tbody key={i}>
                  <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                  <Td className="font-bold">
                    {birth?.patients[0]?.registrationId}
                  </Td>
                  <Td>{birth?.patients[0]?.name}</Td>
                  <Td>{birth?.description}</Td>
                  <Td>{birth?.staffname}</Td>
                  <Td>{birth?.date}</Td>
                  {user?.role !== "admin" && (
                    <OptionsTd>
                      <EditButton
                        editFunction={`${role}/edit_birth?edit=${birth?._id}`}
                      >
                        Edit
                        <RiEdit2Line />
                      </EditButton>
                      <DeleteButton
                        path={"report"}
                        id={birth?._id}
                        record={getBirths}
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
        <FormLayout formName="ADD BIRTH">
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
            <Select
              label="Birth Type"
              name="description"
              type="text"
              onChange={handleChange}
            >
              <option value="">Select Birth Type</option>
              <option value="Natural Delivery">Natural Delivery</option>
              <option value="Caesarean Delivery">Caesarean Delivery</option>
              <option value="Water Birth">Water Birth</option>
              <option value="Hypnobirthing">Hypnobirthing</option>
            </Select>
            <Input
              label="Date"
              type="date"
              name="date"
              onChange={handleChange}
            />
            <Button>{loading ? <ButtonPreloader /> : "Add Birth"}</Button>
          </form>
        </FormLayout>
      }
    />
  );
}

export default Birth;
