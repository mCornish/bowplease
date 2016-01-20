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
      Activity.remove({giftId: giftId});

      return giftId;
    } catch( exception ) {
      return exception;
    }
  }
});
