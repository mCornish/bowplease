Meteor.methods({
  giftUpdate( giftId, gift ) {
    check(giftId, String);
    check(gift, Gifts.simpleSchema());
    try {
      const newId = Gifts.update( giftId, { $set: gift });
      return newId;
    } catch( exception ) {
      return exception;
    }
  }
});
