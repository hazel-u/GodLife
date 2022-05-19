import React, { useState, useEffect, useCallback } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Stamp from "../../../assets/images/stamp.webp";
import { useNavigate } from "react-router-dom";

interface nameProps {
  name: any;
}

const ProfileFollowDetailRecord = (props: nameProps) => {
  dayjs.extend(isBetween);
  const [bingoList, setBingoList] = useState<any>([]);
  const [date, setDate] = useState(new Date());

  const navigate = useNavigate();
  const handleChange = (newValue: Date) => {
    if (
      !dayjs(newValue).isValid() ||
      !dayjs(newValue).isBetween(
        dayjs("2022-05-01"),
        dayjs("2999-12-31"),
        "year",
        "[]"
      )
    )
      return;

    setDate(newValue);
  };

  const getBingoList = useCallback(() => {
    axios
      .get(`user/info/${props.name || ''}`)
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
        });
        setBingoList(godBingoList);    
      })
      .catch((err) => console.log(err));
  }, [setBingoList, props.name]);

  function leftPad(value: number) {
    if (value >= 10) { 
      return value; 
    } 
    
    return `0${value}`; 
  }
  
  function toStringByFormatting(date: Date, delimiter = '-') { 
    const year = date.getFullYear(); 
    const month = leftPad(date.getMonth() + 1); 
    const day = leftPad(date.getDate()); 
    
    return [year, month, day].join(delimiter); 
  }

  useEffect(() => {
    getBingoList();
  }, [getBingoList])

  return (
    <>
      <Calendar
        className="react-calendar-profile"
        onChange={(newDate: Date) => {
          handleChange(newDate);
        }}
        formatDay={(locale, date) => `${date.getDate()}`}
        calendarType="Hebrew"
        value={date}
        minDetail="year"
        minDate={new Date("2022-04-01")}
        maxDate={new Date("2099-12-31")}
        showNeighboringMonth={false}
        tileContent={({ date }) => {
          if (bingoList.find((x: { code: string; date: any; godlife: boolean; }) => 
            x.date === toStringByFormatting(date))) {
            return (
              <div style={{ height: 10 }}>
                <img
                  className="react-calendar-profile-img"
                  src={Stamp}
                  alt="stamp"
                  style={{
                    width: "40%",
                    opacity: "50%",
                    marginLeft: "40%",
                    transform: "translate(-5px, -10px)"
                  }}
                />
              </div>
            );
          } 
          else {
            return (
              <div style={{ height: 10 }}>
              </div>
            );
          }}
        }
        onClickDay={(day) => {
          const events = bingoList.filter((x: { code: string; date: any; godlife: boolean; }) => 
          x.date === toStringByFormatting(day))
          events && events.map((bingo: { code: string; date: any; godlife: boolean; }) => {
            return navigate(`/bingo/${bingo.code}`)
          })
        }}
      />
    </>
  )
}

export default ProfileFollowDetailRecord