import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import React from "react";


const ProfileRecord = () => {
  const name = Calendar.name;

  return (
    <>
      <FullCalendar initialView="dayGridMonth" plugins={[dayGridPlugin]} />
    </>
  );
};

export default ProfileRecord;
