Meteor.methods({
  recipientInsert: function(recipient) {
    check(recipient, Recipients.simpleSchema());

    try {
      const recipientId = Recipients.insert( recipient );
      return occasionId;
    } catch( exception ) {
      return exception;
    }
  }
});
