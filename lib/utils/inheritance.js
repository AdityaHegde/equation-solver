module.exports = {
  inherit : function(parent, child, members) {
    child.prototype = new parent();
    child.prototype.constructor = child;
    child.parent = parent;

    for(var m in members) {
      child.prototype[m] = members[m];
    }
  },

  Base : function(config) {
    for(var c in config) {
      this[c] = config[c];
    }
  },
};
