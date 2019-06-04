import React, { Component } from "react";
import autoLogOutIfNeeded from "../../validation/autoLogOut";
import isEmpty from "../../validation/is-empty";
import { Link } from "react-router-dom";

class EventList extends Component {
  componentDidMount() {
    autoLogOutIfNeeded();
  }

  render() {
    const { multiDayEvents, notMultiDayEvents } = this.props.location.state;
    return (
      <div>
        <Link to="/">Back</Link>
        <ul className="list-group">
          {!isEmpty(multiDayEvents) &&
            multiDayEvents.map(event => (
              <li key={event._id} className="list-group-item">
                {event.name}
              </li>
            ))}
          {!isEmpty(notMultiDayEvents) &&
            notMultiDayEvents.map(event => (
              <li key={event._id} className="list-group-item">
                {event.name}
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default EventList;
