import React, { useEffect, useState, useContext } from "react";
import {
  DeleteButton,
  EditButton,
  Button,
  Input,
  SearchInput,
  AdminSidebar,
  OptionsTd,
  OptionsTh,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  FormLayout,
  Tabs,
  TotalNo,
} from "../../../components";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import axios from "../../../services/axios";
import { toast } from "react-toastify";
import ReactPagination from "../../../components/ReactPagination";
import { loginContext } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import ButtonPreloader from "../../../components/ButtonPreloader";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Departments() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(loginContext);
  const admin = user?.role === "admin";
  const navigate = useNavigate();

  function getDepartment() {
    axios
      .get("/department")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((response) => {
        toast.error(response.data);
      });
  }

  // READ
  useEffect(() => {
    getDepartment();
  }, []);

  // CREATE
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/department", {
        name,
        description,
      })
      .then((res) => {
        setLoading(false);
        getDepartment();
        toast.success(res.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  // SEARCH
  const searchDepartment = (data) => {
    axios.get(`department?q=${data}`).then((response) => {
      setDepartments(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = departments.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(departments.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <>
      <AdminSidebar>
        <Tabs
          label1="Departments"
          content1={
            <div>
              <div className="flex justify-between items-center">
                <SearchInput onSearch={searchDepartment} />
                <div className="items-center flex flex-col lg:flex-row">
                  <TotalNo totalnumber={departments?.length} />
                  <ReactPagination
                    pageCount={pageCount}
                    handlePageClick={handlePageClick}
                  />
                </div>
              </div>
              <Table>
                <Thead>
                  <Th>#</Th>
                  <Th>Departments</Th>
                  <Th>Description</Th>
                  <OptionsTh>Options</OptionsTh>
                </Thead>
                {currentPosts.map((department, i) => {
                  return (
                    <Tbody key={i}>
                      <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                      <Td>{department?.name}</Td>
                      <Td>{department?.description}</Td>
                      <OptionsTd>
                        <EditButton
                          editFunction={`/admin/edit_department?edit=${department?._id}`}
                        >
                          Edit
                          <RiEdit2Line />
                        </EditButton>
                        <DeleteButton
                          path={"department"}
                          id={department?._id}
                          record={getDepartment}
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
          label2="Add Department"
          content2={
            <FormLayout formName="ADD DEPARTMENT">
              <form onSubmit={handleSubmit}>
                <Input
                  label={"Department"}
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <Input
                  label={"Description"}
                  type="text"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <Button>
                  {loading ? <ButtonPreloader /> : "Add Department"}
                </Button>
              </form>
            </FormLayout>
          }
        />
      </AdminSidebar>
    </>
  );
}

export default Departments;
