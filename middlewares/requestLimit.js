let requestQueue = [];
let inc = 0;
let incr = ()=>{
    inc++;
    requestQueue.push(inc);
};
exports.inc = incr;

let dec = ()=>{
    inc--;
    requestQueue.pop();
};
exports.dec = dec;

let status = ()=>{
    console.log(inc, requestQueue);
};
exports.status = status;

let requestLimit = (req, res, next) => {
    incr();
    status();
    next();
};

exports.reqLim = requestLimit;