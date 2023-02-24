import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  DeleteButton,
  AdminSidebar,
  OptionsTd,
  OptionsTh,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
} from "../components";
import { MdDeleteForever } from "react-icons/md";
import axios from "../services/axios";
import ReactPagination from "./ReactPagination";

function MoshPag() {
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // READ
  useEffect(() => {
    axios.get("/department").then((res) => {
      setDepartments(res.data);
    });
  }, []);

  // Get Current Posts
  const postsPerPage = 3;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = departments.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(departments.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };
  // DELETE
  const handleDelete = (id) => {
    axios.delete(`/department/${id}`);
    window.location.reload(true);
  };
  return (
    <AdminSidebar>
      <ReactPagination
        pageCount={pageCount}
        handlePageClick={handlePageClick}
      />
      <Table>
        <Thead>
          <Th>#</Th>
          <Th>Name</Th>
          <Th>Description</Th>
          <OptionsTh>Options</OptionsTh>
        </Thead>
        {currentPosts.map((department, i) => {
          return (
            <Tbody key={i}>
              <Td>{i + 1 * (currentPage * postsPerPage - 2)}</Td>
              <Td>{department.name}</Td>
              <Td>{department.description}</Td>
              <OptionsTd>
                <DeleteButton
                  deleteFunction={() => {
                    handleDelete(department._id);
                  }}
                >
                  Delete
                  <MdDeleteForever />
                </DeleteButton>
              </OptionsTd>
            </Tbody>
          );
        })}
      </Table>
    </AdminSidebar>
  );
}

export default MoshPag;
