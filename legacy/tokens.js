var
inheritance = require("./utils/inheritance.js");

function Tokens(tokens) {
  Tokens.parent.call(this, {});
  this.tokens = tokens;
  this.cur = 0;
}
inheritance.inherit(inheritance.Base, Tokens, {

  next : function() {
    if(this.cur >= this.tokens.length) return undefined;
    return this.tokens[this.cur++];
  },

  back : function(c) {
    c = c || 1;
    if(this.cur + c <= this.tokens.length) {
      this.cur -= c;
    }
  },

  isEmpty : function() {
    return this.cur >= this.tokens.length;
  },
});

module.exports = Tokens;
