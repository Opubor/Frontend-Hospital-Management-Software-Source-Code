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

function Death() {
  const { user } = useContext(loginContext);
  const [deaths, setDeaths] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("/report?type=death").then((res) => {
      setDeaths(res.data);
    });
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/report?type=death&q=${data}`).then((response) => {
      setDeaths(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = deaths.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(deaths.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <AdminSidebar>
      <div className="bg-gray-100 p-8">
        <h1 className="font-bold mb-4 text-indigo-900 text-lg lg:text-xl">
          DEATH REPORT
        </h1>
        <div className="flex justify-between items-center">
          <SearchInput onSearch={search} />
          <div className="items-center flex flex-col lg:flex-row">
            <TotalNo totalnumber={deaths?.length} />
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
            <Th>Cause</Th>
            <Th>Date</Th>
          </Thead>
          {currentPosts.map((death, i) => {
            return (
              <Tbody key={i}>
                <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                <Td className="font-bold">
                  {death?.patients[0]?.registrationId}
                </Td>
                <Td>{death?.patients[0]?.name}</Td>
                <Td>{death?.description}</Td>
                <Td>{death?.date}</Td>
              </Tbody>
            );
          })}
        </Table>
      </div>
    </AdminSidebar>
  );
}

export default Death;
