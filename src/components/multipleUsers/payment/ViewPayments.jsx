import React, { useContext, useEffect, useState } from "react";
import axios from "../../../services/axios";
import ReactPagination from "../../../components/ReactPagination";
import {
  DeleteButton,
  EditButton,
  SearchInput,
  OptionsTd,
  OptionsTh,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  IndexNo,
  TotalNo,
} from "../../../components";
import { loginContext } from "../../../pages/context/auth";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";

function ViewPayments() {
  const { user } = useContext(loginContext);

  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  function getPayments() {
    axios
      .get("/payments")
      .then((response) => {
        setPayments(response.data);
      })
      .catch((response) => {
        toast.error(response.data);
      });
  }

  useEffect(() => {
    getPayments();
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/payments?q=${data}`).then((response) => {
      setPayments(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = payments.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(payments.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <div className="p-8 bg-gray-100">
      <div>
        <div className="flex justify-between items-center">
          <SearchInput onSearch={search} />
          <div className="items-center flex flex-col lg:flex-row">
            <TotalNo totalnumber={payments?.length} />
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
            <Th>Patient Name</Th>
            <Th>Date</Th>
            <Th>Amount</Th>
            <Th>Mode of Payment</Th>
            <Th>Purpose</Th>
            {user?.role !== "admin" && <OptionsTh>Options</OptionsTh>}
          </Thead>
          {currentPosts.map((payment, i) => {
            return (
              <Tbody key={i}>
                <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                <Td className="font-bold">
                  {payment?.patients[0]?.registrationId}
                </Td>
                <Td>{payment?.name}</Td>
                <Td>{payment?.date}</Td>
                <Td>
                  {
                    <span className="font-bold">
                      &#8358;
                      {payment?.amount}
                    </span>
                  }
                </Td>
                <Td>{payment?.modeofpayment}</Td>
                <Td>{payment?.purpose}</Td>
                {user?.role !== "admin" && (
                  <OptionsTd>
                    <EditButton
                      editFunction={`/accountant/edit_payment?edit=${payment?._id}`}
                    >
                      Edit
                      <RiEdit2Line />
                    </EditButton>
                    <DeleteButton
                      path={"payments"}
                      id={payment?._id}
                      record={getPayments}
                    >
                      Delete
                      <MdDeleteForever />
                    </DeleteButton>
                  </OptionsTd>
                )}
              </Tbody>
            );
          })}
        </Table>
      </div>
    </div>
  );
}

export default ViewPayments;
