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
} from "../../../components";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { loginContext } from "../../../pages/context/auth";
import axios from "../../../services/axios";
import ReactPagination from "../../../components/ReactPagination";
import TotalNo from "../../TotalNo";
import { toast } from "react-toastify";
import ButtonPreloader from "../../ButtonPreloader";

function BedAllotment({ role }) {
  const { user } = useContext(loginContext);
  const [patients, setPatients] = useState([]);
  const [bedallotments, setBedallotments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    staffname: `${user?.name}`,
    patientid: "",
    patientstatus: "",
    bedtype: "",
    bednumber: "",
    allotmentdate: "",
    dischargedate: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function getAllotments() {
    axios
      .get("/bedallotment")
      .then((response) => {
        setBedallotments(response.data);
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
      .post("/bedallotment", {
        patientid: formData?.patientid,
        patientstatus: formData?.patientstatus,
        bedtype: formData?.bedtype,
        bednumber: formData?.bednumber,
        allotmentdate: formData?.allotmentdate,
        dischargedate: formData?.dischargedate,
        staffname: formData?.staffname,
      })
      .then((res) => {
        setLoading(false);
        getAllotments();
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
    axios.get("/bed").then((res) => {
      setBeds(res.data);
    });
    getAllotments();
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/bedallotment?q=${data}`).then((response) => {
      setBedallotments(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = bedallotments.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(bedallotments.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <Tabs
      label1="Bed Allotment"
      label2="Add Bed Allotment"
      content1={
        <div>
          <div className="flex justify-between items-center">
            <SearchInput onSearch={search} />
            <div className="items-center flex flex-col lg:flex-row">
              <TotalNo totalnumber={bedallotments?.length} />
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
              <Th>Bed Type</Th>
              <Th>Bed Number</Th>
              <Th>Patient Status</Th>
              <Th>Staff</Th>
              <Th>Allotment Date</Th>
              <Th>Discharge Date</Th>
              <OptionsTh>Options</OptionsTh>
            </Thead>
            {currentPosts.map((bedallotment, i) => {
              return (
                <Tbody key={i}>
                  <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                  <Td className="font-bold">
                    {bedallotment?.patients[0]?.registrationId}
                  </Td>
                  <Td>{bedallotment?.patients[0]?.name}</Td>
                  <Td>{bedallotment?.bedtype}</Td>
                  <Td>{bedallotment?.bednumber}</Td>
                  <Td>{bedallotment?.patientstatus}</Td>
                  <Td>{bedallotment?.staffname}</Td>
                  <Td>{bedallotment?.allotmentdate}</Td>
                  <Td>{bedallotment?.dischargedate}</Td>
                  <OptionsTd>
                    <EditButton
                      editFunction={`${role}/edit_bedAllotment?edit=${bedallotment?._id}`}
                    >
                      Edit
                      <RiEdit2Line />
                    </EditButton>
                    <DeleteButton
                      path={"bedallotment"}
                      id={bedallotment?._id}
                      record={getAllotments}
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
        <FormLayout formName="BED ALLOTMENT">
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
              label="Patient Status"
              name="patientstatus"
              type="text"
              onChange={handleChange}
            >
              <option value="">Select Patient Status</option>
              <option value="Admitted">Admitted</option>
              <option value="Under Treatment">Under Treatment</option>
              <option value="Operated">Operated</option>
              <option value="Recovery">Recovery</option>
              <option value="Cured">Cured</option>
              <option value="Discharged">Discharged</option>
              <option value="Death">Death</option>
            </Select>
            <Select
              label="Bed Type"
              name="bedtype"
              type="text"
              onChange={handleChange}
            >
              <option value="">Select Bed type</option>
              {beds.map((bed, i) => {
                return (
                  <option value={bed?.type} key={i}>
                    {bed?.type}
                  </option>
                );
              })}
            </Select>
            <Input
              label="Bed Number"
              name="bednumber"
              type="text"
              onChange={handleChange}
            />
            <Input
              label="Allotment Date"
              type="datetime-local"
              name="allotmentdate"
              onChange={handleChange}
            />
            <Input
              label="Discharge Date"
              type="datetime-local"
              name="dischargedate"
              onChange={handleChange}
            />
            <input type="hidden" name="staffname" onChange={handleChange} />
            <Button>
              {loading ? <ButtonPreloader /> : "Add Bed Allotment"}
            </Button>
          </form>
        </FormLayout>
      }
    />
  );
}

export default BedAllotment;
