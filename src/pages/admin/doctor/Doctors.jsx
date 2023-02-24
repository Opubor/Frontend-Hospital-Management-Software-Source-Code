import React, { useContext, useEffect, useState } from "react";
import {
  DeleteButton,
  EditButton,
  SearchInput,
  AdminSidebar,
  OptionsTd,
  OptionsTh,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tabs,
  TotalNo,
} from "../../../components";
import axios from "../../../services/axios";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import CreateStaff from "../CreateStaff";
import ReactPagination from "../../../components/ReactPagination";
import { loginContext } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useContext(loginContext);
  const admin = user?.role === "admin";
  const navigate = useNavigate();

  function getDoctors() {
    axios
      .get("/staff?role=doctor")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((response) => {
        toast.error(response.data);
      });
  }

  // READ
  useEffect(() => {
    getDoctors();
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/staff?role=doctor&q=${data}`).then((response) => {
      setDoctors(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = doctors.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(doctors.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };
  return (
    <AdminSidebar>
      <Tabs
        label1="Doctors"
        content1={
          <div>
            <div className="flex justify-between items-center">
              <SearchInput onSearch={search} />
              <div className="items-center flex flex-col lg:flex-row">
                <TotalNo totalnumber={doctors?.length} />
                <ReactPagination
                  pageCount={pageCount}
                  handlePageClick={handlePageClick}
                />
              </div>
            </div>
            <Table>
              <Thead>
                <Th>#</Th>
                <Th>Name</Th>
                <Th>Department</Th>
                <Th>Phone</Th>
                <Th>Email</Th>
                <OptionsTh>Options</OptionsTh>
              </Thead>
              {currentPosts.map((doctor, i) => {
                return (
                  <Tbody key={i}>
                    <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                    <Td>{doctor.name}</Td>
                    <Td>{doctor.department}</Td>
                    <Td>{doctor.phone}</Td>
                    <Td>{doctor.email}</Td>
                    <OptionsTd>
                      <EditButton
                        editFunction={`/admin/edit_doctor?edit=${doctor._id}`}
                      >
                        Edit
                        <RiEdit2Line />
                      </EditButton>
                      <DeleteButton
                        path={"staff"}
                        id={doctor?._id}
                        record={getDoctors}
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
        label2="Add Doctor"
        content2={
          <CreateStaff
            role="doctor"
            buttonName="Add Doctor"
            formName="ADD DOCTOR"
            getStaffs={getDoctors}
          />
        }
      />
    </AdminSidebar>
  );
}

export default Doctors;
