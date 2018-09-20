var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/www"));
var port = process.env.PORT || 6000;
app.listen(port);
console.log('server started '+ port);
