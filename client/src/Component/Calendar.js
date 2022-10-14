import React, { useState, useEffect } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, addDays, isSameDay } from "date-fns";
import axios from "axios";
import moment from 'moment'

/* Assets */
import "../Assets/Calendar.css";

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className="header">
            <div className="col col-start">
                <span className="text">
                    <span>{format(currentMonth, "yyyy")}년 </span>
                    <span className="text month">{format(currentMonth, "MM")}월</span>
                </span>
            </div>
            <div className="col col-end">
                <button onClick={prevMonth}>&lt;</button>
                <button onClick={nextMonth}>&gt;</button>
            </div>
        </div>
    );
};

const RenderDays = () => {
    const days = [];
    const date = ["일", "월", "화", "수", "목", "금", "토"];
    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col" key={i}>
                {date[i]}
            </div>
        );
    }
    return <div className="days-row">{days}</div>;
};

const RenderCells = ({ currentMonth, ReserveList }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const StartDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    let reserveListCopy = [];
    for (let i = 0; i < ReserveList.length; i++) {
        reserveListCopy.push(ReserveList[i]);
    }

    let reserveDay = Object(reserveListCopy.shift());

    const rows = [];
    let days = [];
    let day = StartDate;
    let formattedDate = "";

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, "d");


            days.push(
                <div
                    className={`col cell ${!isSameMonth(day, monthStart) ||
                        (moment(day).format("YYYY-MM-DD") < moment(new Date()).format("YYYY-MM-DD")) ||
                        isSameDay(day, new Date(reserveDay["reserveDate"]))
                        ? "disabled"
                        : format(currentMonth, "M") !== format(day, "M")
                            ? "not-valid"
                            : "valid"
                        }`}
                    key={day}
                >
                    <span
                        className={
                            format(currentMonth, "M") !== format(day, "M")
                                ? "text not-valid"
                                : ""
                        }
                    >
                        {formattedDate}
                    </span>
                    {isSameDay(day, new Date(reserveDay["reserveDate"])) ? (
                        <div style={{ backgroundColor: "gray", fontSize: "1px" }}>
                            {reserveDay["reserveType"]}
                        </div>
                    ) : null}
                </div>
            );

            if (isSameDay(day, new Date(reserveDay["reserveDate"]))) {

                reserveDay = Object(reserveListCopy.shift())

            }

            day = addDays(day, 1);
        }
        rows.push(
            <div className="day" key={day}>
                {days}
            </div>
        );
        days = [];
    }
    return <div className="calender-body">{rows}</div>;
};

function Calender() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [ReserveList, setReserveList] = useState([]);

    /* list */
    const getReserveList = (currentMonth) => {

        let body = {
            firstDate: startOfMonth(currentMonth),
            endDate: endOfMonth(currentMonth),
        }

        axios.post("/api/reserve/calendarList", body).then((res) => {
            if (res.data.success) {
                setReserveList([...res.data.reserveList]);
            }
        });
    };

    useEffect(() => {
        getReserveList(currentMonth);
    }, [currentMonth]);


    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    return (
        <div className="calender">
            <RenderHeader
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <RenderDays />
            <RenderCells
                currentMonth={currentMonth}
                ReserveList={ReserveList}
            />
        </div>
    );
}

export default Calender;
