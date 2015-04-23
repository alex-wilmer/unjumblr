let  // this style is interesting
           $ = Session
  ,     tick = 600
  , fadeTime = 400
  ;

countDown = (callback) => {
  $.set('gameTitle', 'Get Ready!');
  delay(tick, () => {
    $.set('gameTitleClass', 'fade-out');
    delay(fadeTime, () => {
      $.set('gameTitleClass', '');
      $.set('gameTitle', '3');
    });
  });

  delay(tick * 2 + fadeTime, () => {
    $.set('gameTitleClass', 'fade-out');
    delay(fadeTime, () => {
      $.set('gameTitleClass', '');
      $.set('gameTitle', '2');
    });
  });

  delay(tick * 3 + fadeTime, () => {
    $.set('gameTitleClass', 'fade-out');
    delay(fadeTime, () => {
      $.set('gameTitleClass', '');
      $.set('gameTitle', '1');
    });
  });

  delay(tick * 4 + fadeTime, () => {
    $.set('gameTitleClass', 'fade-out');
    delay(fadeTime, () => {
      $.set('gameTitleClass', '');
      $.set('gameTitle', 'Go!');
      delay(500, () => {
        $.set('gameTitleClass', 'fade-out');
        delay(400, () => {
          if (callback) {
            callback();
          }
        });
      });
    });
  });
};
