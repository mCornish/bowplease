Meteor.methods({
  giftUpdate( giftId, gift ) {
    check(giftId, String);
    check(gift, Gifts.simpleSchema());

    try {
      const giftId = Gifts.update( giftId, { $set: gift });
      return giftId;
    } catch( exception ) {
      return exception;
    }
  }
});
