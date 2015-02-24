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


authData = true;
if (authData) {

async.series([
  function(callback){

// connect it to DB 
 // var logged_user = authData.uid;
var logged_user = "simplelogin:2";

  		var name = req.params.name;
          var str = name;




  		





          // IF THERE IS A "&" MEANS THAT THIS IS A PERSONAL TIMELINE BETWEEEN TWO PEOPLE
      	//if(name.charAt(0) == "&" ){
       /* if(false ){

              var firstUserNum = str.slice(1,5);
              var secondUserNum = str.slice(5,9);
              console.log("USER #1: " + firstUserNum + "#2: " + secondUserNum);
              console.log("AT SECOND STOP !!! NOT THIRD");

      		fb.on("child_added", function(snap) {

      		var recivedMsg = snap.val();
      


                          //AGAIN THIS SHOULD BE THE LOGGED IN TO THE WEBPAGE            // THIS IS FROME THE SEOND PEROSN 
      		if( (recivedMsg.toIdNum.toString() === firstUserNum) && 
                  (recivedMsg.fromIdNum.toString() === secondUserNum) 
                  && (recivedMsg.isLiked === true)  ){

      		
      		
      		//routeArray.push(newRoute);
      		fromArray.push(recivedMsg.From)
      		urlArray.push(recivedMsg.Site);
      		msgArray.push(recivedMsg.Msg);
      		timeArray.push(recivedMsg.Time);

      		}

      		//routeArray = routeArray.reverse();
      		fromArray = fromArray.reverse();
      		msgArray = msgArray.reverse();
      		urlArray = urlArray.reverse();
      		timeArray = timeArray.reverse();


          // res.render('showPersonal', { newroute: routeArray  , user: name,  from: fromArray,  message: msgArray, url: urlArray, time: timeArray, timestampA: timestampArray }); 


      		})
          }else{*/   // THIS IS THE CASE WHEN THE USER JUST LOGS IN -> INBOX

            //  var firstUserNum = str.slice(0,4);   // ONE USE SO TAKE ONE SLICE // fitiching it from Auth instead 
 //@             console.log("USER is: " + logged_user);
              


      		fb.orderByChild("TimeStamp").on("value", function(snap) {

      	
      
      //console.log(snap.numChildren());
      //console.log(snap.numChildren());
      
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


    
    res.render('home', { newroute: routeArray  , user: name,  from: fromArray,  message: msgArray, url: urlArray, time: timeArray, timestampA: timestampArray }); 
    callback();
  }
]);







} else {
  console.log("User is logged out");
  res.render('login');
}





});

router.get('/send', function(req, res, next) {

var requestedUrl =  req.url;	
//requestedUrl;
//var requestedUrl = req.protocol + '://' + req.url;	
  var tester1 = req.protocol;
  var tester2 = req.get('Host');
  var tester3 = req.url;

var uri_dec = decodeURIComponent(requestedUrl);
var strLeng = uri_dec.length
var newURL = uri_dec.slice(6,strLeng);







var fArray = ["Sung","Rawan","Asha","Diana","Kirti"];   // TAKE OUT ARRAY;


res.render('send', { title:  newURL, friendArray: fArray});


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
var sendUrl = req.body.url;
var sendMsg = req.body.msg;
var sendTimeStamp = new Date().getTime();

var reciverIdNum = "simplelogin:2";
var senderIdNum = "simplelogin:4";

var urlLength = sendUrl.length;
var sendUrl = sendUrl.slice(4,urlLength+1);





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

fb2.child(sendTimeStamp).set({ From: "sung", To: sendReciver, Msg: sendMsg , fromIdNum: senderIdNum, toIdNum: reciverIdNum, Site: sendUrl, Time: sendTime, TimeStamp: sendTimeStamp, isLiked: false});

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



