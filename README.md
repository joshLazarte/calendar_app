ideal final version workflow:

1 user registers
2 user is asked to confirm email
3 user is auto logged in once they confirm email
4 user is taken to their dasboard
	4.1 dashboard shows their calendar
	4.2 all events are dynamically loaded into calendar
	4.3 events are color-coded by event type and by if the user owns the event
	4.4 dashboard also shows buttons to create/update/delete events and button to share event
5 user creates an event
6 event is added to calendar
7 clicking event displays a pop up with the event details and options to edit/delete/share
8 event types can be :
	a. single 
		1 all day
		2 designated time slot
	b. recurring
		1 monthly
			a. by date
			b. by weekday
		2 weekly
		3 biweekly
			a. 1st and 3rd
			b. 2nd and 4th
	c. multi-day
9 user can choose to share an event with another user
	9.1 user clicks share event button
	9.2 user enters (email?) (username?) of user they wish to share with
	9.3 selected user is (emailed?) (notified in app?) of the event
	9.4 selected user can accept or decline event
		a. if accepted, event is added to selected users calendar
		b. if declined, event is not added
	9.5 user is informed via (email?) (in app notification?) of selected users response
	9.6 both users are added to that events atendees
	9.7 only the event creator can edit/delete the event
