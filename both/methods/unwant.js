Meteor.methods({
  unwant: function( giftId ) {
    check( giftId, String );

    try {
      var affected = Gifts.update({
        _id: giftId,
        wanters: this.userId
      }, {
        $pull: {wanters: this.userId},
        $inc: {wantsCount: -1}
      });

      // Remove respective activity
      const gift = Gifts.findOne(giftId);
      Activity.remove({userId: this.userId, image: gift.image});
    } catch( exception ) {
      return exception;
    }
  }
});
