import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class EventInCalendarCell extends Component {
  onClick = e => {
    e.preventDefault();
  };

  render() {
    return <div>Hello</div>;
    // let eventContent;

    // if (!isEmpty(singleEvents)) {
    //   eventContent = (
    //     <span>
    //       {singleEvents.map((event, index) => {
    //         return (
    //           <a
    //             key={event._id + index}
    //             href="!#"
    //             className="calendar-event bg-primary text-white d-block p-1 mb-1"
    //             data-toggle="tooltip"
    //             data-placement="bottom"
    //             data-html="true"
    //             title="Don't have this working yet"
    //             onClick={this.onClick}
    //           >
    //             {event.startTime ? event.startTime : null} {event.name}
    //           </a>
    //         );
    //       })}
    //     </span>
    //   );
    // } else {
    //   eventContent = null;
    // }

    //<div>{eventContent}</div>;
  }
}

EventInCalendarCell.propTypes = {
  events: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  events: state.event.events
});

export default connect(mapStateToProps)(EventInCalendarCell);
