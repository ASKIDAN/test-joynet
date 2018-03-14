let RequestQueue = require('../middlewares/requestLimit');
let queue = new RequestQueue(3);

let rootRouter = (app) => {

    app.get('/', (req, res) => {
        queue.push(() => {
            queue.getStatus();
            queue.finished();
        });
        queue.push(() => {
            queue.getStatus();
            queue.finished();
        });
        queue.push(() => {
            queue.getStatus();
            queue.finished();
        });
        queue.push(() => {
            queue.getStatus();
            queue.finished();
        });
        queue.push(() => {
            queue.getStatus();
            queue.finished();
        });
        queue.push(() => {
            queue.getStatus();
            queue.finished();
        });
        queue.push(() => {
            queue.getStatus();
            queue.finished();
        });
        queue.push(() => {
            queue.getStatus();
            queue.finished();
        });
        queue.push(() => {
            queue.getStatus();
            queue.finished();
        });
        queue.push(() => {
            queue.getStatus();
            queue.finished();
        });
        queue.push(() => {
            queue.getStatus();
            queue.finished();
        });
    });
};

module.exports = rootRouter;