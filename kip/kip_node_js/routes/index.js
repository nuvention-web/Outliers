var express = require('express');
var router = express.Router();



console.log("working till here");
/* GET home page. */
router.get('/', function(req, res, next) {

var requestedUrl =  req.url;	
//requestedUrl;
  //var requestedUrl = req.protocol + '://' + req.url;	
  var tester1 = req.protocol;
  var tester2 = req.get('Host');
  var tester3 = req.url;

var uri_dec = decodeURIComponent(requestedUrl);

var strLeng = uri_dec.length

var newURL = uri_dec.slice(6,strLeng);


/* mail works!!!
  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport();
	transporter.sendMail({
	    from: 'shk.kim@gmail.com',
	    to: 'shk.kim@gmail.com',
	    subject: 'hello',
	    text: requestedUrl
	});

*/


res.render('index', { title: newURL});




});


//router.use(express.bodyParser());


router.post('/jazz', function(req, res, next) {


var name = req.body.name;
var msgs = req.body.msg;

var names = ["Sung","Rawan","Asha","Diana","Kirti"];
var emails = ["shk.kim@gmail.com", "harbi.rawan@gmail.com","asha@gmail.com","diana@gmail.com","Kirti@gmail.com"]
var email;
for (var i = 0; i < names.length; i++) {
	if(names[i] == name){
		email= emails[i];
		break; 
	}
}




  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport();
	transporter.sendMail({
	    from: 'shk.kim@gmail.com',
	    to: email,
	    subject: 'hello',
	    text: msgs
	});


//res.render('users');

//res.send('You sent the name "' + req.body.name + '".');

res.render('jazz',{to: email, msg: msgs })



});





module.exports = router;

