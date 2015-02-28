var express = require('express');
var router = express.Router();
var async = require('async');


//var FlightSchema = require('../schemas/kiplog');
//var db = require('../db');


//Firebase Setup
var Firebase = require("firebase");



//////////////////////////////////////////TEST///////////////////////////////////
var landing_page = "http://young-wave-7341.herokuapp.com/";

var DB = "https://boiling-heat-3507.firebaseio.com/";

var fArrayID = [];
fArrayID["sung"] = "simplelogin:4";
fArrayID["rawan"] = "simplelogin:2";
fArrayID["asha"] = "simplelogin:3";
fArrayID["diana"] = "simplelogin:5";
fArrayID["kirti"] = "simplelogin:6";
fArrayID["all"] = "simplelogin";


var fArray = [];
fArray["simplelogin:4"] = "sung" ;
fArray["simplelogin:2"] = "rawan" ;
fArray["simplelogin:3"] = "asha" ;
fArray["simplelogin:5"] = "diana" ;
fArray["simplelogin:6"] = "kirti" ;
fArray["simplelogin"] = "all" ;

var fEmails = [];
fEmails["simplelogin:4"] = "shk.kim@gmail.com" ;
fEmails["simplelogin:2"] = "harbi.rawan@gmail.com" ;
fEmails["simplelogin:3"] = "asha.spectrum@gmail.com" ;
fEmails["simplelogin:5"] = "diana.yang1028@gmail.com" ;
fEmails["simplelogin:6"] = "kirti.maharwal@gmail.com" ;

//////////////////////////////////////////PRODUCTION!!!///////////////////////////////////

/*var landing_page = "http://tincanit.herokuapp.com";

var DB = "https://tincan123.firebaseio.com/";
//fb with user 

var fArrayID = [];
fArrayID["lindsay"] = "simplelogin:3";
fArrayID["jen"] = "simplelogin:4";
fArrayID["esfal"] = "simplelogin:5";
fArrayID["agnes"] = "simplelogin:6";
fArrayID["all"] = "simplelogin";


var fArray = [];
fArray["simplelogin:3"] = "lindsay" ;
fArray["simplelogin:4"] = "jen" ;
fArray["simplelogin:5"] = "esfal" ;
fArray["simplelogin:6"] = "agnes" ;
fArray["simplelogin"] = "all" ;

var fEmails = [];
fEmails["simplelogin:3"] = "lindsay_marshall@emerson.edu" ;
fEmails["simplelogin:4"] = "jen@4fergs.com" ;
fEmails["simplelogin:5"] = "esfalstreau@gmail.com" ;
fEmails["simplelogin:6"] = "wasilewski.agnes@gmail.com" ;*/



////////////////////////////////////////////////////////////////////////////////////////////

var fb = new Firebase(DB);


///////////  tester page  ///////////
router.get('/timeline', function(req, res, next) {
  res.render('timeline');
  
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

router.post('/logout', function(req, res, next){
  
  var authData = fb.getAuth();
  if (authData) {
    fb.unauth();
    res.render('login');  
    
  } else {
    console.log("User is logged out");
    res.render('login');
  }
    

  
    
});


////////////// HOME POSTS ////////////////////



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





var fb2 = new Firebase(DB+"messages");

if(authData){   // check again if you are logged in!

    var findTimeStamp= req.body.timestamp;
    var logged_user = authData.uid;

    fb2.on("child_added", function(snap){

   var recivedMsg = snap.val();
   findTimeStamp = findTimeStamp.toString();
   findTimeStamp = findTimeStamp.slice(0,13);
  


    if( (recivedMsg.TimeStamp.toString() === findTimeStamp) &&
        (recivedMsg.toIdNum === logged_user) &&
        (recivedMsg.isLiked === false) )
    { 
      
        /// Sets the isLiked to TRUE
        
        console.log(recivedMsg.Msg);
        
        //Site: recivedMsg.Site,
       
        fb2.child(findTimeStamp).set({ From: recivedMsg.From, 
                                       To: recivedMsg.To,
                                       Msg: recivedMsg.Msg , 
                                       fromIdNum: recivedMsg.fromIdNum, 
                                       toIdNum: recivedMsg.toIdNum,
                                       Site: recivedMsg.Site,
                                       Title: recivedMsg.Title, 
                                       Time: recivedMsg.Time, 
                                       TimeStamp: recivedMsg.TimeStamp, 
                                       isLiked: true 
                                     });
    } 


  }) 
   
}



});




////////// HOME GET /////////////////////////


router.get('/home', function(req, res, next) {

    var fb = new Firebase(DB+"messages");
    var authData = fb.getAuth();
//puts in all Msg
		var fromArray = [];
		var msgArray =[];
		var urlArray = [];
		var timeArray = [];
		var routeArray = [];
    var timestampArray = [];
    var titleArray = [];
    var fromIDArray = [];
    var isLikedArray = [];



   // authData = true;
    if (authData) {

    async.series([
    function(callback){

    // connect it to DB 
    var logged_user = authData.uid;
    //var logged_user = "simplelogin:2";
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
            fromIDArray.push(recivedMsg.fromIdNum);
            isLikedArray.push(recivedMsg.isLiked);
                
               

            console.log(recivedMsg.isLiked);
            console.log(recivedMsg.isLiked.length);
            console.log(typeof recivedMsg.isLiked);

        		}
        
           j++;
          
          if(j==snap.numChildren())
          {
          callback();
          }
          
          
        });
  		})

    
  },function(callback){
    
    var logged_user = authData.uid;

    
   /* routeArray = routeArray.reverse();
    		fromArray = fromArray.reverse();
    		msgArray = msgArray.reverse();
    		urlArray = urlArray.reverse();
    		timeArray = timeArray.reverse();
    titleArray = titleArray.reverse();*/

    		var name = req.params.name;
            var str = name;



    
    res.render('home', { fromID: fromIDArray,
                       newroute: routeArray,
                           user: name,
                           from: fromArray,
                        message: msgArray,
                            url: urlArray,
                          title: titleArray,
                           time: timeArray,
                     timestampA: timestampArray,
                        isliked: isLikedArray
                      });  
    callback();
  }
]);



} else {
  console.log("User is logged out");
  res.render('login');
}});


///////////////  SAVED  SECTION ////////////////////////


router.get('/saved', function(req, res, next) {

  var fb = new Firebase(DB+"messages");
  var authData = fb.getAuth();


//puts in all Msg
//**************************
  var fromArray = [];
  var msgArray =[];
  var urlArray = [];
  var timeArray = [];
  var routeArray = [];
  var timestampArray =[];
  var titleArray = [];


  if (authData) {


  var logged_user = authData.uid;

  //var logged_user = "simplelogin:2";
  var name = req.params.name;
  var str = name;   
  

    fb.orderByChild("TimeStamp").on("child_added", function(snap) {

          var recivedMsg = snap.val();

          if( (recivedMsg.toIdNum === logged_user && recivedMsg.isLiked === true) ){   // CHECKS IF USER == MESSAGE ADDRESSEE


                     
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
            titleArray.push(recivedMsg.Title);
                    
          }
     });


  //routeArray = routeArray.reverse();
  /*fromArray = fromArray.reverse();
=======

  fromArray = fromArray.reverse();

  msgArray = msgArray.reverse();
  urlArray = urlArray.reverse();
  timeArray = timeArray.reverse();
   titleArray = titleArray.reverse();*/


 
    
  res.render('homep', { newroute: "HI" ,
                            user: name,
                            from: fromArray,
                         message: msgArray,
                             url: urlArray,
                           title: titleArray,
                            time: timeArray,
                      timestampA: timestampArray
                       }); 
  
} else {
//@  console.log("User is logged out");
  res.render('login');
}
          

});


/*router.get('/send', function(req, res, next) {


var requestedTitle = req.param('title');
var requestedURL = req.param('url');





var fArray = ["Sung","Rawan","Asha","Diana","Kirti"];   // TAKE OUT ARRAY;

res.render('send', { title:  requestedTitle, url: requestedURL, friendArray: fArray});
//res.render('send', { title:  newURL, friendArray: fArray});



});*/



///////////// SEND 2  ///////////////////



router.get('/send', function(req, res, next) {


  var requestedTitle = req.param('title');
  var requestedURL = req.param('url');
  var senderID = req.param('senderID');

console.log(senderID);

  if(requestedTitle == null){
    requestedTitle = "Untitled";
  }

  res.render('send', { title: requestedTitle,
                         url: requestedURL,
                 friendArray: fArrayID,
                    senderID: senderID
                  });
  



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

var senderIdNum = req.body.senderID;

console.log("///////////////////////////////////// senderIdNum ////////"+senderIdNum.substring(0,senderIdNum.length-1)+"//////");
console.log("///////////////////////////////////// sender Name////////"+fArray[sendReciver]+"//////");

var reciverIdNum = fArrayID[sendReciver];

var from= fArray[senderIdNum.substring(0,senderIdNum.length-1)];

console.log("///////////////////////////////////// reciverIdNum////////"+reciverIdNum);





var fb2 = new Firebase(DB+"messages"); 

console.log("////////////////////////sendReciver="+sendReciver+"////////");
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

if(sendReciver=="all")
{
  
  var sendTimeStamp = new Date().getTime();


  console.log("/////////////////////////////////////////////////////here in all");
  var i=0;

  for(var friend in fArrayID )
  {
    
    if(friend != "all" && friend != from )
    {


      console.log(friend+"///////////////"+fArrayID[friend]);
       fb2.child(sendTimeStamp+i).set({ From: from, To: friend, Msg: sendMsg , fromIdNum: senderIdNum, toIdNum: fArrayID[friend], Site: sendUrl, Title: sendTitle, Time: sendTime, TimeStamp: sendTimeStamp+i, isLiked: false});
      
      // send email 

// to: fEmails[fArrayID[friend]],

        transporter.sendMail({
          from: fEmails[senderIdNum.substring(0,senderIdNum.length-1)],
          to: "shk.kim@gmail.com",             //"harbi.rawan@gmail.com",
          subject: 'Make Room for a new notification from '+ from,
          text: ' New notification from' + from + '!',
          html: '<h3>'+from+' sent you something...<a href=landing_page>Check it out!</a> </h3>'
        });
      

      i++;
      
    }
  }
  
}
else {

console.log("/////////////////////sending email"+fEmails[senderIdNum.substring(0,senderIdNum.length-1)]+" "+fEmails[reciverIdNum.substring(0,senderIdNum.length-1)]);

//to: fEmails[reciverIdNum.substring(0,senderIdNum.length-1)],

transporter.sendMail({
  from: fEmails[senderIdNum.substring(0,senderIdNum.length-1)],
  to: "harbi.rawan@gmail.com",
  subject: 'Make Room for a new notification from '+ from,
  text: ' New notification from' + from + '!',
  html: '<h3>'+from+' sent you something...<a href="https://young-wave-7341.herokuapp.com">Check it out!</a> </h3>'
});


fb2.child(sendTimeStamp).set({ From: from, To: sendReciver, Msg: sendMsg , fromIdNum: senderIdNum, toIdNum: reciverIdNum, Site: sendUrl, Title: sendTitle, Time: sendTime, TimeStamp: sendTimeStamp, isLiked: false});


}
/*var userRec = { From:"sung", To: sendReciver, Msg: sendMsg , Site: sendUrl, Time: sendTime};
fb.push(userRec);*/


//var conformation = "Your message was sent to: " +  sendReciver + "\n\n With the msg: " + "\n" + sendMsg + "link:" + sendUrl;
var conformation = "Your message has been sent to " +  sendReciver ;

res.render('jazz', { conf : conformation });

});



/////////////   FRIEND PAGE      //////////////



router.post('/:name', function(req, res, next) {
  
  console.log("I am in FRIENDS!!!!!!!!!");

  var name = req.params.name;
  var fb = new Firebase(DB+"messages");
  var authData = fb.getAuth();


//puts in all Msg
//**************************
  var fromArray = [];
  var msgArray =[];
  var urlArray = [];
  var timeArray = [];
  var routeArray = [];
  var timestampArray =[];
  var titleArray = [];

var authData = fb.getAuth();
  if (authData) {

  var logged_user = authData.uid;

  //var logged_user = "simplelogin:2";
  var str = name;   
  var fromId = req.body.fromID;

  console.log("ID is " + fromId);

  fb.orderByChild("TimeStamp").on("child_added", function(snap) {



          var recivedMsg = snap.val();
          var findFrom = recivedMsg.fromIdNum;
          console.log(recivedMsg.fromIdNum);    

//          console.log(recivedMsg.fromIdNum.length);    
//          console.log(fromId.length);
          
          //findFrom = findFrom.toString();
          fromId = fromId.slice(0,13);

//          console.log(findFrom.length);    
//          console.log(fromId.length);
          

          if( (recivedMsg.toIdNum === logged_user) &&
              (recivedMsg.fromIdNum === fromId+" " ) &&
              (recivedMsg.isLiked === true) ){   // CHECKS IF USER == MESSAGE ADDRESSEE


                     
            var sign = "&"                               // MAKING NEW LINK //Why the &??
            var userName = logged_user;
            var addSign = sign.concat(userName); 
            var fromName = recivedMsg.fromIdNum;
            var newRoute = addSign.concat(fromName); 


            fromArray.push(recivedMsg.From)
            urlArray.push(recivedMsg.Site);
            msgArray.push(recivedMsg.Msg);
            timeArray.push(recivedMsg.Time);
            titleArray.push(recivedMsg.Title)
            timestampArray.push(recivedMsg.TimeStamp);
                    
          }
     })


  /*fromArray = fromArray.reverse();
  msgArray = msgArray.reverse();
  urlArray = urlArray.reverse();
  timeArray = timeArray.reverse();*/


 
    
res.render('homep', { newroute: "HI" ,
                          user: name,
                          from: fromArray,
                       message: msgArray,
                           url: urlArray,
                          time: timeArray,
                    timestampA: timestampArray,
                         title: titleArray
                     }); 
                    
                    
} else {
                    //@  console.log("User is logged out");
res.render('login');
}

          

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




/////////////  SHOW ALL SENTS!   //////////////


router.get('/sent', function(req, res, next) {
  
  console.log("I am in sent!!!!!!!!!!");

  var name = req.params.name;
  var fb = new Firebase(DB+"messages");
  var authData = fb.getAuth();


//puts in all Msg
//**************************
  var fromArray = [];
  var msgArray =[];
  var urlArray = [];
  var timeArray = [];
  var routeArray = [];
  var timestampArray =[];
  var titleArray = [];



  var logged_user = authData.uid;


  /// NOTICE THAT THE USER IS HARDCODED TO ME!!!
  //var logged_user = "simplelogin:4";
  var str = name;   
  
  
  fb.orderByChild("TimeStamp").on("child_added", function(snap) {



          var recivedMsg = snap.val();
          var findFrom = recivedMsg.fromIdNum.toString();
              findFrom = findFrom.slice(0,13);

          //console.log(recivedMsg.fromIdNum);    
          //console.log(recivedMsg.fromIdNum.length);
          //console.log(logged_user.length);

          if( findFrom === logged_user){   // CHECKS IF USER == MESSAGE ADDRESSEE


                     
            var sign = "&"                               // MAKING NEW LINK //Why the &??
            var userName = logged_user;
            var addSign = sign.concat(userName); 
            var fromName = recivedMsg.fromIdNum;
            var newRoute = addSign.concat(fromName); 


            fromArray.push(recivedMsg.To);      //  NOTE THAT THIS HAS CHANGED!!!!
            urlArray.push(recivedMsg.Site);
            msgArray.push(recivedMsg.Msg);
            timeArray.push(recivedMsg.Time);
            timestampArray.push(recivedMsg.TimeStamp);
            titleArray.push(recivedMsg.Title);
                    
          }
     })

/*
  fromArray = fromArray.reverse();
  msgArray = msgArray.reverse();
  urlArray = urlArray.reverse();
  timeArray = timeArray.reverse();
  timestampArray = timestampArray.reverse();
  titleArray = titleArray.reverse();
*/


 
    
res.render('homep', { newroute: "HI",
                          user: name,
                          from: fromArray,
                       message: msgArray,
                       title: titleArray,
                           url: urlArray,
                          time: timeArray,
                    timestampA: timestampArray
                     }); 
          

});



/////////////////////////////////////////////////////////////////


module.exports = router;

//needs testing 
function get_emails(callback)
{
  var emails = [];
  var j=0;
  for(var i=0; i< idsArray.length; i++)
  {
  var fb3 = new Firebase(DB+"users/"+idsArray[i]);
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

  var fb2 = new Firebase(DB+"users/"+authData.uid);
     
          
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



