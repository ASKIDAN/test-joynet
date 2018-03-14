class CacheManager {
    constructor(duration = 10000) {
        this.duration = duration;
        this.store = [];
    }

    push(key, value) {
        this.store.push({key, value});
        setTimeout(()=>{
            this.remove(key);
        }, this.duration);
    }

    get(key) {
        return this.store.find((item)=>{
            return item.key === key;
        });
    }

    remove(key) {
        this.store = this.store.filter((item)=>{
            return item.key !== key;
        })
    }
}

module.exports = CacheManager;