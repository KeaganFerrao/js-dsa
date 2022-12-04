class LinkedListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    add(element) {
        let node = new LinkedListNode(element);
        let current;

        if (this.head == null) {
            this.head = node;
        } else {
            current = this.head;

            while (current.next) {
                current = current.next;
            }

            current.next = node;
        }
        this.size++;
    }

    insertAt(element, index) {
        if (index < 0 || index >= this.size) {
            throw new Error("Enter a valid List Index");
        }

        let node = new LinkedListNode(element);
        let curr, prev;

        curr = this.head;

        if (index == 0) {
            node.next = this.head;
            this.head = node;
        } else {
            let idx = 0;
            while (idx < index) {
                idx++;
                prev = curr;
                curr = curr.next;
            }

            node.next = curr;
            prev.next = node;
        }

        this.size++;
    }

    removeAt(index) {
        if (index < 0 || index >= this.size) {
            throw new Error("Enter a valid List Index");
        }

        let curr, prev, idx = 0;
        curr = this.head;
        prev = curr;

        if (index == 0) {
            this.head = curr.next;
        } else {
            while (idx < index) {
                idx++;
                prev = curr;
                curr = curr.next;
            }

            prev.next = curr.next;
        }
        this.size--;
    }

    printList() {
        let curr = this.head;
        let str = "";
        while (curr) {
            str += (curr.value + ' -> ');
            curr = curr.next;
        }

        str += 'null';

        console.log(str);
    }

    *traverse() {
        let curr = this.head;
        while (curr) {
            yield curr.value;
            curr = curr.next;
        }
    }

    reverse() {
        let curr = this.head;
        let prev = null;
        let next;

        while (curr) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }

        this.head = prev;
    }

    reverseRecursive() {
        function _reverse(curr, prev) {
            if (!curr) return prev;

            let next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
            return _reverse(curr, prev);
        }

        this.head = _reverse(this.head, null);
    }

    detectLoop() {
        if (this.size === 0) {
            return false;
        }

        let slow_ptr = this.head;
        let fast_ptr = this.head;

        while (slow_ptr && fast_ptr && fast_ptr.next) {
            slow_ptr = slow_ptr.next;
            fast_ptr = fast_ptr.next.next;

            if (slow_ptr === fast_ptr) {
                return true;
            }
        }

        return false;
    }

    deleteList() {
        this.head = null;
        this.size = 0;
    }

}

module.exports = LinkedList;