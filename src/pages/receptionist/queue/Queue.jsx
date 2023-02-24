import React, { useEffect, useState } from "react";
import ReceptionistSidebar from "../../../components/sidebars/ReceptionistSidebar";
import axios from "../../../services/axios";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
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
import { toast } from "react-toastify";
import ReactPagination from "../../../components/ReactPagination";
import ButtonPreloader from "../../../components/ButtonPreloader";

function Queue() {
  const [patients, setPatients] = useState([]);
  const [queue, setQueue] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function getQueue() {
    axios
      .get("/queue")
      .then((response) => {
        setQueue(response.data);
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
      .post("/queue", {
        name: formData?.name,
      })
      .then((res) => {
        setLoading(false);
        getQueue();
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
    getQueue();
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/queue?q=${data}`).then((response) => {
      setQueue(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = queue.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(queue.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <ReceptionistSidebar>
      <Tabs
        label1={"Queue"}
        content1={
          <div>
            <div className="flex justify-between items-center">
              <SearchInput onSearch={search} />
              <div className="items-center flex flex-col lg:flex-row">
                <TotalNo totalnumber={queue?.length} />
                <ReactPagination
                  pageCount={pageCount}
                  handlePageClick={handlePageClick}
                />
              </div>
            </div>
            <Table>
              <Thead>
                <IndexNo>#</IndexNo>
                <Th>Patient Name</Th>
                <OptionsTh>Options</OptionsTh>
              </Thead>
              {currentPosts.map((queue, i) => {
                return (
                  <Tbody key={i}>
                    <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                    <Td>{queue?.name}</Td>
                    <OptionsTd>
                      <EditButton
                        editFunction={`/receptionist/edit_queue?edit=${queue?._id}`}
                      >
                        Edit
                        <RiEdit2Line />
                      </EditButton>
                      <DeleteButton
                        path={"queue"}
                        id={queue?._id}
                        record={getQueue}
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
        label2={"Add Patient to Queue"}
        content2={
          <FormLayout formName={"Queue Patients"}>
            <form onSubmit={handleSubmit}>
              {" "}
              <Select
                label="Patient"
                name="name"
                type="text"
                onChange={handleChange}
              >
                <option value="">Select Patient</option>
                {patients.map((patient, i) => {
                  return (
                    <option value={patient?.name} key={i}>
                      {patient?.name}
                    </option>
                  );
                })}
              </Select>
              <Button>{loading ? <ButtonPreloader /> : "Add  to Queue"}</Button>
            </form>
          </FormLayout>
        }
      />
    </ReceptionistSidebar>
  );
}

export default Queue;
