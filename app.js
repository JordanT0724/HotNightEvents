var   express               = require('express'),
      bodyParser            = require('body-parser'),
      ejs                   = require('ejs'),
      methodOverride        = require('method-override'),
      multer                = require('multer'),
      path                  = require('path'),
      mongoose              = require('mongoose'),
      passport              = require('passport'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      //eventSession          = require('express-session'),
      Event                 = require('./models/event'),
      User                  = require('./models/user')

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(methodOverride('_method'));

//require and setup options for express-session
app.use(require('express-session')({
  secret: "Simon is the best in the world",
  resave: false,
  saveUninitialized: false
}));
//PASSPORT CONFIGURATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var router = express.Router();
var eventRoutes = require('./routes/event');
var adminRoutes = require('./routes/admin');

app.use('/', router);
app.use(eventRoutes);
app.use(adminRoutes);



mongoose.connect(process.env.DATABASEURL);

app.listen(process.env.PORT || 3000, function(){
    console.log('Server Spinning Up!');
});