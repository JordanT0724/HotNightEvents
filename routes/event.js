var express    = require('express');
var	router     = express.Router({mergeParams: true});
var Event      = require('../models/event');
var multer     = require('multer');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');

//Body Parser
//app.use(bodyParser.urlencoded({extended:true}));

//Multer Setup
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
     var filename = Date.now();
     switch (file.mimetype) {
      case 'image/png':
      filename = filename + ".png";
      break;
      case 'image/jpeg':
      filename = filename + ".jpeg";
      break;
      case 'image/jpg':
      filename = filename + ".jpg";
      break;
      default:
      break;
    }
    cb(null, filename);
  }
});
var fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get('/', function(req, res){
  Event.find({}, function(err, data){
    if(err){
      console.log(err);
    } else {
      var nextDate = nextEventDate(data);
      var nextEvent = data.find(function(obj){
        return obj.eventDate == nextDate;
      });
      res.render('./events/index', {data: data, nextEvent: nextEvent});   
    }
  });
});

router.get('/events/calendar', function(req, res){
	res.render('./events/calendar');
});

router.get('/events/new', function(req, res){
	res.render('./events/new');
});

router.post('/events', upload.single('image'), function(req, res){
  var newTags = {fineDining: req.body.fineDining, banquetHall: req.body.banquetHall, asian: req.body.asian, disco: req.body.disco, casual: req.body.casual, french: req.body.french, jazz: req.body.jazz, buffet: req.body.buffet, american: req.body.american, seafood: req.body.seafood, ratPack: req.body.ratPack, italian: req.body.italian, vegan: req.body.vegan, liveEntertainment: req.body.liveEntertainment, motown: req.body.motown, bar: req.body.bar, mediterranean: req.body.mediterranean, vegetarian: req.body.vegetarian, rock: req.body.rock, freestyle: req.body.freestyle, nightClub: req.body.nightClub, cuban: req.body.cuban, glutenFree: req.body.glutenFree, top40: req.body.top40, hiphopRB: req.body.hiphopRB, byob: req.body.byob, pet: req.body.pet, freeAdmission: req.body.freeAdmission}; 
  var event = new Event({
		_id: mongoose.Types.ObjectId(),
		eventName: req.body.eventName,
    details: req.body.details,
    path: req.file.path,
		image: req.file.filename,
    location: req.body.location,
    featured: req.body.featured,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    displayContactName: req.body.displayContactName,
    displayContactPhone: req.body.displayContactPhone,
    displayContactEmail: req.body.displayContactEmail,
    eventDate: req.body.eventDate,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    cost: req.body.cost,
    tags: newTags,
    website: req.body.website,
    tickets: req.body.tickets,
    contactName: req.body.contactName,
    contactPhone: req.body.contactPhone,
    contactEmail: req.body.contactEmail,
    audience: req.body.audience,
    eventType: req.body.eventType
	});
	event.save(function(err, data){
		if(err){
			console.log(err);
		} else {
      //console.log(data)
			res.redirect('/');
		}
	});
});

router.get('/events/:_id', function(req, res){
  Event.findById(req.params._id, function(err, data){
    if(err){
      console.log(err);
    } else {
      res.render('./events/show', {data: data})
    }
  });
});

module.exports = router;	

function nextEventDate(arr){
  var dateArr = [];
    for(var i = 0; i < arr.length; i++){
      dateArr.push(arr[i].eventDate);
    }
    var sortedDateArr = dateArr.sort(function(a, b ){
      return a-b;
    });
    return sortedDateArr[0];
}