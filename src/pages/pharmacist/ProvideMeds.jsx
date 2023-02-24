import React, { useContext, useEffect, useState } from "react";
import {
  DeleteButton,
  EditButton,
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
  TotalNo,
} from "../../components";
import ReactPagination from "../../components/ReactPagination";
import axios from "../../services/axios";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { loginContext } from "../context/auth";
import PharmacistSidebar from "../../components/sidebars/PharmacistSidebar";

function ProvideMeds() {
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
    <PharmacistSidebar>
      <div className="p-8 bg-gray-100">
        <div className="flex justify-between items-center">
          <SearchInput onSearch={search} />
          <div className="items-center flex flex-col lg:flex-row">
            <TotalNo totalnumber={medications?.length} />
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
            <Th>Date</Th>
            <Th>Drugs Amount</Th>
            <Th>Doctor</Th>
            <OptionsTh>Options</OptionsTh>
          </Thead>
          {currentPosts.map((prescription, i) => {
            return (
              <Tbody key={i}>
                <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                <Td>{prescription?.patients[0]?.name}</Td>
                <Td>{prescription?.date}</Td>
                <Td>&#8358;{prescription?.drugamount}</Td>
                <Td>{prescription?.doctor[0]?.name}</Td>
                <OptionsTd>
                  <ViewButton
                    style={"bg-green-600 hover:bg-green-900"}
                    viewFunction={`/pharmacist/add_amount?edit=${prescription?._id}`}
                  >
                    {prescription?.drugamount ? (
                      "Update Amount"
                    ) : (
                      <>
                        <RiEdit2Line />
                        Add Amount
                      </>
                    )}
                  </ViewButton>
                  <ViewButton
                    style={"bg-indigo-800 hover:bg-indigo-400"}
                    viewFunction={`/pharmacist/view_medications?edit=${prescription?._id}`}
                  >
                    <RiEdit2Line />
                    View Medication
                  </ViewButton>
                  {user?._id === prescription?.doctorid && (
                    <>
                      <EditButton
                        editFunction={`/doctor/edit_prescription?edit=${prescription?._id}`}
                      >
                        Edit
                        <RiEdit2Line />
                      </EditButton>
                      <DeleteButton
                        deleteFunction={() => {
                          handleDelete(prescription?._id);
                        }}
                      >
                        Delete
                        <MdDeleteForever />
                      </DeleteButton>
                    </>
                  )}
                </OptionsTd>
              </Tbody>
            );
          })}
        </Table>
      </div>
    </PharmacistSidebar>
  );
}

export default ProvideMeds;
