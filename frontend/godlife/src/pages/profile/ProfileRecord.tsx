import { Typography } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, {Component} from "react";


class ProfileRecord extends Component {

  render() {
    return (
      <>
        <Typography sx={{ whiteSpace: "pre-line", margin: "5% 0" }}>
          이전의 갓생
        </Typography>
        <FullCalendar 
          initialView="dayGridMonth" 
          plugins={[ dayGridPlugin ]}
        />
      </>
    );
  }
}

export default ProfileRecord;
