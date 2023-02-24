import React, { useContext, useEffect, useState } from "react";
import axios from "../services/axios";
import { loginContext } from "../pages/context/auth";
import { FcCalendar } from "react-icons/Fc";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import DatePicker from "react-datepicker";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
function ReactCalendar() {
  const [appointments, setAppointments] = useState([]);
  const { user } = useContext(loginContext);

  useEffect(() => {
    axios.get("/appointment").then((res) => {
      setAppointments(res.data);
    });
  }, []);

  return (
    <div className="lg:grid lg:grid-cols-3">
      <div className="text-base shadow-md shadow-gray-500 col-span-3 border-t-4 border-t-blue-600">
        <h1 className="font-bold p-4 text-2xl flex items-center gap-2">
          {React.createElement(FcCalendar, { size: "20" })}Calendar
        </h1>

        {user?.role === "doctor" && (
          <Calendar
            localizer={localizer}
            events={appointments}
            titleAccessor={"name"}
            startAccessor={"date"}
            endAccessor={"date"}
            style={{ height: 500 }}
            className={"bg-white p-4 rounded-xl"}
          />
        )}
        {user?.role !== "doctor" && (
          <Calendar
            localizer={localizer}
            style={{ height: 500 }}
            className={"bg-white p-4 rounded-xl"}
          />
        )}
      </div>
      <div></div>
    </div>
  );
}

export default ReactCalendar;
