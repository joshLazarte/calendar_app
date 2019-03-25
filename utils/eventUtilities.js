const User = require('../models/Users');

module.exports = {
    getEventAttendees:  async (owner, isShared, attendees) => {
        const attendeesArray = [owner];
        if(isShared) {
            const attendeesToAdd = attendees.split(',');
            for (let attendee of attendeesToAdd) {
                const user = await User.findOne({ userName: attendee });
                if(!user) throw new Error(`Listed attendee ${attendee} does not exist`);
                const attendingUser = { userName: user.userName, id: user._id };
                attendeesArray.push(attendingUser);
            }
        }
        return attendeesArray;
    },
    
    getEventCreator: async (creator) => {
        const user = await User.findOne({ userName: creator });
        const eventCreator = {
            userName: user.userName,
            id: user._id
        };
        return eventCreator;
    }
};