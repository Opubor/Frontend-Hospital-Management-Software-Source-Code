import React, { useContext, useEffect, useState } from "react";
import { loginContext } from "../../context/auth";
import {
  SearchInput,
  AdminSidebar,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  IndexNo,
  TotalNo,
} from "../../../components";
import axios from "../../../services/axios";
import ReactPagination from "../../../components/ReactPagination";

function Operation() {
  const { user } = useContext(loginContext);
  const [operations, setOperations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("/report?type=operation").then((res) => {
      setOperations(res.data);
    });
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/report?type=operation&q=${data}`).then((response) => {
      setOperations(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = operations.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(operations.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <AdminSidebar>
      {" "}
      <div className="bg-gray-100 p-8">
        <h1 className="font-bold mb-4 text-indigo-900 text-lg lg:text-xl">
          OPERATION REPORT
        </h1>
        <div className="flex justify-between items-center">
          <SearchInput onSearch={search} />
          <div className="items-center flex flex-col lg:flex-row">
            <TotalNo totalnumber={operations?.length} />
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
            <Th>Operation Name</Th>
            <Th>Surgeon</Th>
            <Th>Date</Th>
            <Th>Outcome Status</Th>
          </Thead>
          {currentPosts.map((operation, i) => {
            return (
              <Tbody key={i}>
                <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                <Td className="font-bold">
                  {operation?.patients[0]?.registrationId}
                </Td>
                <Td>{operation?.patients[0]?.name}</Td>
                <Td>{operation?.description}</Td>
                <Td>{operation?.staffname}</Td>
                <Td>{operation?.date}</Td>
                <Td>{operation?.outcomestatus}</Td>
              </Tbody>
            );
          })}
        </Table>
      </div>
    </AdminSidebar>
  );
}

export default Operation;
