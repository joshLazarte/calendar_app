import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import FormModal from "../modal/FormModal";
import MultiDayEvents from "./MultiDayEvents";
import SingleDayEvents from "./SingleDayEvents";
import Arrow from "../calendar/Arrow";

class EventsInCalendarCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showAllEvents: false,
      eventInModal: {}
    };
  }

  showModal = eventInModal => e => {
    e.preventDefault();
    this.setState({ showModal: true, eventInModal });
  };

  hideModal = e => {
    if (e) e.preventDefault();
    this.setState({ showModal: false, eventInModal: {} });
  };

  toggleShowAll = () => {
    this.setState({ showAllEvents: !this.state.showAllEvents });
  };

  getHideStart = (multi, single) => {
    let hideStart = false;

    if (isEmpty(single)) return hideStart;
    if (isEmpty(multi) && single.length > 3) return (hideStart = 3);
    if (multi.length > 3) return (hideStart = 0);

    let i,
      j = 0;
    for (i = 3; i > 0; i--) {
      if (multi.length === i && single.length > j) {
        hideStart = j;
        break;
      }
      j++;
    }
    return hideStart;
  };

  render() {
    const { multiDayEvents, notMultiDayEvents } = this.props;
    const hideStart = this.getHideStart(multiDayEvents, notMultiDayEvents);

    return (
      <div>
        <MultiDayEvents
          events={multiDayEvents}
          date={this.props.cellDate}
          onClick={this.showModal}
        />

        <SingleDayEvents
          events={notMultiDayEvents}
          showAll={this.state.showAllEvents}
          hideStart={hideStart}
          onClick={this.showModal}
        />

        <Arrow
          showAll={this.state.showAllEvents}
          hideStart={hideStart}
          toggleShowAll={this.toggleShowAll}
        />

        {this.state.showModal ? (
          <FormModal
            disabled={true}
            eventToDisplay={this.state.eventInModal}
            hideModal={this.hideModal}
            formType={"READONLY"}
          />
        ) : null}
      </div>
    );
  }
}

EventsInCalendarCell.propTypes = {
  multiDayEvents: PropTypes.array.isRequired,
  notMultiDayEvents: PropTypes.array.isRequired
};

export default EventsInCalendarCell;
