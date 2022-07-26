import * as React from "react";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

import VacationsNotifications from "./VacationsNotifications.jsx";

export default function VacationDeleteModal(props) {
  const params = useParams();
  const axios = require("axios");

  // alerts state
  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const handleAlertClose = () => setAlert(false);

  const deleteVacation = () => {
    // api create vacation request
    let userToken = JSON.parse(localStorage.getItem("userData")).token;
    let vacationId = props.currentVacation.id;
    axios({
      method: "delete",
      url: `http://localhost:8000/api/users/${params.userId}/vacations/${vacationId}`,
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then(() => {
        props.setOriginalData(
          props.originalData.filter((ele) => ele.id != vacationId)
        );
        setSeverity("success");
        setMessage("Vacation was deleted successfully.");
        props.setShowModal(null);
      })
      .catch((err) => {
        setSeverity("error");
        setMessage(err.response.data.message);
      });
    setAlert(true);
  };

  return (
    <>
      <VacationsNotifications
        alert={alert}
        severity={severity}
        message={message}
        handleAlertClose={handleAlertClose}
      />
      <Modal
        style={{ marginTop: "20vh" }}
        show={props.showModal === "delete"}
        onHide={() => props.setShowModal("view")}
      >
        <Modal.Header>
          <Modal.Title>Delete Vacation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Are you sure you want to delete this vacation?</div>
          <b> This action can't be undone.</b>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className="me-2"
            variant="secondary"
            onClick={() => props.setShowModal("view")}
          >
            Close
          </Button>
          <Button variant="danger" onClick={() => deleteVacation()}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
