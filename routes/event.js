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
    res.render('./events/index');
});

router.get('/events', function(req, res){
	res.render('./events/calendar');
});

router.get('/events/new', function(req, res){
	res.render('./events/new');
});

router.post('/events', upload.single('image'), function(req, res){
  var newTags = {fineDining: req.body.fineDining, banquetHall: req.body.banquetHall, asian: req.body.asian, fundraiser: req.body.fundraiser, disco: req.body.disco, casual: req.body.casual, restaurant: req.body.restaurant, french: req.body.french, dancing: req.body.dancing, jazz: req.body.jazz, buffet: req.body.buffet, american: req.body.american, seafood: req.body.seafood, festival: req.body.festival, ratPack: req.body.ratPack, brunch: req.body.brunch, italian: req.body.italian, vegan: req.body.vegan, liveEntertainment: req.body.liveEntertainment, motown: req.body.motown, bar: req.body.bar, mediterranean: req.body.mediterranean, vegetarian: req.body.vegetarian, rock: req.body.rock, freestyle: req.body.freestyle, nightClub: req.body.nightClub, cuban: req.body.cuban, glutenFree: req.body.glutenFree, top40: req.body.top40, hiphopRB: req.body.hiphopRB, byob: req.body.byob, twentyOne: req.body.twentyOne, eighteen: req.body.eighteen, family: req.body.family, pet: req.body.pet, freeAdmission: req.body.freeAdmission}; 
	var event = new Event({
		_id: new mongoose.Types.ObjectId(),
		eventName: req.body.name,
    details: req.body.details,
		image: req.file.filename,
    location: req.body.location,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    displayContactName: req.body.contactName,
    displayContactPhone: req.body.contactPhone,
    eventDate: req.body.eventDate,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    cost: req.body.cost,
    tags: newTags,
    contactName: req.body.contactName,
    contactPhone: req.body.contactPhone,
    contactEmail: req.body.contactEmail
	});
	event.save(function(err, data){
		if(err){
			console.log(err);
		} else {
			console.log(data);
			res.redirect('/');
		}
	});
});

module.exports = router;	

	