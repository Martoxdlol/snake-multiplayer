var http = require('http');
var fs = require('fs');
var path = require('path');
var https = require("https");

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/tomascichero.net/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/tomascichero.net/cert.pem'),
  requestCert: false,
  rejectUnauthorized: false
};



function logger(r, resdata){
    if (r) {
        this.url = r.url;
        this.os = getOs(r);
        this.ip = r.connection.remoteAddress;
    }
    this.time = new Date();
    this.info = {};
    this.save = function(){
        //GUARDAR ARCHIVO
        var filename = "";
        if(r.url == "/"){
            filename = "INDEX";
        }
        this.info.url = this.url;
        this.info.os = this.os;
        this.info.ip = this.ip;
        this.info.time = this.time;
        if (this.res) {
            this.info.res = this.res+"";
        }else{
            this.info.res = "";
        };
        console.log(this.info)
        var textdata = JSON.stringify(this.info);
        var writeStream = fs.createWriteStream('./logs/'+this.time.getTime()+filename+".txt");
        writeStream.write(textdata);
        writeStream.end();


    }
}

function getOs(rq){
    var ua = rq.headers['user-agent'],
    $ = {};

if (/mobile/i.test(ua))
    $.Mobile = true;

if (/like Mac OS X/.test(ua)) {
    $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
    $.iPhone = /iPhone/.test(ua);
    $.iPad = /iPad/.test(ua);
}

if (/Android/.test(ua))
    $.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];

if (/webOS\//.test(ua))
    $.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];

if (/(Intel|PPC) Mac OS X/.test(ua))
    $.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;

if (/Windows NT/.test(ua))
    $.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];

return $;

}
var appfunc = function (req, response) {
    var log = new logger(req)
   console.log(req.subdomains);

    var filePath = './public' + req.url;
    if (filePath == './public/')
        filePath = './public/index.html';

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
            log.res = filePath;
            log.save()
            console.log("")
        }
    });





}

http.createServer(function(req,res){
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);
var server = https.Server(options, appfunc);
server.listen(443)

console.log('Server running at http://127.0.0.1:8001/');
