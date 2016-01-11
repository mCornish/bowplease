Meteor.methods({
  changeEmail: function (newEmail, oldEmail) {
    check(newEmail, String);
    check(oldEmail, String);

    try {
      Accounts.addEmail(Meteor.userId(), newEmail);
      Accounts.removeEmail(Meteor.userId(), oldEmail);
      return newEmail;
    } catch( exception ) {
      return exception;
    }
  }
});
