const express        = require('express'),
      bodyParser     = require('body-parser'),
      ejs            = require('ejs'),
      methodOverride = require('method-override'),
      $				 = require('jquery'),
      mongoose       = require('mongoose'),
      Event          = require('./models/event');

const app = express();
const router = express.Router();
const eventRoutes = require('./routes/event');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use('/', router);
app.use(eventRoutes);

var promise = mongoose.connect('mongodb://127.0.0.1/HotNightEvents');

router.get('/', function(req, res){
    res.render('home');
});

router.get('/login', function(req, res){
	res.render('login');
})

router.get('/register', function(req, res){
	res.render('register');
})

app.listen(process.env.PORT || 3000, function(){
    console.log('Server Spinning Up!');
});