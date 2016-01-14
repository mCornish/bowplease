Meteor.methods({
  commentUpdate( commentId, comment ) {
    check(commentId, String);
    check(comment, Comments.simpleSchema());

    try {
      const newId = Comments.update(commentId, { $set: comment });
      return newId;
    } catch( exception ) {
      return exception;
    }
  }
});
