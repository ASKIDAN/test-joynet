class RequestQueue {
    constructor(limit = 1){
        this.state = {
                limit: limit,
                index: 0,
                queue: []
        };
    }

    _pushReq(func){
        this.state.queue.push(func);
    }

    _popReq(){
        return this.state.queue.pop();
    }

    _callReq(func) {
        func();
        this.state.index++;
    }

    getStatus(){
        console.log(this.state)
    }

    push(func) {
        if (this.state.index < 3) {
            this._callReq(func);
        } else {
            this._pushReq(func);
        }
    }

    finished() {
        this.state.index--;
        let buff = this.state.queue.pop();
        if (buff) this._callReq();
    }
}


module.exports = RequestQueue;