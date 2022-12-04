class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(element = null, priority = 1) {
        if (typeof priority !== 'number') {
            throw new Error("Priority Has to be a numeric value");
        }
        if (this.queue.length === 0) {
            this.queue.push({ element, priority });
            return;
        }

        let idx = this.queue.findIndex(ele => ele.priority < priority);

        if (idx === -1) {
            this.queue.push({ element, priority });
        } else {
            this.queue.splice(idx, 0, { element, priority });
        }
    }

    dequeue() {
        return this.queue.shift();
    }

    top() {
        return this.queue[0];
    }
    
    isEmpty() {
        return this.queue.length === 0;
    }
}

module.exports = PriorityQueue;