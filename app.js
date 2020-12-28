var http = require('http'),
    path = require('path'),
    express = require('express'),
    fs = require('fs'),
    xmlParse = require('xslt-processor').xmlParse,
    xsltProcess = require('xslt-processor').xsltProcess;

var router = express();
var server = http.createServer(router);

router.get('/', function(req, res) {

    res.writeHead(200, {'Content-Type': 'text/html'});

    var xml = fs.readFileSync('perfume_shop.xml', 'utf8'); //Reading xml file
    var xsl = fs.readFileSync('perfume_shop.xsl', 'utf8');

    var doc = xmlParse(xml); //Parsing xml file
    var stylesheet = xmlParse(xsl);

    var result = xsltProcess(doc, stylesheet); //XSL Transformation

    res.end(result.toString()); 

});

server.listed(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);

});