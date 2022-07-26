import * as React from "react";
import { Modal, Button } from "react-bootstrap";

export default function VacationViewModal(props) {
  return (
    <>
      <Modal
        style={{ marginTop: "20vh" }}
        show={props.showModal === "view"}
        onHide={() => props.setShowModal(null)}
      >
        <Modal.Header>
          <Modal.Title>View Vacation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-horizontal">
            <div className="form-group row">
              <label htmlFor="vacation-type" className="col-sm-3 control-label">
                Type
              </label>
              <div className="col-sm-9">
                <p> {props.currentVacation.type.name} </p>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="vacation-reason"
                className="col-sm-3 control-label"
              >
                Reason
              </label>
              <div className="col-sm-9">
                <p>{props.currentVacation.reason}</p>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="min-date" className="col-sm-3 control-label">
                Duration
              </label>
              <div className="col-sm-9">
                <div className="input-group input-daterange">
                  <p>
                    {props.currentVacation.startDate} <small>to </small>{" "}
                    {props.currentVacation.endDate}
                  </p>
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="vacation-reason"
                className="col-sm-3 control-label"
              >
                Created By
              </label>
              <div className="col-sm-9">
                <p>{props.currentVacation.created_by}</p>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="vacation-reason"
                className="col-sm-3 control-label"
              >
                Updated By
              </label>
              <div className="col-sm-9">
                <p>{props.currentVacation.updated_by}</p>
              </div>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <div className="d-flex justify-content-between w-100">
            <Button
              variant="danger"
              onClick={() => props.setShowModal("delete")}
            >
              Delete
            </Button>
            <div>
              <Button
                className="me-2"
                variant="secondary"
                onClick={() => props.setShowModal(null)}
              >
                Close
              </Button>
              <Button
                variant="warning"
                onClick={() => props.setShowModal("edit")}
              >
                Edit Vacation
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
