import React, { useEffect, useState } from "react";
import {
  SearchInput,
  AdminSidebar,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  IndexNo,
} from "../../../components";
import ReactPagination from "../../../components/ReactPagination";
import axios from "../../../services/axios";

function BedAllotment() {
  const [bedallotments, setBedallotments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("/bedallotment").then((res) => {
      setBedallotments(res.data);
    });
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
    <AdminSidebar>
      <div className="bg-gray-100 p-8">
        <h1 className="font-bold mb-4 text-indigo-900 text-lg lg:text-xl">
          BED ALLOTMENT REPORT
        </h1>
        <div className="flex justify-between items-center">
          <SearchInput onSearch={search} />
          <ReactPagination
            pageCount={pageCount}
            handlePageClick={handlePageClick}
          />
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
              </Tbody>
            );
          })}
        </Table>
      </div>
    </AdminSidebar>
  );
}

export default BedAllotment;
