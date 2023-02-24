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

function Nurses() {
  const [nurses, setNurses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  function getNurses() {
    axios
      .get("/staff?role=nurse")
      .then((response) => {
        setNurses(response.data);
      })
      .catch((response) => {
        toast.error(response.data);
      });
  }

  // READ
  useEffect(() => {
    getNurses();
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/staff?role=nurse&q=${data}`).then((response) => {
      setNurses(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = nurses.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(nurses.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <AdminSidebar>
      <Tabs
        label1="Nurses"
        content1={
          <div>
            <div className="flex justify-between items-center">
              <SearchInput onSearch={search} />
              <div className="items-center flex flex-col lg:flex-row">
                <TotalNo totalnumber={nurses?.length} />
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
              {currentPosts.map((nurse, i) => {
                return (
                  <Tbody key={i}>
                    <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                    <Td>{nurse.name}</Td>
                    <Td>{nurse.department}</Td>
                    <Td>{nurse.phone}</Td>
                    <Td>{nurse.email}</Td>
                    <OptionsTd>
                      <EditButton
                        editFunction={`/admin/edit_nurse?edit=${nurse._id}`}
                      >
                        Edit
                        <RiEdit2Line />
                      </EditButton>
                      <DeleteButton
                        path={"staff"}
                        id={nurse?._id}
                        record={getNurses}
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
        label2="Add Nurse"
        content2={
          <CreateStaff
            role="nurse"
            buttonName="Add Nurse"
            formName="ADD NURSE"
            getStaffs={getNurses}
          />
        }
      />
    </AdminSidebar>
  );
}

export default Nurses;
