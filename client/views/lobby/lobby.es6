let $ = Session;

Template.lobby.rendered = () => {
  let goTo = route => {
    $.set('lobbyTitleClass', 'fade-out')
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
