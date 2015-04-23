let $ = Session;

Template.game.helpers({
  letters: function () {
    return (
      $.get('jumbledWord') &&
        $.get('jumbledWord').map(function (letter, index) {
          return {
            letter: letter
          , index: index
          };
        })
    );
  }
})

Template.game.rendered = () => {
  let round = 1
    , roundTime = 30 // seconds
    , numberOfChosenLetters = 0
    , getWord = () => {
        countDown(() => {
          HTTP.call('GET', wordnikUrl, (error, result) => {
            if (error) {
              return error;
            }

            else {
              $.set('unjumbledWord', result.data.word);
              $.set('jumbledWord', result.data.word.shuffle().split(''));
              $.set('time', roundTime);
              $.set('loop',
                loop(1000, () => {
                  $.set('time', $.get('time') - 1);
                })
              );
            }
          });  // So many brackets..
        });   // Coffeescript is nice for this!
      }
    ;
  // reset & start round
  $.set('unjumbledWord', '');
  $.set('jumbledWord', '');
  $.set('score', 0);
  getWord();
  jQuery('body').keyup(event => {
    let characterIndex =
      $.get('jumbledWord')
        .indexOf(String.fromCharCode(event.keyCode).toLowerCase());

    if (characterIndex > -1) {
      jQuery('.letter.index' + characterIndex)
        .addClass(
          characterIndex === numberOfChosenLetters
            ? 'active'
            : 'folded'
        );
    }
  });
};
