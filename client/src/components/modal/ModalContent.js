import React from "react";

const ModalContent = props => {
  return (
    <div>
      {props.event.name}
      <button onClick={props.handleHideModal}>Hide Me</button>
    </div>
  );
};

export default ModalContent;
