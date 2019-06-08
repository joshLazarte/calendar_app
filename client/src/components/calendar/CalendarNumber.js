import React from "react";
import classnames from "classnames";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const isTheFirstCell = (notThisMonth, date, day) => {
  return notThisMonth && day === 0 && date > 22;
};

const shouldShowMonth = (notThisMonth, day, date) => {
  return date === 1 || isTheFirstCell(notThisMonth, date, day);
};

const CalendarNumber = props => {
  const { day, date, month, notThisMonth } = props;
  return (
    <small
      className={classnames("calendar-cell-number", {
        "text-muted": notThisMonth
      })}
    >
      {date}
      <strong className="ml-1">
        {shouldShowMonth(notThisMonth, day, date) && months[month]}
      </strong>
    </small>
  );
};

export default CalendarNumber;
