class FunctionsQueue {
    constructor(limit = 1){
        this.state = {
                limit: limit,
                index: 0,
                queue: []
        };
    }

    _pushCallback(callback){
        this.state.queue.push(callback);
    }

    _popReq(){
        return this.state.queue.pop();
    }

    _callCallback(callback) {
        this.state.index++;
        callback();
    }

    getStatus(){
        return this.state;
    }

    push(callback) {
        if (this.state.index < 2) {
            this._callCallback(callback);
        } else {
            this._pushCallback(callback);
        }
    }

    finished() {
        this.state.index--;
        let callback = this.state.queue.pop();
        if (callback) this._callCallback(callback);
    }
}


module.exports = FunctionsQueue;