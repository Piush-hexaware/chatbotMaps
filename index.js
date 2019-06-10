"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);
restService.use(bodyParser.json());

restService.post("/api",function(req,res){
console.log("received a post request"+ JSON.stringify(req.body));
if(!req.body) return res.sendStatus(400);
res.setHeader('Content-Type','application/json');
let responseObj= null;
if(req.body.queryResult.intent.displayName == "Default Welcome Intent"){
  responseObj=  {"payload": {
    "google": {
      "expectUserResponse": true,
      "systemIntent": {
        "intent": "actions.intent.PERMISSION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.PermissionValueSpec",
          "optContext": "I can send you alerts. Would you like that?",
          "permissions": [
            "NAME",
            "DEVICE_PRECISE_LOCATION",
          ]
        }
      }
    }
  }
}
} else if (req.body.queryResult.intent.displayName == "permission") {
  console.log("inside permission"+ JSON.stringify(req.body))
  responseObj = {
    "payload": {
      "google": {
        "expectUserResponse": true,
        "richResponse": {
          "items": [
            {
              "simpleResponse": {
                "textToSpeech": "Thank You! How can i help you ?"
              }
            }
          ]
        }
      }
    }
  }
}
else if(req.body.queryResult.intent.displayName == "map"){
  console.log("**inside map**" + JSON.stringify(req.body))
  responseObj={
    "payload": {
      "google": {
        "expectUserResponse": true,
        "richResponse": {
          "items": [
            {
              "simpleResponse": {
                "textToSpeech": "This is a Basic Card:"
              }
            },
            {
              "basicCard": {
                "title": "Card Title",
                "image": {
                  "url": "https://maps.googleapis.com/maps/api/staticmap?center=Hexaware+Technologies+chennai&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyAWsvXenHXLG_RnVuzls5ZSWVu4InJYYn0",
                  "accessibilityText": "Google Logo"
                },
                "buttons": [
                  {
                    "title": "Button Title",
                    "openUrlAction": {
                      "url": "https://www.google.com"
                    }
                  }
                ],
                "imageDisplayOptions": "WHITE"
              }
            }
          ]
        }
      }
    }
  }
}

console.log("response data " + JSON.stringify(responseObj));
return res.json(responseObj);
});


restService.listen(process.env.PORT || 4000, function() {
  console.log("Server up and listening");
});