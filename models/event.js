var mongoose = require('mongoose');

//Schema Setup

var eventSchema = new mongoose.Schema({
	eventName: String,
	//timeStart: String,
	//timeEnd: String,
	address: String,
	city: String,
	state: String,
	image: String
	//dateStart: Date,
	//dateEnd: Date,
	//contact: String,
	//phone: Number,
	//venueType: String,
	//created: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Event', eventSchema);

/*
Event Name- input
Event Details-text area
Event Picture - input - browse file button
Optional-Create thumbnail for the event- radio button(boolean)
Optional-Be added to the deaured events list- radio button(boolean)
Location Name- input
Address - input
City- input
State - select dropdown 50 States
Zip Code input
Contact Name - input
Contact Phone - input
Single Day Event -radio button
	Date -input - popup calendar or dropdown.
Multiple Day Event -radio button
	Start Date - input 
	End Date - input
Reoccuring Event - radio
	Sunday through Saturday radio buttons
	Start Date- input
	End Date - input
Start Time - select dropdown 1-12
	AM/PM select
End Time - select dropdown 1-12
	AM/PM -selecr
Cost -  input
Event Type= select- dropdown
Audience Type- select dropdown
Sponsor - input (company name)
Website - input (url)
Tickets - input (url)
Client Name - input
Client Phone - input
Client Email - input (url) 


*/