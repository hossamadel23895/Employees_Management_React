import React, { useEffect, useState } from "react";
import style from "./Tasks.module.css";
import { Table } from "react-bootstrap";

export default function Tasks() {
  let [listedTasks, setListedTasks] = useState([]);

  // ComponentDidMount
  useEffect(() => {
    let userToken = localStorage.getItem("userData").token;
    fetch("http://localhost:8000/api/tasks/", {
      headers: {
        Authorization: "Bearer " + userToken,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.data);
        setListedTasks(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="w-50">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Task Title</th>
            </tr>
          </thead>
          <tbody>
            {listedTasks.map((task, index) => (
              <tr key={index}>
                <td>{task.id}</td>
                <td>{task.title}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
