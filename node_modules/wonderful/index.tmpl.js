"use strict";

let words = [ %WORDS% ];


function random() {
  return words[Math.floor(Math.random() * words.length)]
}

module.exports = {default: words, random};
