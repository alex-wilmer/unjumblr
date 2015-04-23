// Modified version of Andy E's answer
// http://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
String.prototype.shuffle = function () {
  if (this.length > 1) {
    var charArray = this.split('')
      , stringLength = charArray.length;

    for(var index = stringLength - 1; index > 0; index--) {
      var randomIndex = Math.floor(Math.random() * (index + 1))
        , tmp = charArray[index];

      charArray[index] = charArray[randomIndex];
      charArray[randomIndex] = tmp;
    }

    // If shuffled word is the same as original, shuffle again!
    return (
      charArray.join('') === this.toString()
        ? this.shuffle()
        : charArray.join('')
    );
  }

  else return this.toString();
};
// Callback functions should be the last argument!
// setTimeout(fn, 0) should be called something else like setNext(fn)
delay = (ms, fn) => {
  return setTimeout(fn, ms);
};

loop = (ms, fn) => {
  return setInterval(fn, ms);
};
