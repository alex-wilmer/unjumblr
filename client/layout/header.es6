let $ = Session;

Template.header.events({
  'click .sign-out': function () {
    Meteor.logout();
    $.set('userInfo', '');
    $.set('splashClass', 'fade-in');
    $.set('exitClass', 'fade-out');
    $.set('buttonsClass', '');
    $.set('gameTitleClass', 'hide');
    $.set('errorClass', 'hide');
    $.set('time', undefined)
    clearInterval($.get('loop'));
    delay(400, () => {
      Router.go('splash');
    });
  }
});
