let $ = Session;

Template.lobby.rendered = () => {
  $.set('lobbyTitleClass', 'fade-in');

  jQuery('body').keyup(function (event) {
    if (event.keyCode === 49) {
      $.set('lobbyTitleClass', 'fade-out')
      delay(300, () => {
        Router.go('game');
      })
    }

    else if (event.keyCode === 50) {

    }
  });
};
