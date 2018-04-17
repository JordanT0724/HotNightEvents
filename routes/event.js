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
      default:
      break;
    }
    cb(null, filename);
  }
});
var fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
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
	var event = new Event({
		_id: new mongoose.Types.ObjectId(),
		eventName: req.body.name,
		image: req.file.filename
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

	