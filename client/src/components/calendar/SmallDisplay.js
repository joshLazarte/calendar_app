import React from "react";
import isEmpty from "../../validation/is-empty";

const getNames = (multi, single) => {
  let multiNames, singleNames;
  if (!isEmpty(multi)) multiNames = multi.map(event => event.name);
  if (!isEmpty(single)) singleNames = single.map(event => event.name);

  const result = [...(multiNames || []), ...(singleNames || [])];
  return result.join(" ");
};

const SmallDisplay = props => {
  return (
    <div style={{ width: "1rem", height: "1rem" }} className="mx-auto mt-1">
      <svg
        onClick={() =>
          alert(getNames(props.multiDayEvents, props.notMultiDayEvents))
        }
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="50" />
      </svg>
    </div>
  );
};

export default SmallDisplay;
