Meteor.methods({
  commentRemove( commentId ) {
    check( commentId, String );

    try {
      Comments.remove( commentId );
    } catch( exception ) {
      return exception;
    }
  }
});
