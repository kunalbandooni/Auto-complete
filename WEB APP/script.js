class TrieNode {
    constructor(c) {
        this.data = c;
        this.children = {};
        this.isEnd = false;
    }
}
  
class Trie {
    constructor() {
        this.root = new TrieNode('');
    }
 
    insert(word) {
        let node = this.root; 
        for (let ch of word) {
            if (node.children[ch]== null) 
                node.children[ch] = new TrieNode(ch);
            node = node.children[ch];            
        }
        node.isEnd = true;
    }
 
    autocomplete(prefix) {
        var node = this.root;
        var res = [];
        for (let ch of prefix) {
            node = node.children[ch];
            if (node == null)
                return res;
        }
        this.helper(node, res, prefix.substring(0, prefix.length-1));
        return res;
    }
 
    helper(node, res, prefix) {
        if (node.isEnd) 
            res.push(prefix + node.data);         
        for (let child in node.children)  //array
            this.helper(node.children[child], res, prefix + node.data);       
    }
} 

const t = new Trie();

t.insert("get it"); 
t.insert("getson"); 
t.insert("got it"); 			 
t.insert("amazon");
t.insert("apple");
t.insert("amazing");
t.insert("flipkart");
t.insert("adobe");

// DOM work starts here :) by NIGGA
var search_bar = document.querySelector('.search-input');
var search_btn = document.querySelector('#search-btn');
var insert_btn = document.querySelector('#insert-btn');
var suggestion = document.querySelector('.rect');

insert_btn.onclick = function(){
    t.insert(search_bar.value);
}

document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    console.log(t.autocomplete(search_bar.value+charStr));
    suggestion.textContent = t.autocomplete(search_bar.value+charStr)[0];
};


// n = t.autocomplete(search_bar.value+charStr).length;
// rect.style.heighy = n*30px;