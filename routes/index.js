let request = require('request');
let config = require('config');
let url = require('url');
let FunctionsQueue = require('../modules/functionsQueue');
let queue = new FunctionsQueue(3);

let rootRouter = (app) => {

    app.get('/', (req, res) => {
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
                    'Authorization':  config.get('GithubAPI.authBasic'),
                    'User-Agent': 'test-joynet'
                }
            }, (err, response, body) => {
                res.status(200).send(JSON.parse(body));
            });
        });
    });

    app.get('/getcommits', (req, res) => {
        const COUNT = 100;
        queue.push(() => {
            let param = url.parse(req.url, req.url);
            request({
                url: 'https://api.github.com/repos/' + param.query.repo + '/commits?per_page=' + COUNT,
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization':  config.get('GithubAPI.authBasic'),
                    'User-Agent': 'test-joynet'
                }
            }, (err, response, body) => {
                res.status(200).send(JSON.parse(body));
            });

        });
    });
};

module.exports = rootRouter;