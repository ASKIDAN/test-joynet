let request = require('request');
let config = require('config');
let url = require('url');
let FunctionsQueue = require('../modules/functionsQueue');
let queue = new FunctionsQueue(3);

let rootRouter = (app) => {

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/../public/index.html');
    });

    app.get('/testqueue', (req, res) => {
        for (i = 0; i < 10; i++) {
            console.log('push');
            queue.push(() => {
                setTimeout(() => {
                    queue.finished();
                    console.log('finish. in queue: ', queue.getStatus().queue.length);
                }, 500);
            });
        }
        res.status(200).send();
    });

    app.get('/getrepos', (req, res) => {
        queue.push(() => {
            request({
                url: 'https://api.github.com/orgs/facebook/repos',
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'test-joynet'
                },
                auth: {
                    user: config.get('GithubAPI.user'),
                    pass: config.get('GithubAPI.pass')
                }
            }, (err, response, body) => {
                res.status(200).send(JSON.stringify(body));
                queue.finished();
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
                    'User-Agent': 'test-joynet'
                },
                auth: {
                    user: config.get('GithubAPI.user'),
                    pass: config.get('GithubAPI.pass')
                }
            }, (err, response, body) => {
                res.status(200).send(JSON.stringify(body));
                queue.finished();
            });

        });
    });
};

module.exports = rootRouter;