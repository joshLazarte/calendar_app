import React from "react";

const CalendarHeader = () => {
  const days = [
    { day: "Sun", short: "S" },
    { day: "Mon", short: "M" },
    { day: "Tue", short: "T" },
    { day: "Wed", short: "W" },
    { day: "Thu", short: "T" },
    { day: "Fri", short: "F" },
    { day: "Sat", short: "S" }
  ];

  return (
    <tr className="text-center">
      {days.map(day => (
        <th key={day.day} scope="col">
          <span className="d-none d-md-block">{day.day}</span>
          <span className="d-sm-block d-md-none">{day.short}</span>
        </th>
      ))}
    </tr>
  );
};

export default CalendarHeader;
