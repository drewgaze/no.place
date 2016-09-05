const http = require('http'),
      connect = require('connect'),
      serveStatic = require('serve-static'),
      githooked = require('githooked'),
      markdown = require('markdown-parse'),
      fs = require('fs'),
      send = require('connect-send-json');

console.log('\n\n--- Node Version: ' + process.version + ' ---');

// Set up Connect routing
var app = connect()
    .use(serveStatic(__dirname + '/public'))
    .use(send.json())
    .use('/posts', function(req, res, next) {

        var results = [];

        var fileNames = fs.readdirSync(__dirname + '/public/posts/');

        fileNames.forEach(function(fileName) {

            var content = fs.readFileSync(__dirname + '/public/posts/' + fileName, 'utf-8');

            markdown(content, function(err, result) {

                results.push(result);
            });
        });

        res.send(results);
    })
    .use(function(req, res) {
        console.log('Could not find handler for: ' + req.url);
        res.end('Could not find handler for: ' + req.url);
    })
    .use(function(err, req, res, next) {
        console.log('Error trapped by Connect: ' + err.message + ' : ' + err.stack);
        res.end('Error trapped by Connect: ' + err.message);
    });

githooked('refs/heads/master', 'git pull && npm install').listen(9001);

// Start node server listening on specified port -----
http.createServer(app).listen(3000);

console.log('HTTP server listening on port 3000');