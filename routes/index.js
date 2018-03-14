let {reqLim, status, dec } = require('../middlewares/requestLimit');

let rootRouter = (app) => {
    app.get('/', reqLim, (req, res)=>{
        //dec();
        status();
        res.send("Hello world")
    });
};

module.exports = rootRouter;