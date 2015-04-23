let $ = Session
  , cancel = () => {
    $.set('userInfo', '');
    $.set('inputType', 'text');
    $.set('exitClass', 'fade-out');
    TweenLite.to(jQuery('.unjumbled'), 0.75, {
      text: "What's your name?"
    , ease:Linear.easeNone
    });
    jQuery('.login input').val('').focus();
  };

Template.splash.helpers({
  titleJumbled: () => {
    return 'unjumblr'.shuffle();
  }

, loginPlaceholder: () => {
    return $.get('loginPlaceholder');
  }

, inputType: () => {
    return $.get('inputType');
  }
});

Template.splash.events({
  'submit .login': function (event) {
    event.preventDefault();

    // If you entered a name and password
    // create a user object and attempt to login.
    // If login fails, create a new account.
    if ($.get('inputType') === 'password') {
      let user = {
        username: $.get('userInfo')
      , password: event.target.userInfo.value
      };

      Meteor.loginWithPassword(
        user.username, user.password, (err) => {
          if (err) {
            Accounts.createUser(user, (err) => {
              if (err) {
                $.set('error',
                  'This user already exists!<br>Do you know the password?'
                );

                $.set('errorClass', 'fade-in');

                delay(3000, () => {
                  $.set('errorClass', 'fade-out');
                });
              }

              else {
                $.set('exitClass', 'fade-out');
                Router.go('lobby');
              }
            });
          }

          else {
            TweenLite.to(jQuery('.unjumbled'), 0.75, {
              text: ""
            , ease:Linear.easeNone
            });

            $.set('exitClass', 'fade-out');

            delay(800, () => {
              Router.go('lobby');
            });
          }
        }
      );
    }

    else {
      $.set('exitClass', 'fade-in');
      $.set('inputType', 'password');
      $.set('userInfo', event.target.userInfo.value);
      TweenLite.to(jQuery('.unjumbled'), 0.75, {
        text: "Create or enter your password!"
      , ease:Linear.easeNone
      });
    }

    event.target.userInfo.value = '';
  }

, 'click .fa-times': function () {
    cancel();
  }

, 'keyup input': function (event) {
    if (event.keyCode === 27) {
      cancel();
    }
  }
});

Template.splash.rendered = () => {
  $.set('inputType', 'text');

  delay(800, () => {
    $.set('jumbledClass', 'flip-out');

    delay(200, () => {
      $.set('unjumbledClass', 'flip-in');

      delay(1000, () => {
        TweenLite.to(jQuery('.unjumbled'), 0.75, {
          text: "What's your name?"
        , ease:Linear.easeNone
        });

        if (!Meteor.user()) {
          $.set('loginClass', 'fade-in');
        }
        delay(300, () => {
          jQuery('.login input').css('opacity', 1).focus();
        });
      });
    });
  });
};
