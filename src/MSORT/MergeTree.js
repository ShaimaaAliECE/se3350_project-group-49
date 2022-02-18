export class MergeTree {
    val;
    open = true;
    parent = null;
    left = null;
    right = null;
    constructor(val) {
        this.val = val;
        this.open = val.length!==1;
    }
    addChild(child) {
        if (this.left == null) {
            this.left = child;
        } else if (this.right == null) {
            this.right = child;
        }
        else this.close();
    }
    setParent(parent) {
        this.parent = parent;
    }
    close() {this.open = false;}
    leaf() {return this.left == null};
    print() {
        if (this.leaf()) return this.val;
        if (this.right !== null) return [this.val,this.left.print(),this.right.print()];
        return [this.val,this.left.print()];
    }
    root() {
        if (this.parent === null) return this;
        return this.parent.root();
    }
    full() {return this.right !== null;}
}