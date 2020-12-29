var http = require('http'),
    path = require('path'),
    express = require('express'),
    fs = require('fs'),
    xmlParse = require('xslt-processor').xmlParse,
    xsltProcess = require('xslt-processor').xsltProcess,
    xml2js = require('xml2js');

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'views')));
router.use(express.urlencoded({extented: true}));
router.use(express.json());

function xmlFiletoJs(filename, cb) {
    var filepath = path.normalize(path.join(__dirname, filename));
    fs.readFile(filepath, 'utf-8', function(err, xmlStr) {
        if (err) throw (err);
        xml2js.parseString(xmlStr, {}, cb);
    });
}

function jsToXmlFile(filename, obj, cb) {
    var filepath = path.normalize(path.join(__dirname, filename));
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj);
    fs.unlinkSync(filepath);
    fs.writeFile(filepath, xml, cb);
}

router.get('/', function(req, res) {

    res.render('index');

});

router.get('/', function(req, res) {

    res.writeHead(200, {'Content-Type': 'text/html'});

    var xml = fs.readFileSync('perfume_shop.xml', 'utf8'); //Reading xml file
    var xsl = fs.readFileSync('perfume_shop.xsl', 'utf8');

    var doc = xmlParse(xml); //Parsing xml file
    var stylesheet = xmlParse(xsl);

    var result = xsltProcess(doc, stylesheet); //XSL Transformation

    res.end(result.toString()); 

});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);

});