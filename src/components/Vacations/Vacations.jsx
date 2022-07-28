import * as React from "react";
import Calendar from "rc-year-calendar";

import "tippy.js/dist/tippy.css"; // optional for styling
import tippy from "tippy.js";

import structuredClone from "@ungap/structured-clone";
import { useParams, useLocation } from "react-router-dom";

import "./Vacations.css";
import VacationViewModal from "./VacationViewModal";

import * as Utils from "./VacationsUtils.jsx";
import * as Requests from "../../Helpers/Requests";

import * as Urls from "../../Routing/Urls";

import {
  userAccessingOwnResource,
  userAccessingManagedResource,
} from "../../Helpers/Helpers";
import NoPermission from "../ErrorPages/NoPermission";

export default function Vacations() {
  const params = useParams();
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
  //>>>>>>>>>>>>>>>>>>>>>>> Vacations Data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
  const [showModal, setShowModal] = React.useState(null);
  const [renderedData, setRenderedData] = React.useState([]);
  const [originalData, setOriginalData] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [vacationsTypes, setVacationsTypes] = React.useState([]);
  const [requestedUser, setRequestedUser] = React.useState({});
  const [currentVacation, setCurrentVacation] = React.useState({});

  let userToken = JSON.parse(localStorage.getItem("userData")).token;
  let userId = currentUser.id;
  let urlId = params.userId;
  let tooltip = null;
  const axios = require("axios");
  const location = useLocation();
  console.log(originalData);
  //<<<<<<<<<<<<<<<<<<<<<<< Vacations Data <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
  React.useEffect(() => {
    Requests.getMe(userToken).then((me) => {
      setCurrentUser(me);
    });

    // fetch vacations types.
    axios({
      method: "get",
      url: `${Urls.mainUrl}/types`,
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => {
        setVacationsTypes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    // update component when the url change.
    // Getting requested resource user
    axios({
      method: "get",
      url: `${Urls.mainUrl}/users/${params.userId}`,
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => {
        setRequestedUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch vacations
    axios({
      method: "get",
      url: `${Urls.mainUrl}/users/${params.userId}/vacations`,
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => {
        setOriginalData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);

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
    if (e.events.length) {
      setShowModal("view");
      let _currentVacation = Utils.createEmptyOriginalObj();
      _currentVacation = {
        ..._currentVacation,
        ...structuredClone(e.events[0]),
      };
      setCurrentVacation(Utils.renderedToOriginal([_currentVacation])[0]);
    }
  };
  return (
    renderedData &&
    Object.keys(currentUser).length && (
      <>
        {userAccessingOwnResource(userId, urlId) ||
        userAccessingManagedResource(userId, urlId) ? (
          <div
            id="vacations_main"
            className="d-flex justify-content-center align-items-center h-100 flex-column"
          >
            <div className="d-flex w-100 justify-content-between">
              <h2 className="mt-3 mb-5">Vacations of : {requestedUser.name}</h2>
              <div className="w-25 d-flex">
                <div className="me-3 d-flex align-items-center">
                  <div className="d-flex me-2">Vacations Index :</div>
                </div>
                <div className="d-flex flex-column">
                  {vacationsTypes.map((type, index) => {
                    return (
                      <div className="d-flex index-row">
                        <div
                          className="mt-1"
                          style={{
                            height: "18px",
                            width: "18px",
                            backgroundColor: `${type.color}`,
                          }}
                        ></div>
                        <div className="ms-2">{type.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
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
                setCurrentVacation({
                  startDate: e.startDate,
                  endDate: e.endDate,
                })
              }
            />
            {currentVacation.type && (
              <VacationViewModal
                showModal={showModal}
                setShowModal={setShowModal}
                currentVacation={currentVacation}
              />
            )}
          </div>
        ) : (
          <NoPermission />
        )}
      </>
    )
  );
}
