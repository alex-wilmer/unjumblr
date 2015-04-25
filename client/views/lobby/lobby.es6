let $ = Session;

Template.lobby.events({
  'keyup input': function (event) {
    if (event.keyCode === 27) {
      cancel();
    }
  }
})

Template.lobby.rendered = () => {
  let goTo = route => {
    $.set('lobbyTitleClass', 'fade-out')
    jQuery('body').unbind('keyup');
    delay(300, () => {
      Router.go(route);
    });
  };

  $.set('gameTitleClass', '');
  $.set('lobbyTitleClass', 'fade-in');

  jQuery('body').keyup(function (event) {
    if (event.keyCode === 49) {
      goTo('game');
    }

    else if (event.keyCode === 50) {
      // multiplayer
    }

    else if (event.keyCode === 83) {
      goTo('scores');
    }
  });
};
