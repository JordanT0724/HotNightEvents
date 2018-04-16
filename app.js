var   express        = require('express'),
      bodyParser     = require('body-parser'),
      ejs            = require('ejs'),
      methodOverride = require('method-override'),
      multer         = require('multer'),
      path           = require('path'),
      mongoose       = require('mongoose'),
      Event          = require('./models/event');

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


var app = express();
var router = express.Router();
var eventRoutes = require('./routes/event');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use('/', router);
app.use(eventRoutes);

mongoose.connect('mongodb://jordant0724:celicax69@ds121464.mlab.com:21464/hotnightevents');

app.listen(process.env.PORT || 3000, function(){
    console.log('Server Spinning Up!');
});