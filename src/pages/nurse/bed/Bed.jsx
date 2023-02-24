import React, { useEffect, useState } from "react";
import {
  Button,
  DeleteButton,
  EditButton,
  FormLayout,
  IndexNo,
  Input,
  OptionsTd,
  OptionsTh,
  Table,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
} from "../../../components";
import ReactPagination from "../../../components/ReactPagination";
import NurseSidebar from "../../../components/sidebars/NurseSidebar";
import axios from "../../../services/axios";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import ButtonPreloader from "../../../components/ButtonPreloader";

function Bed() {
  const [beds, setBeds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    type: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function getBeds() {
    axios
      .get("/bed")
      .then((response) => {
        setBeds(response.data);
      })
      .catch((response) => {
        toast.error(response.data);
      });
  }

  // CREATE
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/bed", {
        type: formData?.type,
      })
      .then((res) => {
        setLoading(false);
        getBeds();
        toast.success(res.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };
  useEffect(() => {
    getBeds();
  }, []);

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = beds.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(beds.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <NurseSidebar>
      <Tabs
        label1={"Beds"}
        label2={"Add Bed"}
        content1={
          <div>
            <div className="flex justify-between items-center">
              <ReactPagination
                pageCount={pageCount}
                handlePageClick={handlePageClick}
              />
            </div>
            <Table>
              <Thead>
                <IndexNo>#</IndexNo>
                <Th>Bed Type</Th>
                <OptionsTh>Options</OptionsTh>
              </Thead>
              {currentPosts.map((bed, i) => {
                return (
                  <Tbody key={i}>
                    <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                    <Td>{bed?.type}</Td>
                    <OptionsTd>
                      <EditButton
                        editFunction={`/nurse/edit_bed?edit=${bed?._id}`}
                      >
                        Edit
                        <RiEdit2Line />
                      </EditButton>
                      <DeleteButton path={"bed"} id={bed?._id} record={getBeds}>
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
        content2={
          <FormLayout formName="ADD BED">
            <form onSubmit={handleSubmit}>
              <Input
                label="Bed Name"
                type="text"
                name="type"
                onChange={handleChange}
              />
              <Button>{loading ? <ButtonPreloader /> : "Add Bed"}</Button>
            </form>
          </FormLayout>
        }
      />
    </NurseSidebar>
  );
}

export default Bed;
