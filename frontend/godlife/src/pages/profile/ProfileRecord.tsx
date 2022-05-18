import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { Component } from "react";
import axiosWithToken from "../../utils/axios";
import Stamp from "../../assets/images/stamp.webp";


class ProfileRecord extends Component {
  state = {
    bingoList: [],
    page: 0,
    limit: 31,
  };

  getBingoList = async () => {
    axiosWithToken
    .get(`bingo/${this.state.page}/${this.state.limit}`)
    .then((res) => {
      const godBingoList: {
        code: string;
        date: string;
        godlife: boolean;
      }[] = [];
      res.data.forEach((bingo: { code: string; startDate: any; godlife: boolean; }) => {
        if (bingo.godlife === true) {
          var formatDate = (bingo.startDate[2] >= 10) ? 
            bingo.startDate[0] + "-" + 0 + bingo.startDate[1] + "-" + bingo.startDate[2]
            : bingo.startDate[0] + "-" + 0 + bingo.startDate[1] + "-" + 0 + bingo.startDate[2]
          godBingoList.push({ code: bingo.code, date: formatDate, godlife: true })
        }
      });
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
    const { bingoList } = this.state
   
    return (
      <>
        <FullCalendar
          headerToolbar={{
            left: 'prev',
            center: 'title',
            right: 'next'
          }}
          locale="ko"
          initialView="dayGridMonth" 
          plugins={[ dayGridPlugin ]}
          contentHeight="auto"
          events={bingoList}
          eventDisplay="background"
          eventBackgroundColor="#ffffff"
          eventContent={<img
            src={Stamp}
            alt="stamp"
            style={{
              width: "80%",
              opacity: "50%",
            }}
          />}
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


export default ProfileRecord;
