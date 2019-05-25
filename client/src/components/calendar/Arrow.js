import React from "react";

const Arrow = props => {
  let arrow;
  if (
    (!props.showAll && props.hideStart) ||
    (!props.showAll && props.hideStart === 0)
  ) {
    arrow = (
      <span className="float-right" onClick={props.toggleShowAll}>
        &#9660;
      </span>
    );
  } else if (
    (props.showAll && props.hideStart) ||
    (props.showAll && props.hideStart === 0)
  ) {
    arrow = (
      <span className="float-right" onClick={props.toggleShowAll}>
        &#9650;
      </span>
    );
  } else {
    arrow = null;
  }
  return <div>{arrow}</div>;
};

export default Arrow;
