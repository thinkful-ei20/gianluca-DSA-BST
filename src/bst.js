class BinarySearchTree {

	constructor(key=null, value=null, parent=null) {
		this.key = key;
		this.value = value;
		this.parent = parent;
		this.left = null;
		this.right = null;
	}

	insert(key, value) {

		/**
		 * if tree empty, insert as root
		 */

		if(this.key === null) {
			this.key = key;
			this.value = value;
		}

		/**
		 *	Else if tree isn't empty, starting from root i.e. this.key...
		 *
		 *	If the new key is less than current nodes key, then new node
		 *	will be in the left branch.
		 */
		else if(key < this.key) {
			/**
			 * if the current nodes left child is empty
			 * instantiate and add the value.
			 */
			if(this.left === null) {
				this.left = new BinarySearchTree(key, value, this);
			}
			/**
			 * If this node has a left child, then recursively call insert.
			 */
			else {
				this.left.insert(key,value);
			}
		}
		/**
		 * Else the new key must be greater than the current key...
		 */
		else {
			/**
			 * If the current nodes right child is empty
			 * instantiate and add the value.
			 */
			if(this.right === null) {
				this.right =  new BinarySearchTree(key, value, this);
			}
			/**
			 * If the node has a right child, then recursively call insert
			 */
			else {
				this.right.insert(key, value);
			}
		}
	}

	find(key) {
		/**
		 * base case: if the key is found, return the value
		 */
		if(this.key === key) {
			console.log('Key Found');
			//return { key: this.key, value: this.value };
			return this;
		}
		/**
		 * if the key is less than the root and
		 * if there is an existing left child,
		 * then follow the left child
		 */
		else if (key < this.key && this.left) {
			return this.left.find(key);
		}
		/**
		 * if the key is greater than the root and
		 * if there is an existing right child,
		 * then follow the right child
		 */
		else if(key > this.key && this.right) {
			return this.right.find(key);
		}
		/**
		 * The item is not in the search tree
		 */
		console.log('Key Not Found');
		return null;
	}

	remove(key) {
		/** Traverse the tree to find the right node with the 'key' */

		/** If we find the node... */
		if(this.key === key) {
			/** Node has two children... */
			if(this.left && this.right) {
				const replacement = this.right._findMin();
				this.key = replacement.key;
				this.value = replacement.value;
				replacement.remove(replacement.key);
			}
			/** Node has only left... */
			else if(this.left) {
				this._replaceWith(this.left);
			}
			/** Node has only right... */
			else if(this.right) {
				this._replaceWith(this.right);
			}
			/** Node has no children */
			else {
				this._replaceWith(null);
			}
		} else {
			if (key < this.key && this.left) {
				this.left.remove(key);
			}
			if(key > this.key && this.right) {
				this.right.remove(key);
			}
		}
		return null;
	}

	_replaceWith(node) {
		if(this.parent) {
			if(this === this.parent.left) {
				this.parent.left = node;
			}
			else if(this === this.parent.right) {
				this.parent.right = node;
			}
			if(node) {
				node.parent = this.parent;
			}
		}
		else {
			if (node) {
				this.key = node.key;
				this.value = node.value;
				this.left = node.left;
				this.right = node.right;
			}
			else {
				this.key = null;
				this.value = null;
				this.left = null;
				this.right = null;
			}
		}
	}

	_findMin(){
		if(!this.left) {
			return this;
		}
		return this.left._findMin();
	}

	_BrokenInsert(key, value) { /** Only for testing the isBST */

		/**
		 * if tree empty, insert as root
		 */

		if(this.key === null) {
			this.key = key;
			this.value = value;
		}

		/**
		 *	Else if tree isn't empty, starting from root i.e. this.key...
		 *
		 *	If the new key is less than current nodes key, then new node
		 *	will be in the left branch.
		 */
		else if(key > this.key) {
			/**
			 * if the current nodes left child is empty
			 * instantiate and add the value.
			 */
			if(this.left === null) {
				this.left = new BinarySearchTree(key, value, this);
			}
			/**
			 * If this node has a left child, then recursively call insert.
			 */
			else {
				this.left.insert(key,value);
			}
		}
		/**
		 * Else the new key must be greater than the current key...
		 */
		else {
			/**
			 * If the current nodes right child is empty
			 * instantiate and add the value.
			 */
			if(this.right === null) {
				this.right =  new BinarySearchTree(key, value, this);
			}
			/**
			 * If the node has a right child, then recursively call insert
			 */
			else {
				this.right.insert(key, value);
			}
		}
	}
}

/* [=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/]

	Drawing the BST with 'keys' inserted as in list from left to right...

	KEYS:
	----------------
	3,1,4,6,9,2,5,7,8
	----------------

	    3
	  /   \
    1       4
	 \	     \
	   2	   6
			 /   \
		    5	   9
				 /
				7
				  \
				    8

	Removing the 'root' i.e. 3 from the BST shown above...

	    4
	  /   \
    1       6
	 \	   /  \
	   2  5	    9
			   /
			  7

	[=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/]
*/

const getHeight = root => {

	if(root === null) {
		return -1;
	}

	const left = getHeight(root.left);
	const right = getHeight(root.right);

	return Math.max( left, right ) + 1;
};

const isBST = root => {

	if(root === null) {
		return true;
	}

	if( root.left !== null && root.left.key > root.key) {
		return false;
	}

	if( root.right !== null && root.right.key < root.key) {
		return false;
	}
	return !isBST(root.left) && !isBST(root.right);
};

const thirdLargest = ( root, obj ) => {
	if( root === null || obj.count >= obj.num ) {
		return;
	}

	thirdLargest(root.right, obj);

	obj.count++;

	if(obj.count === obj.num) {
		console.log(`${root.key} ${root.value} is the ${obj.num} largest node`);
	}

	thirdLargest(root.left, obj);
};

const isBalanced = root => {
	const left = getHeight(root.left);
	const right = getHeight(root.right);

	if( Math.abs(left - right) > 1) {
		return false;
	}
	return true;
};

/**[=/=/=/=/=/=/=/=/=/=/=/=TRAVERSAL FUNCTIONS=/=/=/=/=/=/=/=/=/=/]*/

const InOrderTraversal = (root) => {

	if(root === null) {
		return;
	}

	InOrderTraversal(root.left);
	console.log(root.key, root.value);
	InOrderTraversal(root.right);

};

const reverseOrderTraversal = (root) => {

	if(root === null){
		return;
	}

	reverseOrderTraversal(root.right);
	console.log(root.key, root.value);
	reverseOrderTraversal(root.left);
};


function main() {
	const BST = new BinarySearchTree();

	BST.insert(3, 3);
	BST.insert(1, 1);
	BST.insert(4, 4);
	BST.insert(6, 6);
	BST.insert(9, 9);
	BST.insert(2, 2);
	BST.insert(5, 5);
	BST.insert(7, 7);
	BST.insert(8, 8);

	/*

	 	//[=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=GET HEIGHT/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=]

		console.log('Height is: ', getHeight(BST));

	*/

	/*

		//[=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=IS A BST/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=]

	const brokenBST = new BinarySearchTree();

	brokenBST._BrokenInsert(3, 3);
	brokenBST._BrokenInsert(1, 1);
	brokenBST._BrokenInsert(4, 4);
	brokenBST._BrokenInsert(6, 6);
	brokenBST._BrokenInsert(9, 9);
	brokenBST._BrokenInsert(2, 2);
	brokenBST._BrokenInsert(5, 5);
	brokenBST._BrokenInsert(7, 7);
	brokenBST._BrokenInsert(8, 8);

	console.log('Is Tree: ',isBST(BST));
	console.log('Is Tree:', isBST(brokenBST));

	*/

	/*


		//[=/=/=/=/=/=/=/=/=/=/=/=/THIRD LARGEST (Nth LARGEST)/=/=/=/=/=/=/=/=/=/=/=/=/=]


	let obj = {
		count: 0,
		num: 5
	};
	thirdLargest(BST, obj);

	*/


	/*


		//[=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/BALANCED BST=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=]


	const test_unbalancedTree = {
		left: {
			left: {
				left:null,
				right: null,
			},
			right: {
				left:null,
				right:null
			}
		},
		right: {
			left : {
				left :{
					left :{
						left:null,
						right:null,
					},
					right: {
						left:null,
						right: null,
					}
				},
				right: {
					left: null,
					right: null,
				}
			},
			right : {
				left: {
					left: null,
					right: null
				},
				right: {
					left: {
						left: null,
						right: null
					},
					right: {
						left: null,
						right: null,
					}
				}
			}
		}
	};

	console.log('This tree is balanced: ',isBalanced(test_unbalancedTree));

	*/


	/*

		//[=/=/=/=/=/=/=/=/=/=/=/=/=/=TRAVERSAL FUNCTION TESTS=/=/=/=/=/=/=/=/=/=/=/=/=/=]



	console.log('[=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/]\n');

	InOrderTraversal(BST);

	console.log('\n[=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/]\n');

	reverseOrderTraversal(BST);

	*/

}

main();
