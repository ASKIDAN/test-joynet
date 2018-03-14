let express = require('express'),
    http = require('http'),
    config = require('config'),
    router = require('./routes'),
    bodyParser = require('body-parser');

let app = express();

let allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.set('port', config.get('server.port'));

app.use(express.static(__dirname + '/public', {maxAge: 60000}));
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router(app);

app.use(function (req, res) {
    res.send(404, "Page not found");
});

http.createServer(app).listen(app.get('port'), () => {
    console.log("Express server listening on port %d in mode %s", app.get('port'), app.get('env'));
});