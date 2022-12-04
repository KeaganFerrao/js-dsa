class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.parent = null;
    }
    // root – left child – right child
    *preOrderTraversal(node = this.parent) {
        if (node == null) {
            return;
        }

        yield node.value;
        yield * this.preOrderTraversal(node.left);
        yield * this.preOrderTraversal(node.right);
    }
    // left child – root – right child
    *inOrderTraversal(node = this.parent) {
        if (node == null) {
            return;
        }

        yield * this.InOrderTraversal(node.left);
        yield node.value;
        yield * this.InOrderTraversal(node.right);
    }
    // left child – right child – root
    *postOrderTraversal(node = this.parent) {
        if (node == null) {
            return;
        }

        yield * this.postOrderTraversal(node.left);
        yield * this.postOrderTraversal(node.right);
        yield node.value;
    }

    height(node = this.parent) {
        if (node == null) {
            return 0;
        }

        let lDepth = this.height(node.left);
        let rDepth = this.height(node.right);

        if (lDepth > rDepth) {
            return (lDepth + 1);
        } else {
            return (rDepth + 1);
        }
    }

    *levelOrderTraversal() {
        const queue = [];
        queue.push(this.parent);

        while (queue.length !== 0) {
            let temp = queue.shift();
            yield temp.value;

            if (temp.left != null) {
                queue.push(temp.left);
            }

            if (temp.right != null) {
                queue.push(temp.right);
            }
        }
    }
    
    insertInLevelOrder(element) {
        const node = new Node(element);
        if (this.parent == null) {
            this.parent = node;
            return;
        }
        const queue = [];
        queue.push(this.parent);

        while (queue.length !== 0) {
            let temp = queue.shift();

            if (temp.left != null) {
                queue.push(temp.left);
            } else {
                temp.left = node;
                return;
            }

            if (temp.right != null) {
                queue.push(temp.right);
            } else {
                temp.right = node;
                return;
            }
        }
    }

    /**
     * To be implemented...
     */
    deleteNode() {}
}

module.exports = BinaryTree;