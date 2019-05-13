import React from "react";

const Confirm = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-header">Are You Sure?</div>
            <div className="card-body">
              <div className="mb-3">{props.message}</div>

              <div className="text-right">
                <button onClick={props.handleDecline} className="btn btn-info">
                  NO
                </button>
                <button
                  onClick={props.handleConfirm}
                  className="btn btn-danger ml-3"
                >
                  YES
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
