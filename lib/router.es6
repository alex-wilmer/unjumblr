Router.configure({
  layoutTemplate: 'layout'
, onBeforeAction: function () {
    if (!Meteor.user()) {
      this.redirect('splash');
    }

    this.next();
  }
});

Router.route('/', {name: 'splash'}, function () {
  if (window.innerWidth > 700) {
    this.render('splash');
  }
  else this.render('splash-mobile');
});

Router.route('/lobby', {
  name: 'lobby'
});

Router.route('/game', {
  name: 'game'
});

Router.route('/scores', {
  name: 'scores'
});

Router.route('/rooms', {
  name: 'rooms'
});

Router.route('/multi', {
  name: 'multi'
});

Router.route('/room/:_id', function () {

});
