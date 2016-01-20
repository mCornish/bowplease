Meteor.methods({
  want: function( giftId ) {
    check( giftId, String );

    try {
      const affected = Gifts.update({
        _id: giftId,
        wanters: {$ne: this.userId}
      }, {
        $addToSet: {wanters: this.userId},
        $inc: {wantsCount: 1}
      });
      if ( !affected ) {
        throw new Meteor.Error('invalid', "You weren't able to want that gift.");
      }

      // Add activity
      const gift = Gifts.findOne(giftId);
      Meteor.call('activityInsert', {
        title: 'Wanted a gift',
        text: gift.description,
        giftId: giftId
      });

      return giftId;
    } catch( exception ) {
      return exception;
    }
  }
});
