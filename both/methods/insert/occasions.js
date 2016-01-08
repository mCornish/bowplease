Meteor.methods({
  occasionInsert: function(occasion) {
    check(occasion, Occasions.simpleSchema());

    try {
      const occasionId = Occasions.insert( occasion );
      return occasionId;
    } catch( exception ) {
      return exception;
    }
  }
});
