Meteor.methods({
  want: function( giftId ) {
    check( giftId, String );

    try {
      var affected = Gifts.update({
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
      let desc = gift.description;
      if (desc.length > 50) {
        desc = desc.substr(45) + '...'
      }
      const activity = {
        text: `Wanted a gift: ${desc}`,
        giftId: giftId
      }
      Meteor.call('activityInsert', activity);
    } catch( exception ) {
      return exception;
    }
  }
});
