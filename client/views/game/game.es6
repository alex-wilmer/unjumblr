let $ = Session
  , wordLength = 4
  , difficulty = 40 // increase wordLength every 40 points
  , gameIsOver = false;

Template.game.helpers({
  letters: function () {
    if ($.get('jumbledWord') && typeof $.get('jumbledWord').map === 'function') {
      return (
        $.get('jumbledWord').map(function (letter, index) {
          return {
            letter: letter
          , index: index
          };
        })
      );   // So many brackets..
    }     //  Coffeescript is nice for this!
  }
});

Template.game.rendered = () => {
  let guess = ''
    , round = 1
    , roundTime = 30 // seconds
    , numberOfChosenLetters = 0
    , getWord = () => {
        countDown(() => {
          HTTP.call('GET', wordnik.getRandom(wordLength), (error, result) => {
            if (error) {
              console.log(error); // Throwing an error would be better
            }

            else {
              $.set('unjumbledWord', result.data.word);
              $.set('jumbledWord', result.data.word.shuffle().split(''));
              $.set('time', roundTime);
              $.set('loop',
                loop(1000, () => {
                  $.set('time', $.get('time') - 1);

                  if ($.get('time') === 0) {
                    clearInterval($.get('loop'));
                    gameOver();
                  }
                })
              );
              delay(200, () => { // reveal letters!
                jQuery('.letter').removeClass('folded');
              });
            }
          });
        });
      }

    , checkAnagram = (word, callback) => {
        HTTP.call('GET', wordnik.checkWord(word), (error, result) => {
          if (error) { // this API call fails more than half of the time!!
            checkAnagram(word, callback);
          }

          else {
            result = JSON.parse(result.content);
            if (result.totalResults) {
              callback(true);
            }
            else callback(false);
          }
        });
      }

    , validGuess = chosenLetter => {
        numberOfChosenLetters += 1; // more readable and editable than '++'
        guess += chosenLetter;
      }

    , setLetters = word => {
        jQuery('.letter').addClass('folded').removeClass('active');
        delay(500, () => {
          $.set('jumbledWord', word.split(''));
          setNext(() => { // throw into next event cycle
            jQuery('.letter').removeClass('folded');
          });
        });
      }

    , reset = () => {
        guess = '';
        numberOfChosenLetters = 0;
        jQuery('.letter').removeClass('active').removeClass('shake');
      }

    , gameOver = () => {
        let score = $.get('score');
        gameIsOver = true;
        setLetters('Game over!');
        $.set('gameOverClass', 'fade-in');

        if (score > 0) {
          let highScore = Scores.findOne({player: Meteor.user()});

          if (highScore) {
            if (highScore.score < score) {
              Scores.update(highScore._id, {
                $set: {
                  score: score
                }
              });
            } // Don't create a new entry for a lower score.
          }

          else {
            Scores.insert({
              player: Meteor.user()
            , score: $.get('score')
            });
          }
        }
      }

    , leaveGame = route => {
        jQuery('.letter').addClass('folded');
        jQuery('.game').addClass('fade-out');
        clearInterval($.get('loop'));
        $.set('score', 0);
        reset();
        delay(500, () => {
          Router.go(route);
        });
      }
    ;
  // initialize start round
  $.set('unjumbledWord', '');
  $.set('jumbledWord', '');
  $.set('score', 0);
  $.set('time', 30);
  getWord();

  // Key Input Handler
  jQuery('body').keyup(event => {
    if (event.keyCode === 27) {
      leaveGame('lobby');
    }

    else if (gameIsOver) {
      if (event.keyCode === 80) {
        $.set('gameOverClass', 'fade-out');
        $.set('score', 0);
        jQuery('.letter').addClass('folded');
        reset();
        getWord();
        gameIsOver = false;
      }

      else if (event.keyCode === 83) {
        leaveGame('scores');
      }
    }

    //else if (! $.get('inputLock')) {
      let chosenLetter = String.fromCharCode(event.keyCode).toLowerCase()
        , letterIndex =
            $.get('jumbledWord').indexOf(chosenLetter, numberOfChosenLetters);

      if (letterIndex > numberOfChosenLetters) {
        $.set('inputLock', true) // prevent letter choosing while swap occurs
        jQuery( // get chosen and first non-chosen letter for swapping purposes
          '.letter.index' + numberOfChosenLetters
        + ', .letter.index' + letterIndex
        )
          .addClass('folded');

        //delay(0, () => {
          let jumbledWord = $.get('jumbledWord')
            , letterToSwap = jumbledWord[numberOfChosenLetters];

          // put chosen letter closest to the front
          jumbledWord[letterIndex] = letterToSwap;
          jumbledWord[numberOfChosenLetters] = chosenLetter;
          $.set('jumbledWord', jumbledWord);
          // unfold and highlight animations
          jQuery('.folded').removeClass('folded');
          jQuery('.letter.index' + numberOfChosenLetters)
            .addClass('active');
          // add letter to 'guessed word'
          validGuess(chosenLetter);
          //$.set('inputLock', false); // I didn't actually need this.
        //});
      }

      else if (letterIndex === numberOfChosenLetters) {
        jQuery('.letter.index' + letterIndex)
          .addClass('active');

        validGuess(chosenLetter);
      }

      else return; // do nothing if you've already chosen that letter

      if (numberOfChosenLetters === $.get('jumbledWord').length) {
        checkAnagram(guess, isAnagram => {
          if (guess === $.get('unjumbledWord') || isAnagram) {
            // Good job!
            let currentScore = $.get('score') + 10;
            $.set('score', currentScore);
            wordLength = 4 + Math.floor(currentScore / difficulty);
            round += 1;
            // clear word, get new one
            setLetters('Nice!');
            delay(1500, () => { // cleanup for next round
              jQuery('.letter').addClass('folded');;
              clearInterval($.get('loop'));
              reset();
              getWord();
            });
          }

          else {
            // try again!
            jQuery('.letter').addClass('shake');
            delay(500, () => {
              reset();
            });
          }
        });
    //  }
    }
  });
};
