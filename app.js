var    express     = require('express');
//   methodOverride = require('method-override');
// expressSanitizer = require('express-sanitizer');
       app         = express();
       bodyParser  = require('body-parser');
       mongoose    = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//app config
	
mongoose.connect("mongodb://localhost/ngo2");//database changed
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));
// app.use(express.Sanitizer());
// app.use(methodOverride("_method"));//_method is for what it should look in the url

app.get('/', function(req , res){
	res.sendFile('C:/Users/Aabha Pingle/Documents/GitHub/NGO-Website/index.html');
});

app.get('/about', function(req , res){
	res.redirect('aboutus','html');
});

app.get('/blog', function(req , res){
	res.redirect('blog','html');
});

app.listen(3000 , function(){
	console.log('The ngo2 server has started.');
});