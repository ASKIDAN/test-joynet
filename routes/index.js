const request = require('request');
const config = require('config');
const url = require('url');
const FQueue = require('../modules/functionsQueue');

const rootRouter = (app) => {
    const COUNT = config.get("API.per_page");
    const queue = new FQueue(config.get("API.maxQueue"));

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
        const recReq = (page, dat) => {
            let data = dat;
            queue.push(() => {
                request({
                    url: 'https://api.github.com/orgs/facebook/repos?page=' + page + '&per_page=' + COUNT,
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
                    let bdata = JSON.parse(body);
                    console.log(typeof bdata);

                    if (bdata.length && bdata.length === COUNT) {
                        data = data.concat(bdata);
                        queue.finished();
                        recReq(++page, data);
                    } else {
                        data = data.concat(bdata);
                        res.status(200).send(data);
                        queue.finished();
                    }

                });
            });
        };
        recReq(0, []);

    });

    app.get('/getcommits', (req, res) => {
        queue.push(() => {
            let param = url.parse(req.url, req.url);
            request({
                url: 'https://api.github.com/repos/' + param.query.repo + '/commits?per_page=' + config.get("API.per_page"),
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
                res.status(200).send(JSON.parse(body));
                queue.finished();
            });

        });
    });
};

module.exports = rootRouter;