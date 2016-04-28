var http = require("http");
var connect = require('connect');
var serveStatic = require('serve-static');
var gith = require('gith').create(9001);
var execFile = require('child_process').execFile;

console.log('\n\n--- Node Version: ' + process.version + ' ---');

// Set up Connect routing
var app = connect()
    .use(serveStatic(__dirname + '/public'))
    .use(function(req, res) {
        console.log('Could not find handler for: ' + req.url);
        res.end('Could not find handler for: ' + req.url);
    })
    .use(function(err, req, res, next) {
        console.log('Error trapped by Connect: ' + err.message + ' : ' + err.stack);
        res.end('Error trapped by Connect: ' + err.message);
    });

// Start node server listening on specified port -----
http.createServer(app).listen(80);

console.log('HTTP server listening on port 80');

gith({

	repo: 'drewgaze/no.place'

}).on('all', function(payload) {

	if (payload.branch === 'master') {

		execFile('./build.sh', function(error, stdout, stderr) {

			console.log('rebuilt');
		});
	}
});