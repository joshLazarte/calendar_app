import React from "react";
import { Link } from "react-router-dom";

const MobileDisplay = props => {
  const { multiDayEvents, notMultiDayEvents } = props;
  const count = multiDayEvents.length + notMultiDayEvents.length;
  return (
    <Link to={{ pathname: "/events", state: { ...props } }}>
      <span className="badge badge-primary">{count}</span>
    </Link>
  );
};

export default MobileDisplay;
