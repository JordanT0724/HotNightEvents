var mongoose = require('mongoose');

//Schema Setup

var eventSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	eventName: {type: String},
	details: {type: String},
	location: {type: String},
	image: {type: String},
	approve: {type: String},
	address: {type: String},
	city: {type: String},
	state: {type: String},
	zipCode: {type: Number},
	displayContactName: {type: String},
	displayContactPhone: {type: String},
	eventDate: {type: Date},
	startDate: {type: Date},
	endDate: {type: Date},
	startTime: {type: String},
	endTime: {type: String},
	cost: {type: String}
	
});

module.exports = mongoose.model('Event', eventSchema);
