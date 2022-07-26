import * as React from "react";
import Calendar from "rc-year-calendar";

import "tippy.js/dist/tippy.css"; // optional for styling
import tippy from "tippy.js";

import structuredClone from "@ungap/structured-clone";
import { useParams } from "react-router-dom";

import "./Vacations.css";
import VacationCreateModal from "./VacationCreateModal";
import VacationViewModal from "./VacationViewModal";

import * as Utils from "./VacationsUtils.jsx";
import VacationEditModal from "./VacationEditModal";
import VacationDeleteModal from "./VacationDeleteModal";

export default function Vacations() {
  const params = useParams();
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
  //>>>>>>>>>>>>>>>>>>>>>>> Vacations Data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
  const [showModal, setShowModal] = React.useState(null);
  const [vacationsTypes, setVacationsTypes] = React.useState([]);
  const [renderedData, setRenderedData] = React.useState([]);
  const [originalData, setOriginalData] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [currentVacation, setCurrentVacation] = React.useState({});
  const updateCurrentVacationPair = (key, value) => {
    if (key.toLowerCase().includes("type")) {
      setCurrentVacation({
        ...currentVacation,
        [key]: vacationsTypes.find((ele) => ele.id == value),
      });
    } else if (key.toLowerCase().includes("date")) {
      let date = new Date(value);
      setCurrentVacation({
        ...currentVacation,
        [key]: Utils.longToIso(date),
      });
    } else {
      setCurrentVacation({
        ...currentVacation,
        [key]: value,
      });
    }
  };
  let userToken = JSON.parse(localStorage.getItem("userData")).token;
  let tooltip = null;
  const axios = require("axios");
  //<<<<<<<<<<<<<<<<<<<<<<< Vacations Data <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

  React.useEffect(() => {
    // Fetch user Data using id
    axios({
      method: "get",
      url: `http://localhost:8000/api/users/${params.userId}`,
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => {
        setCurrentUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch vacations types.
    axios({
      method: "get",
      url: `http://localhost:8000/api/types`,
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => {
        setVacationsTypes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch vacations
    axios({
      method: "get",
      url: `http://localhost:8000/api/users/${params.userId}/vacations`,
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => {
        setOriginalData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    // Convert date format to match the calender library requirement.
    let _renderedData = Utils.originalToRendered(originalData);
    setRenderedData(_renderedData);
  }, [originalData]);

  const handleDayEnter = (e) => {
    if (e.events.length > 0) {
      let content = `
          <div class="event-tooltip-content">
            <div
              class="vacation-type"
              style="color:${e.events[0].color};
                text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.4);">
              ${e.events[0].reason}
            </div>
          </div>
        `;

      tooltip = tippy(e.element, {
        allowHTML: true,
        placement: "right",
        content: content,
        animateFill: false,
        animation: "shift-away",
        arrow: true,
      });
      tooltip.show();
    }
  };

  const handleDayLeave = () => {
    if (tooltip) {
      tooltip.destroy();
      tooltip = null;
    }
  };

  const handleDayClick = (e) => {
    let _currentVacation = Utils.createEmptyOriginalObj();
    if (e.events.length) {
      setShowModal("view");
      _currentVacation = {
        ..._currentVacation,
        ...structuredClone(e.events[0]),
      };
    } else {
      setShowModal("create");
      _currentVacation = {
        ..._currentVacation,
        startDate: e.date,
        endDate: e.date,
      };
    }
    setCurrentVacation(Utils.renderedToOriginal([_currentVacation])[0]);
  };

  return (
    renderedData &&
    currentUser && (
      <div
        id="vacations_main"
        className="d-flex justify-content-center align-items-center h-100 flex-column"
      >
        <h2 className="mt-3 mb-5">Vacations of : {currentUser.name} </h2>
        <Calendar
          dataSource={renderedData}
          enableRangeSelection={true}
          enableContextMenu={false}
          displayWeekNumber={true}
          weekStart={6}
          // allowOverlap={false}
          // style="background"
          onDayClick={(e) => handleDayClick(e)}
          onDayEnter={(e) => handleDayEnter(e)}
          onDayLeave={() => handleDayLeave()}
          onRangeSelected={(e) =>
            setCurrentVacation({ startDate: e.startDate, endDate: e.endDate })
          }
        />
        {currentVacation.type && (
          <>
            <VacationViewModal
              showModal={showModal}
              setShowModal={setShowModal}
              currentVacation={currentVacation}
              vacationsTypes={vacationsTypes}
            />
            <VacationCreateModal
              originalData={originalData}
              setOriginalData={setOriginalData}
              showModal={showModal}
              setShowModal={setShowModal}
              currentVacation={currentVacation}
              setCurrentVacation={setCurrentVacation}
              updateCurrentVacationPair={updateCurrentVacationPair}
              vacationsTypes={vacationsTypes}
            />
            <VacationEditModal
              originalData={originalData}
              setOriginalData={setOriginalData}
              showModal={showModal}
              setShowModal={setShowModal}
              vacationsTypes={vacationsTypes}
              currentVacation={currentVacation}
              updateCurrentVacationPair={updateCurrentVacationPair}
            />
            <VacationDeleteModal
              showModal={showModal}
              setShowModal={setShowModal}
              originalData={originalData}
              setOriginalData={setOriginalData}
              currentVacation={currentVacation}
            />
          </>
        )}
      </div>
    )
  );
}
