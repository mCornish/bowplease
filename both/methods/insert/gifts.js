Meteor.methods({
  giftInsert: function(gift) {
    check(gift, Gifts.simpleSchema());

    try {
      const giftId = Gifts.insert( gift );
      let desc = gift.description;
      if (desc.length > 50) {
        desc = desc.substr(45) + '...'
      }
      Meteor.call('activityInsert', {
        text: `Shared a gift: ${desc}`,
        giftId: giftId
      });
      return giftId;
    } catch( exception ) {
      return exception;
    }
  },
});
