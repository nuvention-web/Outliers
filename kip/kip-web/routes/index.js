var express = require('express');
var router = express.Router();
var async = require('async');


//var FlightSchema = require('../schemas/kiplog');
//var db = require('../db');


//Firebase Setup
var Firebase = require("firebase");
//fb with user 
var fb = new Firebase("https://boiling-heat-3507.firebaseio.com/");



///////////  tester page  ///////////
router.get('/e', function(req, res, next) {
  res.render('loginExtn');
  
});


router.get('/', function(req, res, next) {

var authData = fb.getAuth();
if (authData) {
//@  console.log("User " + authData.uid + " is logged in with " + authData.provider);
  res.redirect('home');
  
} else {
//@  console.log("User is logged out");
  res.render('login');
}






});

router.post('/home', function(req, res, next) {

var authData = fb.getAuth();
if(!authData){


fb.authWithPassword({
  email    : req.body.email,
  password : req.body.pass
}, function(error, authData) {
  if (error) {
  	res.render('login');
//@    console.log("Login Failed!", error);
  } else {
  	 res.redirect('home');
//@    console.log("Authenticated successfully with payload:", authData);
  }
});
}





var fb2 = new Firebase("https://boiling-heat-3507.firebaseio.com/messages");

if(authData){   // check again if you are logged in!

    var findTimeStamp= req.body.timestamp;
    
    fb2.on("child_added", function(snap){

    var recivedMsg = snap.val();
   findTimeStamp = findTimeStamp.toString();
   findTimeStamp = findTimeStamp.slice(0,13);

    if( (recivedMsg.TimeStamp.toString() === findTimeStamp) &&  (recivedMsg.isLiked === false) )
    { 
        /// Sets the isLiked to TRUE
        //******************** add title
        fb2.child(findTimeStamp).set({ From: recivedMsg.From, 
                                       To: recivedMsg.To,
                                       Msg: recivedMsg.Msg , 
                                       fromIdNum: recivedMsg.fromIdNum, 
                                       toIdNum: recivedMsg.toIdNum,
                                       Site: recivedMsg.Site, 
                                       Time: recivedMsg.Time, 
                                       TimeStamp: recivedMsg.TimeStamp, 
                                       isLiked: true });
    } 


  }) 
   
}



});


router.get('/home', function(req, res, next) {

var fb = new Firebase("https://boiling-heat-3507.firebaseio.com/messages");
var authData = fb.getAuth();
//puts in all Msg
		var fromArray = [];
		var msgArray =[];
		var urlArray = [];
		var timeArray = [];
		var routeArray = [];
        var timestampArray = [];
         var titleArray = [];


authData = true;
if (authData) {

async.series([
  function(callback){

// connect it to DB 
 // var logged_user = authData.uid;
var logged_user = "simplelogin:2";

  		var name = req.params.name;
          var str = name;



      		fb.orderByChild("TimeStamp").on("value", function(snap) {

      	
        
      var j=0;
      snap.forEach(function(childSnapshot) {
        	var recivedMsg = childSnapshot.val();
        //       console.log(snap.val());
        		if(recivedMsg.toIdNum === logged_user){   // CHECKS IF USER == MESSAGE ADDRESSEE


               // console.log("HERE!!!!!!!!!!!!");
        		var sign = "&"                               // MAKING NEW LINK //Why the &??
        		var userName = logged_user;
        		var addSign = sign.concat(userName); 
        		var fromName = recivedMsg.fromIdNum;
        		var newRoute = addSign.concat(fromName); 


        		routeArray.push(newRoute);
        		fromArray.push(recivedMsg.From);
        		urlArray.push(recivedMsg.Site);
        		msgArray.push(recivedMsg.Msg);
        		timeArray.push(recivedMsg.Time);
            timestampArray.push(recivedMsg.TimeStamp);
            titleArray.push(recivedMsg.Title);
                
               



        		}
        
           j++;
          
          if(j==snap.numChildren())
          callback();
          
          
        });
       

      


  		})



          





        //  res.render('show', { newroute: routeArray  , user: name,  from: fromArray,  message: msgArray, url: urlArray, time: timeArray, timestampA: timestampArray }); 

  //}







    
  },function(callback){
    
    var logged_user = authData.uid;

    		var name = req.params.name;
            var str = name;

                   routeArray = routeArray.reverse();
                		fromArray = fromArray.reverse();
                		msgArray = msgArray.reverse();
                		urlArray = urlArray.reverse();
                		timeArray = timeArray.reverse();
                titleArray = titleArray.reverse();


    
    res.render('home', { newroute: routeArray  , user: name,  from: fromArray,  message: msgArray, url: urlArray, title: titleArray, time: timeArray, timestampA: timestampArray });  
    callback();
  }
]);







} else {
  console.log("User is logged out");
  res.render('login');
}





});



router.get('/saved', function(req, res, next) {

  var fb = new Firebase("https://boiling-heat-3507.firebaseio.com/messages");
  var authData = fb.getAuth();


//puts in all Msg
//**************************
  var fromArray = [];
  var msgArray =[];
  var urlArray = [];
  var timeArray = [];
  var routeArray = [];
  var timestampArray =[];



  //  var logged_user = authData.uid;

  var logged_user = "simplelogin:2";

  var name = req.params.name;
  var str = name;   
  

    fb.orderByChild("TimeStamp").on("child_added", function(snap) {

          var recivedMsg = snap.val();

          if( (recivedMsg.toIdNum === logged_user) && (recivedMsg.isLiked === true) ){   // CHECKS IF USER == MESSAGE ADDRESSEE


                     // console.log("HERE!!!!!!!!!!!!");
            var sign = "&"                               // MAKING NEW LINK //Why the &??
            var userName = logged_user;
            var addSign = sign.concat(userName); 
            var fromName = recivedMsg.fromIdNum;
            var newRoute = addSign.concat(fromName); 


            //routeArray.push(newRoute);
            fromArray.push(recivedMsg.From)
            urlArray.push(recivedMsg.Site);
            msgArray.push(recivedMsg.Msg);
            timeArray.push(recivedMsg.Time);
            timestampArray.push(recivedMsg.TimeStamp);
                    
          }
     })

  //routeArray = routeArray.reverse();
  fromArray = fromArray.reverse();
  msgArray = msgArray.reverse();
  urlArray = urlArray.reverse();
  timeArray = timeArray.reverse();


 
    
res.render('homep', { newroute: "HI"  , user: name,  from: fromArray,  message: msgArray, url: urlArray, time: timeArray, timestampA: timestampArray }); 
          

});


router.get('/send', function(req, res, next) {


var requestedTitle = req.param('title');
var requestedURL = req.param('url');





var fArray = ["Sung","Rawan","Asha","Diana","Kirti"];   // TAKE OUT ARRAY;

res.render('send', { title:  requestedTitle, url: requestedURL, friendArray: fArray});
//res.render('send', { title:  newURL, friendArray: fArray});



});

router.get('/send2', function(req, res, next) {


  var requestedTitle = req.param('title');
  var requestedURL = req.param('url');
  var senderID = req.param('senderID');





  var fArray = ["sung","rawan","asha","diana","kirti"];   // TAKE OUT ARRAY;

  res.render('send', { title:  requestedTitle, url: requestedURL, friendArray: fArray, sender: sender});
  //res.render('send', { title:  newURL, friendArray: fArray});



  });
  



//////////// THIS IS THE PAGE AFTER SUBMIT //////////


router.post('/jazz', function(req, res, next) {


var dateObj =  new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getDate();
var year = dateObj.getFullYear();
var sec = dateObj.getSeconds();

var seconds = dateObj.getSeconds();
var minutes = dateObj.getMinutes();
var hour = dateObj.getHours();

var sendTime = year + "/" + month + "/" + day;  //+  " - " + hour + ":" + minutes + ":" + seconds; 
var sendReciver = req.body.name.toLowerCase();
//var sendSender = req.body.Sname.toLowerCase();
var sendUrl = req.body.url;
var sendMsg = req.body.msg;
var sendTitle = req.body.title;
var sendTimeStamp = new Date().getTime();

console.log("///////////////////////////////////// Title in db"+sendTitle);

var reciverIdNum = "simplelogin:2";
var senderIdNum = "simplelogin:4";

//var urlLength = sendUrl.length;
//var sendUrl = sendUrl.slice(4,urlLength+1);


/*fArray = ["sung","rawan","asha","diana","kirti"];
var ids = ["simplelogin:4", "simplelogin:2","simplelogin:3","implelogin:5","implelogin:6"]
for (var i = 0; i < fArray.length; i++) {
  if(fArray[i] == sendReciver){
    reciverIdNum= ids[i];
  }
  
  if(fArray[i] == sendSender){
    senderIdNum= ids[i];
  }
}*/



// send email 

/*var fArray = ["sung","rawan","asha","diana","kirti"];
var emails = ["shk.kim@gmail.com", "harbi.rawan@gmail.com","asha@gmail.com","diana@gmail.com","Kirti@gmail.com"]
var email;
for (var i = 0; i < fArray.length; i++) {
	if(fArray[i] == sendReciver){
		email= emails[i];
		break; 
	}
}




  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport();
	transporter.sendMail({
	    from: 'shk.kim@gmail.com',
	    to: email,
	    subject: 'Sung sent you a KIP',
	    text: 'http://young-wave-7341.herokuapp.com/show/'+sendReciver
	});
*/
var fb2 = new Firebase("https://boiling-heat-3507.firebaseio.com/messages"); 

fb2.child(sendTimeStamp).set({ From: "sung", To: sendReciver, Msg: sendMsg , fromIdNum: senderIdNum, toIdNum: reciverIdNum, Site: sendUrl, Title: sendTitle, Time: sendTime, TimeStamp: sendTimeStamp, isLiked: false});

/*var userRec = { From:"sung", To: sendReciver, Msg: sendMsg , Site: sendUrl, Time: sendTime};
fb.push(userRec);*/


//var conformation = "Your message was sent to: " +  sendReciver + "\n\n With the msg: " + "\n" + sendMsg + "link:" + sendUrl;
var conformation = "Your message has been sent to " +  sendReciver ;

res.render('jazz', { conf : conformation });

});






///////////// THIS IS WHAT SHOWS  ////////////////////



  
router.get('/friends', function(req, res, next){
  
  var authData = fb.getAuth();
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    get_friends(function (idsArray,namesArray) {
      
      res.render('friends',{ id: idsArray , name: namesArray});
      
    });
    
  } else {
    console.log("User is logged out");
    res.render('login');
  }
    

  
    
});


module.exports = router;

//needs testing 
function get_emails(callback)
{
  var emails = [];
  var j=0;
  for(var i=0; i< idsArray.length; i++)
  {
  var fb3 = new Firebase("https://boiling-heat-3507.firebaseio.com/users/"+idsArray[i]);
  fb3.on("value", function(snap) {
    
    emails[i] = snap.val().email;
    j++;
    if(j==idsArray.length)
     callback(emails);
    
  });
  }
  
}


function get_friends(callback)
{
  
  
var idsArray = [];  
  var namesArray=[];
  var i=0;
  var authData = fb.getAuth();
  var users;

  var fb2 = new Firebase("https://boiling-heat-3507.firebaseio.com/users/simplelogin:2");
     
          
fb2.on("value", function(snap) {

          users = snap.child("friends");
          
          var j=0;
          users.forEach(function(childSnapshot) {
            {
              
               idsArray[j] = childSnapshot.key();
               namesArray[j] = childSnapshot.val();

              j++;
              
            }
           
          if(j == users.numChildren())
          {      
                 callback(idsArray,namesArray); 
                
          }
          
             
            });
            
            });          
        

    
}







//console.log("here: \n" );
//console.log(msgArray);
//d1.save();

//console.log ("THIS IS THE RESULT:\n" + JSON.stringify(d1) +"\n");

//var d2 = new FlightSchema();
//d2 = FlightSchema.find({name : "james"});

//console.log ("THIS IS THE RESULT:\n" + d2 +"\n");



//console.log(snap.val().name.toString());











/* 
if(snap.val().From == "Sung"){
console.log("Pushing....");
var s = snap.val().Msg

}
*/









/*
var setData = "Sender: Sung To: " + name + " link: " + url + "Msg: " +msgs;  
msgArray.unshift(setData);
*/



/*

db.collection('recs').insert(document, function(err, records) {
		if (err) throw err;
		console.log("Record added as "+records[0]._id);
	});


*/





/*
if(name == "rawan"){


  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport();
	transporter.sendMail({
	    from: 'shk.kim@gmail.com',
	    to: 'harbi.rawan@gmail.com',
	    subject: 'Check this OUT!',
	    text: msgs
	});


}else{

res.send("It did not go through");


}
*/


