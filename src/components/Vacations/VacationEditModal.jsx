import * as React from "react";
import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import VacationsNotifications from "./VacationsNotifications.jsx";
import * as Utils from "./VacationsUtils.jsx";

export default function VacationEditModal(props) {
  const params = useParams();
  const axios = require("axios");

  // alerts state
  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const handleAlertClose = () => setAlert(false);

  const updateVacation = () => {
    let formData = Utils.createFormData(props.currentVacation);

    // api create vacation request
    let userToken = JSON.parse(localStorage.getItem("userData")).token;
    let vacationId = props.currentVacation.id;
    axios({
      method: "put",
      url: `http://localhost:8000/api/users/${params.userId}/vacations/${vacationId}`,
      headers: { Authorization: `Bearer ${userToken}` },
      data: formData,
    })
      .then((res) => {
        let _originalData = JSON.parse(JSON.stringify(props.originalData));
        console.log(_originalData);
        let index = _originalData.findIndex((ele) => ele.id === vacationId);
        _originalData[index] = res.data.data;
        props.setOriginalData(_originalData);
        props.setShowModal(null);
        setSeverity("success");
        setMessage("Vacation Updated Successfully.");
      })
      .catch((err) => {
        setSeverity("error");
        setMessage(err);
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
        show={props.showModal === "edit"}
        onHide={() => props.setShowModal("view")}
      >
        <Modal.Header>
          <Modal.Title>Update Vacation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-horizontal">
            <div className="form-group row">
              <label htmlFor="vacation-type" className="col-sm-2 control-label">
                type
              </label>
              <div className="col-sm-10">
                <Form.Select
                  aria-label="Default select example"
                  defaultValue={props.currentVacation.type.id}
                  onChange={(e) =>
                    props.updateCurrentVacationPair("type", e.target.value)
                  }
                >
                  {props.vacationsTypes.map((type) => {
                    return (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="vacation-reason"
                className="col-sm-2 control-label"
              >
                Reason
              </label>
              <div className="col-sm-10">
                <input
                  id="vacation-reason"
                  type="text"
                  className="form-control"
                  value={props.currentVacation.reason}
                  onChange={(e) =>
                    props.updateCurrentVacationPair("reason", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="min-date" className="col-sm-2 control-label">
                Duration
              </label>
              <div className="col-sm-10">
                <div className="input-group input-daterange">
                  <input
                    id="min-date"
                    type="date"
                    className="form-control"
                    value={props.currentVacation.startDate}
                    onChange={(e) =>
                      props.updateCurrentVacationPair(
                        "startDate",
                        e.target.valueAsDate
                      )
                    }
                  />
                  <div className="input-group-prepend input-group-append">
                    <div className="input-group-text">to</div>
                  </div>
                  <input
                    type="date"
                    className="form-control"
                    value={props.currentVacation.endDate}
                    onChange={(e) =>
                      props.updateCurrentVacationPair(
                        "endDate",
                        e.target.valueAsDate
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => props.setShowModal("view")}
          >
            Close
          </Button>
          <Button variant="success" onClick={() => updateVacation()}>
            Confirm Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
