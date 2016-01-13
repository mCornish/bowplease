Meteor.methods({
  commentRemove( commentId ) {
    check( commentId, String );

    try {
      const gift = Gifts.findOne(comment.giftId);
      if (!gift) {
        throw new Meteor.Error('invalid-comment', "Your comment isn't associated with a gift");
      }

      // update the gift with the number of comments
      Gifts.update(comment.giftId, {$inc: {commentsCount: -1}});
      Comments.remove( commentId );
    } catch( exception ) {
      return exception;
    }
  }
});
