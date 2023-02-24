import React, { useEffect, useState } from "react";
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
import { toast } from "react-toastify";

function Receptionist() {
  const [receptionist, setReceptionist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  function getReceptionist() {
    axios
      .get("/staff?role=receptionist")
      .then((response) => {
        setReceptionist(response.data);
      })
      .catch((response) => {
        toast.error(response.data);
      });
  }

  // READ
  useEffect(() => {
    getReceptionist();
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/staff?role=receptionist&q=${data}`).then((response) => {
      setReceptionist(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = receptionist.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(receptionist.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <AdminSidebar>
      <Tabs
        label1="Receptionists"
        content1={
          <div>
            <div className="flex justify-between items-center">
              <SearchInput onSearch={search} />
              <div className="items-center flex flex-col lg:flex-row">
                <TotalNo totalnumber={receptionist?.length} />
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
              {currentPosts.map((receptionist, i) => {
                return (
                  <Tbody key={i}>
                    <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                    <Td>{receptionist.name}</Td>
                    <Td>{receptionist.department}</Td>
                    <Td>{receptionist.phone}</Td>
                    <Td>{receptionist.email}</Td>
                    <OptionsTd>
                      <EditButton
                        editFunction={`/admin/edit_receptionist?edit=${receptionist._id}`}
                      >
                        Edit
                        <RiEdit2Line />
                      </EditButton>
                      <DeleteButton
                        path={"staff"}
                        id={receptionist?._id}
                        record={getReceptionist}
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
        label2="Add Receptionist"
        content2={
          <CreateStaff
            role="receptionist"
            buttonName="Add Receptionist"
            formName="ADD RECEPTIONIST"
            getStaffs={getReceptionist}
          />
        }
      />
    </AdminSidebar>
  );
}

export default Receptionist;
