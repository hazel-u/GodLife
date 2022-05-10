import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Typography } from "@mui/material";
import axios from "axios";

import React, { Component } from "react";


interface nameProps {
  name: any;
}

class ProfileFollowDetailRecord extends Component <nameProps>{
  state = {
    bingoList: [],
  };
  
  getBingoList = async () => {
    axios
      .get(`user/info/${this.props.name || ''}`)
      .then((res) => {
        const godBingoList: {
          code: string;
          date: string;
          godlife: boolean;
        }[] = [];
        res.data.allBingo.forEach(
          (bingo: { code: string; startDate: any; godlife: boolean }) => {
            if (bingo.godlife === true) {
              let formatDate =
                bingo.startDate[0] +
                "-" +
                0 +
                bingo.startDate[1] +
                "-" +
                0 +
                bingo.startDate[2];
              godBingoList.push({
                code: bingo.code,
                date: formatDate,
                godlife: true,
              });
            }
          }
        );
        this.setState({
          bingoList: godBingoList,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getBingoList();
  }

  render() {
    const { bingoList } = this.state;

    return (
      <>
        <Typography sx={{ whiteSpace: "pre-line", margin: "5% 0" }}>
          이전의 갓생
        </Typography>
        <FullCalendar
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          locale="ko"
          initialView="dayGridMonth"
          plugins={[dayGridPlugin]}
          events={bingoList}
          eventDisplay="background"
          eventBackgroundColor="#A11803"
        />
      </>
    );
  }
}

export default ProfileFollowDetailRecord;
