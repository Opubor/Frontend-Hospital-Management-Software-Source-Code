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

function Pharmacist() {
  const [Pharmacists, setPharmacists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  function getPharmacists() {
    axios
      .get("/staff?role=pharmacist")
      .then((response) => {
        setPharmacists(response.data);
      })
      .catch((response) => {
        toast.error(response.data);
      });
  }

  // READ
  useEffect(() => {
    getPharmacists();
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/staff?role=pharmacist&q=${data}`).then((response) => {
      setPharmacists(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Pharmacists.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(Pharmacists.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <AdminSidebar>
      <Tabs
        label1="Pharmacists"
        content1={
          <div>
            <div className="flex justify-between items-center">
              <SearchInput onSearch={search} />
              <div className="items-center flex flex-col lg:flex-row">
                <TotalNo totalnumber={Pharmacists?.length} />
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
              {currentPosts.map((pharmacist, i) => {
                return (
                  <Tbody key={i}>
                    <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                    <Td>{pharmacist.name}</Td>
                    <Td>{pharmacist.department}</Td>
                    <Td>{pharmacist.phone}</Td>
                    <Td>{pharmacist.email}</Td>
                    <OptionsTd>
                      <EditButton
                        editFunction={`/admin/edit_pharmacist?edit=${pharmacist._id}`}
                      >
                        Edit
                        <RiEdit2Line />
                      </EditButton>
                      <DeleteButton
                        path={"staff"}
                        id={pharmacist?._id}
                        record={getPharmacists}
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
        label2="Add Pharmacist"
        content2={
          <CreateStaff
            role="pharmacist"
            buttonName="Add Pharmacist"
            formName="ADD PHARMACIST"
            getStaffs={getPharmacists}
          />
        }
      />
    </AdminSidebar>
  );
}

export default Pharmacist;
