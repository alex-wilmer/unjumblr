Template.scores.helpers({
  scores: function () {
    return Scores.find({}, {sort:{score:-1}});
  }
});

Template.scores.rendered = () => {
  Session.set('highScoresClass', 'fade-in');
  jQuery('body').keyup(function (event) {
    if (event.keyCode === 27) {
      Session.set('highScoresClass', 'fade-out');
      delay(300, () => {
        Router.go('lobby');
      });
    }
  });
};
