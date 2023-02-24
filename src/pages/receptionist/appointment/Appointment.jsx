import React, { useEffect, useState } from "react";
import axios from "../../../services/axios";
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
import ReactPagination from "../../../components/ReactPagination";
import ReceptionistSidebar from "../../../components/sidebars/ReceptionistSidebar";

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("/appointment").then((res) => {
      setAppointments(res.data);
    });
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/appointment?q=${data}`).then((response) => {
      setAppointments(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = appointments.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(appointments.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <ReceptionistSidebar>
      <div className="bg-gray-100 p-8">
        <div className="flex justify-between items-center">
          <SearchInput onSearch={search} />
          <div className="items-center flex flex-col lg:flex-row">
            <TotalNo totalnumber={appointments?.length} />
            <ReactPagination
              pageCount={pageCount}
              handlePageClick={handlePageClick}
            />
          </div>
        </div>
        <Table>
          <Thead>
            <IndexNo>#</IndexNo>
            <Th>Patient</Th>
            <Th>Date (yy/mm/dd)</Th>
            <Th>Doctor</Th>
          </Thead>
          {currentPosts.map((appointment, i) => {
            return (
              <Tbody key={i}>
                <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                <Td>{appointment?.patients[0]?.name}</Td>
                <Td>{appointment?.date}</Td>
                <Td>{appointment?.doctor[0]?.name}</Td>
              </Tbody>
            );
          })}
        </Table>
      </div>
    </ReceptionistSidebar>
  );
}

export default Appointment;
