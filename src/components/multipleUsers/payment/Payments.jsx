import React, { useContext, useEffect, useState } from "react";
import {
  ViewButton,
  SearchInput,
  OptionsTd,
  OptionsTh,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  IndexNo,
} from "../../../components";
import axios from "../../../services/axios";
import { RiEdit2Line } from "react-icons/ri";
import { loginContext } from "../../../pages/context/auth";
import ReactPagination from "../../ReactPagination";

function Payments() {
  const [medications, setMedications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useContext(loginContext);

  // READ
  useEffect(() => {
    axios.get("/prescription").then((res) => {
      setMedications(res.data);
    });
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/prescription?q=${data}`).then((response) => {
      setMedications(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = medications.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(medications.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <div className="p-8 bg-gray-100">
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
          <Th>Date</Th>
          <Th>Doctor</Th>
          <Th>Amount(&#8358;)</Th>
          <Th>Payment Status</Th>
          {user?.role !== "admin" && <OptionsTh>Options</OptionsTh>}
        </Thead>
        {currentPosts.map((prescription, i) => {
          return (
            <Tbody key={i}>
              <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
              <Td className="font-bold">
                {prescription?.patients[0]?.registrationId}
              </Td>
              <Td>{prescription?.patients[0]?.name}</Td>
              <Td>{prescription?.paymentdate}</Td>
              <Td>{prescription?.doctor[0]?.name}</Td>
              <Td>
                <span className="font-bold">
                  &#8358;
                  {prescription?.drugamount}
                </span>
              </Td>
              <Td>
                {prescription.paymentstatus === "Paid" ? (
                  <p className="font-bold text-base bg-green-700 text-center px-2 rounded w-24 text-white">
                    {prescription?.paymentstatus}
                  </p>
                ) : (
                  <p className="font-bold text-base bg-red-700 text-center px-2 rounded w-24 text-white">
                    Unpaid
                  </p>
                )}
              </Td>
              {user?.role !== "admin" && (
                <OptionsTd>
                  <ViewButton
                    style={"bg-green-800 hover:bg-green-600"}
                    viewFunction={`/accountant/invoice?edit=${prescription?._id}`}
                  >
                    <RiEdit2Line />
                    Take Payment
                  </ViewButton>
                </OptionsTd>
              )}
            </Tbody>
          );
        })}
      </Table>
    </div>
  );
}

export default Payments;
