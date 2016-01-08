Meteor.methods({
  giftUpdate( gift ) {
    check(gift, Gifts.simpleSchema());

    try {
      const giftId = Gifts.update( gift._id, { $set: gift });
      return giftId;
    } catch( exception ) {
      return exception;
    }
  }
});
