function Lexer(rules) {
  this.rules = [];
  rules.forEach(function(rule) {
    this.rules.push({
      regexp : new RegExp("^" + rule[0], rule[1] || ""),
      token : rule[2],
    });
  }, this);
};

Lexer.prototype.parse = function(input) {
  var
  tokens = [],
  lastLen = input.length;
  this.error = null,
  parsedLen = 0,
  parsedStr = "";

  while(input.length > 0) {
    for(var i = 0; i < this.rules.length; i++) {
      var
      match = input.match(this.rules[i].regexp);
      if(match) {
        match = match.pop();
        if(this.rules[i].token) {
          tokens.push({
            match : match,
            token : this.rules[i].token,
          });
        }
        parsedLen += match.length;
        parsedStr += match;
        input = input.slice(match.length);
      }
    }

    if(input.length === lastLen) {
      this.error = {
        pos : parsedLen,
        parsed : parsedStr,
        remaining : input,
      };
      return tokens;
    }
    lastLen = input.length;
  }
  return tokens;
};



var grammer = {
  lex : {
    rules : [
      ["\\s+"],
      ["[a-z][a-z_0-9]*",      "i", "VAR"],
      ["[0-9]+(?:\\.[0-9]+)?", "",  "NUM"],
      ["\\+",                  "",  "+"],
      ["-",                    "",  "-"],
      ["\\*",                  "",  "*"],
      ["\\/",                  "",  "/"],
      ["\\^",                  "",  "^"],
      ["\\(",                  "",  "("],
      ["\\)",                  "",  ")"],
      ["$",                    "",  "EOF"],
    ],
  },

  operators : [
    ["left", "+", "-"],
    //NUM * e => e must have priority over NUM => e
    ["left", "NUM"],
    ["left", "*", "/"],
    ["left", "^"],
    ["left", "UMINUS"],
  ],

  bnf : {
    "EQN" : [["T EOF"]],
    "T" : [
      ["T + T"],
      ["T - T"],
      ["T * T"],
      ["T / T"],
      ["T ^ NUM"],
      ["NUM * T"],
      ["- T"],
      ["( T )"],
      ["VAR"],
      ["NUM"],
    ],
  },
};
