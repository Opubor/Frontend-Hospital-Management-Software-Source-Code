import React, { useEffect, useState } from "react";
import ReactPagination from "../../../components/ReactPagination";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import axios from "../../../services/axios";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import {
  DeleteButton,
  EditButton,
  ViewButton,
  Button,
  Input,
  SearchInput,
  Select,
  OptionsTd,
  OptionsTh,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  FormLayout,
  Tabs,
  Textarea,
  IndexNo,
  TotalNo,
} from "../../../components";

function VitalSign() {
  const [vitalSigns, setVitalSigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("/vital_signs").then((res) => {
      setVitalSigns(res.data);
    });
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/vital_signs?q=${data}`).then((response) => {
      setVitalSigns(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = vitalSigns.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(vitalSigns.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <DoctorSidebar>
      {" "}
      <div className="p-4 bg-gray-100">
        <div className="flex justify-between items-center">
          <SearchInput onSearch={search} />
          <div className="items-center flex flex-col lg:flex-row">
            <TotalNo totalnumber={vitalSigns?.length} />
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
            <Th>Blood Pressure</Th>
            <Th>Temperature</Th>
            <Th>Pulse</Th>
            <Th>
              SPO<sub>2</sub>
            </Th>
            <Th>Weight</Th>
          </Thead>
          {currentPosts.map((vitalSign, i) => {
            return (
              <Tbody key={i}>
                <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                <Td className="font-bold">
                  {vitalSign?.patients[0]?.registrationId}
                </Td>
                <Td>{vitalSign?.patients[0]?.name}</Td>
                <Td>
                  {vitalSign?.bloodpressure ? vitalSign?.bloodpressure : "---"}
                </Td>
                <Td>
                  {vitalSign?.temperature ? vitalSign?.temperature : "---"}
                </Td>
                <Td>{vitalSign?.pulse ? vitalSign?.pulse : "---"}</Td>
                <Td>{vitalSign?.spo ? vitalSign?.spo : "---"}</Td>
                <Td>{vitalSign?.weight ? vitalSign?.weight : "---"}</Td>
              </Tbody>
            );
          })}
        </Table>
      </div>{" "}
    </DoctorSidebar>
  );
}

export default VitalSign;
