Meteor.methods({
  commentUpdate( commentId, comment ) {
    check(commentId, String);
    check(comment, Comments.simpleSchema());

    try {
      const commentId = Comments.update(commentId, { $set: comment });
      return commentId;
    } catch( exception ) {
      return exception;
    }
  }
});
