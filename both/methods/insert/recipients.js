Meteor.methods({
  recipientInsert: function(recipient) {
    check(recipient, Recipients.simpleSchema());

    try {
      var recipientId = Recipients.insert( recipient );
      return occasionId;
    } catch( exception ) {
      return exception;
    }
  }
});
