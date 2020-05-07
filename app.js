var    express     = require('express');
  methodOverride   = require('method-override');
expressSanitizer   = require('express-sanitizer');
       app         = express();
       bodyParser  = require('body-parser');
       mongoose    = require("mongoose");

// //Loads the handlebars module
// const handlebars = require('express-handlebars');

//Sets our app to use the handlebars engine

//Sets handlebars configurations (we will go through them later on)
// app.engine('handlebars', handlebars({
// layoutsDir: __dirname + '/views/layouts',
// }));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//app config
	
mongoose.connect("mongodb://localhost/ngo_db");//database changed
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.static('images'));
app.use(expressSanitizer());
app.use(methodOverride("_method"));//_method is for what it should look in the url

//model config
//for database 
var VolunteerSchema = new mongoose.Schema({
	name : String, 
	email : String ,
	resume : String ,
	created :{type: Date, default: Date.now}
})
var Volunteer = mongoose.model("Volunteer" , VolunteerSchema);

// Volunteer.create({
// 	name: "A P",
// 	email: "namesurname@gmail.com" ,
// 	resume : "I am a good Volunteer."
// })

app.get('/', function(req, res){
	res.render('index');
});

app.get('/about', function(req , res){
	res.render('aboutus');
});

app.get('/blog', function(req , res){
	res.render('blog');
});

app.get('/done', function(req , res){
	res.render('done');
});

app.get('/gallery', function(req , res){
	res.render('gallery');
});

app.get('/indiafightscorona', function(req , res){
	res.render('indiafightscorona');
});

app.get('/new', function(req , res){
	res.render('new');
});

//create new
app.post('/done',function(req , res){
	console.log(req.body);
	req.body.Volunteer.body = req.sanitize(req.body.Volunteer.body)
    console.log('=========')
	console.log(req.Volunteer);
	Volunteer.create(req.body.Volunteer , function(err , newVolunteer){
		if (err) {
			console.log(err)
			res.render('new');
		}else{
			res.redirect('/done');
		}
	})
})

app.get('/soh1', function(req , res){
	res.render('soh1');
});

app.get('/soh2', function(req , res){
	res.render('soh2');
});

app.get('/soh3', function(req , res){
	res.render('soh3');
});

app.get('/soh4', function(req , res){
	res.render('soh4');
});

app.get('/contactus', function(req , res){
	res.render('contactus');
});

app.listen(3000 , function(){
	console.log('The ngo2 server has started.');
});