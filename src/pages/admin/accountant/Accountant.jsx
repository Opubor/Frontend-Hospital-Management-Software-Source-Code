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

function Accountant() {
  const [accountants, setAccountants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  function getAccountants() {
    axios
      .get("/staff?role=accountant")
      .then((response) => {
        setAccountants(response.data);
      })
      .catch((response) => {
        toast.error(response.data);
      });
  }

  // READ
  useEffect(() => {
    getAccountants();
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/staff?role=accountant&q=${data}`).then((response) => {
      setAccountants(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = accountants.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(accountants.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <AdminSidebar>
      <Tabs
        label1="Accountants"
        content1={
          <div>
            <div className="flex justify-between items-center">
              <SearchInput onSearch={search} />
              <div className="items-center flex flex-col lg:flex-row">
                <TotalNo totalnumber={accountants?.length} />
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
              {currentPosts.map((accountant, i) => {
                return (
                  <Tbody key={i}>
                    <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                    <Td>{accountant?.name}</Td>
                    <Td>{accountant?.department}</Td>
                    <Td>{accountant?.phone}</Td>
                    <Td>{accountant?.email}</Td>
                    <OptionsTd>
                      <EditButton
                        editFunction={`/admin/edit_accountant?edit=${accountant?._id}`}
                      >
                        Edit
                        <RiEdit2Line />
                      </EditButton>
                      <DeleteButton
                        path={"staff"}
                        id={accountant?._id}
                        record={getAccountants}
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
        label2="Add Accountant"
        content2={
          <CreateStaff
            role="accountant"
            buttonName="Add Accountant"
            formName="ADD ACCOUNTANT"
            getStaffs={getAccountants}
          />
        }
      />
    </AdminSidebar>
  );
}

export default Accountant;
