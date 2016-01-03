//We need a simple way to look at user's badge count and Javascript points.
//Use Node.js to connect to Treehouse API to get info to print out
var https = require("https");
var http = require("http");
//var username = "chalkers";


//print out message
function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge (s) and " + points + " points in JavaScript";
  console.log(message);
}

//print out error messages
function printError(error){
  console.error(error.message);
}


function get(username){
//connect to the API URL (http://teamtreehouse.com/username.json)
var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response){      
  var body="";
//Read the data
  response.on('data', function(chunk) {
    body += chunk;
  });  
  response.on('end', function(){
    if(response.statusCode === 200){
      try {
           //Parse the data
        var profile =JSON.parse(body);
        //Print the data out
        printMessage(username, profile.badges.length, profile.points.JavaScript);
        } catch(error)  {
          //Parse Error
            printError(error);
    }
    } //end if  
    else{
      //status code error
      ///printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
      //printError({message: "There was an error getting the profile for " + username  + http.STATUS_CODES[response.statusCode]});
      printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
  } //end else
  });  //end response function
});


//connection error
request.on("error", printError);
}

module.exports.get = get;