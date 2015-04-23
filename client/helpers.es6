Template.registerHelper('$', ($) => {
  return (
    $ === 'userInfo' && Meteor.user()
      ? Meteor.user().username
      : Session.get($)
  );
});

Template.registerHelper('userInfo', () => {
  return !! Session.get('userInfo') || !! Meteor.user()
});
