let request = require('request');
let config = require('config');
let url = require('url');
let FunctionsQueue = require('../libs/functionsQueue');
let queue = new FunctionsQueue(3);

let rootRouter = (app) => {

    app.post('/', (req, res) => {
        for (i = 0; i < 10; i++) {
            queue.push(() => {
                setTimeout(() => {
                    queue.finished();
                    console.log('finish. in queue: ', queue.getStatus().queue.length);

                }, 500);
            });
        }
    });
    app.get('/getrepos', (req, res) => {
        queue.push(() => {
            request({
                url: 'https://api.github.com/orgs/facebook/repos',
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': 'token ' + config.get('GithubAPI.token'),
                    'User-Agent': 'test-joynet'
                }
            }, (err, response, body) => {
                res.status(200).send(body);
            });
        });
    });
    app.get('/getcommits', (req, res) => {
        queue.push(() => {
            let param = url.parse(req.url, req.url);

            request({
                url: 'https://api.github.com/repos/' + param.query.repo + '/commits',
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': 'token ' + config.get('GithubAPI.token'),
                    'User-Agent': 'test-joynet'
                }
            }, (err, response, body) => {
                res.status(200).send(body);
            });
        });
    });
};

module.exports = rootRouter;