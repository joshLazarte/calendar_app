# Ideal final application features:

* user registers
* user is asked to confirm email
* user is auto logged in once they confirm email
* user is taken to their dasboard
	* dashboard shows their calendar
	* all events are dynamically loaded into calendar
	* events are color-coded by event type and by if the user owns the event
	* dashboard also shows buttons to create/update/delete events and button to share event
* user creates an event
* event is added to calendar
* clicking event displays a pop up with the event details and options to edit/delete/share
* event types can be:
	* single 
	    * all day
		* designated time slot
	* recurring
		* monthly
		* 	by date
		* 	by weekday
	* weekly
	* biweekly
		* 	1st and 3rd
		* 	2nd and 4th
	* multi-day
* user can choose to share an event with another user
	* user clicks share event button
	* user enters (email?) (username?) of user they wish to share with
    * selected user is (emailed?) (notified in app?) of the event
    * selected user can accept or decline event
		* if accepted, event is added to selected users calendar
		* if declined, event is not added
	* user is informed via (email?) (in app notification?) of selected users response
    * both users are added to that events atendees
	* only the event creator can edit/delete the event
