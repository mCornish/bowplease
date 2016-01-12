Meteor.methods({
  commentInsert: function ( comment ) {
    check(comment, Comments.simpleSchema());

    try {
      const gift = Gifts.findOne(comment.giftId);
      if (!gift) {
        throw new Meteor.Error('invalid-comment', "Your comment isn't associated with a gift");
      }

      // update the gift with the number of comments
      Gifts.update(comment.giftId, {$inc: {commentsCount: 1}});

      // create the comment, save the id
      const commentId = Comments.insert(comment);

      // Create a notification, informing the user that there's been a comment
      //createCommentNotification(comment);

      return commentId;
    } catch( exception ) {
      return exception;
    }
  }
});
