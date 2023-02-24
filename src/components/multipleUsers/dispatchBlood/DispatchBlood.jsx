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
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { loginContext } from "../../../pages/context/auth";
import axios from "../../../services/axios";
import ReactPagination from "../../../components/ReactPagination";
import TotalNo from "../../TotalNo";
import { toast } from "react-toastify";
import ButtonPreloader from "../../ButtonPreloader";

function DispatchBlood({ role }) {
  const { user } = useContext(loginContext);
  const [patients, setPatients] = useState([]);
  const [dispatchblood, setDispatchblood] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    staffname: `${user?.name}`,
    patientid: "",
    bloodgroup: "",
    bags: "",
    charges: "",
    date: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function getDispatchBlood() {
    axios
      .get("/dischargeblood")
      .then((response) => {
        setDispatchblood(response.data);
      })
      .catch((response) => {
        toast.error(response.data);
      });
  }

  // create
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/dischargeblood", {
        patientid: formData?.patientid,
        bloodgroup: formData?.bloodgroup,
        bags: formData?.bags,
        charges: formData?.charges,
        date: formData?.date,
        staffname: formData?.staffname,
      })
      .then((res) => {
        setLoading(false);
        getDispatchBlood();
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
    getDispatchBlood();
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/dischargeblood?q=${data}`).then((response) => {
      setDispatchblood(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dispatchblood.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(dispatchblood.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <Tabs
      label1="Dispatched Blood"
      label2="Add Dispatched Blood"
      content1={
        <div>
          <div className="flex justify-between items-center">
            <SearchInput onSearch={search} />
            <div className="items-center flex flex-col lg:flex-row">
              <TotalNo totalnumber={dispatchblood?.length} />
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
              <Th>Blood Group</Th>
              <Th>No. Of Bags</Th>
              <Th>Charges</Th>
              <Th>Date</Th>
              <OptionsTh>Options</OptionsTh>
            </Thead>
            {currentPosts.map((dispatch, i) => {
              return (
                <Tbody key={i}>
                  <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                  <Td className="font-bold">
                    {dispatch?.patients[0]?.registrationId}
                  </Td>
                  <Td>{dispatch?.patients[0]?.name}</Td>
                  <Td>{dispatch?.bloodgroup}</Td>
                  <Td>{dispatch?.bags}</Td>
                  <Td>
                    <span>&#8358;</span>
                    {dispatch?.charges}
                  </Td>
                  <Td>{dispatch?.date}</Td>
                  <OptionsTd>
                    <EditButton
                      editFunction={`${role}/edit_dispatchedblood?edit=${dispatch?._id}`}
                    >
                      Edit
                      <RiEdit2Line />
                    </EditButton>
                    <DeleteButton
                      path={"dischargeblood"}
                      id={dispatch?._id}
                      record={getDispatchBlood}
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
        <FormLayout formName="ADD DISPATCHED BLOOD">
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
            <Select
              label="Blood Group"
              type="text"
              name="bloodgroup"
              onChange={handleChange}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </Select>
            <Input
              label="No. Of Bags"
              type="number"
              name="bags"
              onChange={handleChange}
            />
            <Input
              label="Charges"
              type="text"
              name="charges"
              onChange={handleChange}
            />
            <Input
              label="Date"
              type="date"
              name="date"
              onChange={handleChange}
            />
            <input type="hidden" name="staffname" onChange={handleChange} />
            <Button>
              {loading ? <ButtonPreloader /> : "Add Dispatched Blood"}
            </Button>
          </form>
        </FormLayout>
      }
    />
  );
}

export default DispatchBlood;
