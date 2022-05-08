import { Typography } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { Component } from "react";
import axiosWithToken from "../../utils/axios";


class ProfileRecord extends Component {
  state = {
    bingoList: [],
    page: 0,
    limit: 10,
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
          let formatDate = bingo.startDate[0] + "-" + 0 + bingo.startDate[1] + "-" + 0 + bingo.startDate[2]
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
        <Typography sx={{ whiteSpace: "pre-line", margin: "5% 0" }}>
          이전의 갓생
        </Typography>
        <FullCalendar 
          initialView="dayGridMonth" 
          plugins={[ dayGridPlugin ]}
          events={bingoList}
          eventDisplay="background"
          eventBackgroundColor="#A11803"
        />
      </>
    );
  }
}

export default ProfileRecord;
