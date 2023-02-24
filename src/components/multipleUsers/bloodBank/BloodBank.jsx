import React, { useContext, useState, useEffect } from "react";
import { SearchInput, Table, Tbody, Td, Th, Thead } from "../../../components";
import { loginContext } from "../../../pages/context/auth";
import axios from "../../../services/axios";

function BloodBank() {
  const { user } = useContext(loginContext);
  const [aPositive, setAPositive] = useState("");
  const [aNegative, setANegative] = useState("");
  const [bPositive, setbPositive] = useState("");
  const [bNegative, setbNegative] = useState("");
  const [oPositive, setoPositive] = useState("");
  const [oNegative, setoNegative] = useState("");
  const [abPositive, setabPositive] = useState("");
  const [abNegative, setabNegative] = useState("");

  useEffect(() => {
    axios.get("/a_positive").then((res) => {
      setAPositive(res.data);
    });
    axios.get("/a_negative").then((res) => {
      setANegative(res.data);
    });
    axios.get("/b_positive").then((res) => {
      setbPositive(res.data);
    });
    axios.get("/b_negative").then((res) => {
      setbNegative(res.data);
    });
    axios.get("/o_positive").then((res) => {
      setoPositive(res.data);
    });
    axios.get("/o_negative").then((res) => {
      setoNegative(res.data);
    });
    axios.get("/ab_positive").then((res) => {
      setabPositive(res.data);
    });
    axios.get("/ab_negative").then((res) => {
      setabNegative(res.data);
    });
  }, []);
  return (
    <>
      <div>
        <div>
          <SearchInput />
        </div>
        <Table>
          <Thead>
            <Th>#</Th>
            <Th>Blood Group</Th>
            <Th>No. Of Bags</Th>
          </Thead>
          <Tbody>
            <Td>1</Td>
            <Td>A+</Td>
            <Td>{aPositive}</Td>
          </Tbody>
          <Tbody>
            <Td>2</Td>
            <Td>A-</Td>
            <Td>{aNegative}</Td>
          </Tbody>
          <Tbody>
            <Td>3</Td>
            <Td>B+</Td>
            <Td>{bPositive}</Td>
          </Tbody>
          <Tbody>
            <Td>4</Td>
            <Td>B-</Td>
            <Td>{bNegative}</Td>
          </Tbody>
          <Tbody>
            <Td>5</Td>
            <Td>O+</Td>
            <Td>{oPositive}</Td>
          </Tbody>
          <Tbody>
            <Td>6</Td>
            <Td>O-</Td>
            <Td>{oNegative}</Td>
          </Tbody>
          <Tbody>
            <Td>7</Td>
            <Td>AB+</Td>
            <Td>{abPositive}</Td>
          </Tbody>
          <Tbody>
            <Td>8</Td>
            <Td>AB-</Td>
            <Td>{abNegative}</Td>
          </Tbody>
        </Table>
      </div>
    </>
  );
}

export default BloodBank;
