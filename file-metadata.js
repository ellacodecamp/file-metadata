"use strict";

var express = require("express");
var multer  = require('multer');
require("dotenv").load();

var app = express();
var port = process.env.PORT || 8080;
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

var path = process.cwd();
app.use(express.static(path + "/public"));

app.post("/api/fileanalyse", upload.any(), function (req, res) {
  // When multer processes multipart/form-data form, it will store all upload
  // files in req,files and all other input fields in req.body
  if (req.files && req.files.length > 0) {
    var fileInfo = {
      'name': req.files[0].originalname,
      'size': req.files[0].size,
      'encoding': req.files[0].encoding,
      'mimetype': req.files[0].mimetype
    };
    res.set("Content-Type", "application/json");
    res.send(JSON.stringify(fileInfo));
  }
  else
  {
    console.log("Sending 400");
    res.status(400).end();
  }
});

app.listen(port,  function () {
  console.log("Node.js listening on port " + port + "...");
});
