Meteor.methods({
  giftInsert: function(gift) {
    check(gift, Gifts.simpleSchema());

    try {
      const giftId = Gifts.insert( gift );
      Meteor.call('activityInsert', {
        title: 'Shared a gift',
        text: gift.description,
        giftId: giftId
      });
      return giftId;
    } catch( exception ) {
      return exception;
    }
  },
});
