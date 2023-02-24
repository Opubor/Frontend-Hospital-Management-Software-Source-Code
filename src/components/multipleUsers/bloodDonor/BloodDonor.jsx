import React, { useContext, useEffect, useState } from "react";
import {
  DeleteButton,
  EditButton,
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
  IndexNo,
} from "../../../components";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { loginContext } from "../../../pages/context/auth";
import axios from "../../../services/axios";
import ReactPagination from "../../../components/ReactPagination";
import TotalNo from "../../TotalNo";
import { toast } from "react-toastify";
import ButtonPreloader from "../../ButtonPreloader";

function BloodDonor({ role }) {
  const { user } = useContext(loginContext);
  const [blooddonnors, setBlooddonnors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    staffname: `${user?.name}`,
    name: "",
    email: "",
    address: "",
    phone: "",
    gender: "",
    age: "",
    bloodgroup: "",
    bags: "",
    lastdonationdate: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function getBloodDonors() {
    axios
      .get("/blooddonor")
      .then((response) => {
        setBlooddonnors(response.data);
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
      .post("/blooddonor", {
        name: formData?.name,
        email: formData?.email,
        address: formData?.address,
        phone: formData?.phone,
        gender: formData?.gender,
        age: formData?.age,
        bloodgroup: formData?.bloodgroup,
        bags: formData?.bags,
        lastdonationdate: formData?.lastdonationdate,
        staffname: formData?.staffname,
      })
      .then((res) => {
        setLoading(false);
        getBloodDonors();
        toast.success(res.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  useEffect(() => {
    getBloodDonors();
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/blooddonor?q=${data}`).then((response) => {
      setBlooddonnors(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blooddonnors.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(blooddonnors.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <Tabs
      label1="Blood Donors"
      label2="Add Blood Donor"
      content1={
        <div>
          <div className="flex justify-between items-center">
            <SearchInput onSearch={search} />
            <div className="items-center flex flex-col lg:flex-row">
              <TotalNo totalnumber={blooddonnors?.length} />
              <ReactPagination
                pageCount={pageCount}
                handlePageClick={handlePageClick}
              />
            </div>
          </div>
          <Table>
            <Thead>
              <IndexNo>#</IndexNo>
              <Th>Name</Th>
              <Th>Phone</Th>
              <Th>Gender</Th>
              <Th>Age</Th>
              <Th>Blood Group</Th>
              <Th>No. Of Bags</Th>
              <Th>Last Donation Date</Th>
              <OptionsTh>Options</OptionsTh>
            </Thead>
            {currentPosts.map((blooddonor, i) => {
              return (
                <Tbody key={i}>
                  <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                  <Td>{blooddonor?.name}</Td>
                  <Td>{blooddonor?.phone}</Td>
                  <Td>{blooddonor?.gender}</Td>
                  <Td>{blooddonor?.age}</Td>
                  <Td>{blooddonor?.bloodgroup}</Td>
                  <Td>{blooddonor?.bags}</Td>
                  <Td>{blooddonor?.lastdonationdate}</Td>
                  <OptionsTd>
                    <EditButton
                      editFunction={`${role}/edit_blooddonor?edit=${blooddonor?._id}`}
                    >
                      Edit
                      <RiEdit2Line />
                    </EditButton>
                    <DeleteButton
                      path={"blooddonor"}
                      id={blooddonor?._id}
                      record={getBloodDonors}
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
      content2={
        <FormLayout formName="ADD BLOOD DONOR">
          <form onSubmit={handleSubmit}>
            <Input
              label="Name"
              type="text"
              name="name"
              onChange={handleChange}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
            />
            <Input
              label="Address"
              type="text"
              name="address"
              onChange={handleChange}
            />
            <Input
              label="Phone"
              type="text"
              name="phone"
              onChange={handleChange}
            />
            <Select
              label="Gender"
              name="gender"
              type="text"
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
            <Input label="Age" type="text" name="age" onChange={handleChange} />
            <Select
              label="Blood Group"
              type="text"
              name="bloodgroup"
              onChange={handleChange}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </Select>
            <Input
              label="No. Of Bags"
              type="text"
              name="bags"
              onChange={handleChange}
            />
            <Input
              label="Last Donation Date"
              type="date"
              name="lastdonationdate"
              onChange={handleChange}
            />
            <Button>{loading ? <ButtonPreloader /> : "Add Blood Donor"}</Button>
          </form>
        </FormLayout>
      }
    />
  );
}

export default BloodDonor;
