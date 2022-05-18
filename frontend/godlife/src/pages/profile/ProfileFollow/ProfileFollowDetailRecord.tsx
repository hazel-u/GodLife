import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";

import React, { Component } from "react";
import Stamp from "../../../assets/images/stamp.webp";


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
              var formatDate = (bingo.startDate[2] >= 10) ? 
                bingo.startDate[0] + "-" + 0 + bingo.startDate[1] + "-" + bingo.startDate[2]
                : bingo.startDate[0] + "-" + 0 + bingo.startDate[1] + "-" + 0 + bingo.startDate[2]
              godBingoList.push({ code: bingo.code, date: formatDate, godlife: true })
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
        <FullCalendar
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          locale="ko"
          initialView="dayGridMonth"
          plugins={[dayGridPlugin]}
          contentHeight="auto"
          events={bingoList}
          fixedWeekCount={false}
          eventDisplay="background"
          eventBackgroundColor="#ffffff"
          eventContent={<img
            src={Stamp}
            alt="stamp"
            style={{
              width: "80%",
              opacity: "50%",
            }}
          />
          }
          eventClick={
            function(info) {
              info.jsEvent.preventDefault();
              let eventCode = info.event._def.extendedProps.code
              window.location.href=`/bingo/${eventCode}`
            }
          }
        />
      </>
    );
  }
}

export default ProfileFollowDetailRecord;
