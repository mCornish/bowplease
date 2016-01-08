Meteor.methods({
  occasionInsert: function(occasion) {
    check(occasion, Occasions.simpleSchema());

    try {
      var occasionId = Occasions.insert( occasion );
      return occasionId;
    } catch( exception ) {
      return exception;
    }
  }
});
