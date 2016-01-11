Meteor.methods({
  changeUsername: function (username) {
    check(username, String);

    try {
      Accounts.setUsername(Meteor.userId(), username);
      return username;
    } catch( exception ) {
      return exception;
    }
  }
});
