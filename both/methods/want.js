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
      if (desc.length > 50) {
        desc = desc.substr(45) + '...'
      }
      const activity = {
        title: 'Wanted a gift',
        text: gift.description,
        giftId: giftId
      }
      Meteor.call('activityInsert', activity);
    } catch( exception ) {
      return exception;
    }
  }
});
