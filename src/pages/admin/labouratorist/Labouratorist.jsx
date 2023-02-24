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

function Labouratorist() {
  const [labouratorist, setLabouratorist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  function getLabouratorists() {
    axios
      .get("/staff?role=labouratorist")
      .then((response) => {
        setLabouratorist(response.data);
      })
      .catch((response) => {
        toast.error(response.data);
      });
  }
  // READ
  useEffect(() => {
    getLabouratorists();
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/staff?role=labouratorist&q=${data}`).then((response) => {
      setLabouratorist(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = labouratorist.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(labouratorist.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <AdminSidebar>
      <Tabs
        label1="Labouratorists"
        content1={
          <div>
            <div className="flex justify-between items-center">
              <SearchInput onSearch={search} />
              <div className="items-center flex flex-col lg:flex-row">
                <TotalNo totalnumber={labouratorist?.length} />
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
              {currentPosts.map((labouratorist, i) => {
                return (
                  <Tbody key={i}>
                    <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                    <Td>{labouratorist.name}</Td>
                    <Td>{labouratorist.department}</Td>
                    <Td>{labouratorist.phone}</Td>
                    <Td>{labouratorist.email}</Td>
                    <OptionsTd>
                      <EditButton
                        editFunction={`/admin/edit_labouratorist?edit=${labouratorist._id}`}
                      >
                        Edit
                        <RiEdit2Line />
                      </EditButton>
                      <DeleteButton
                        path={"staff"}
                        id={labouratorist?._id}
                        record={getLabouratorists}
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
        label2="Add Labouratorist"
        content2={
          <CreateStaff
            role="labouratorist"
            buttonName="Add Labouratorist"
            formName="ADD LABOURATORIST"
            getStaffs={getLabouratorists}
          />
        }
      />
    </AdminSidebar>
  );
}

export default Labouratorist;
