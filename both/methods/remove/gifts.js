Meteor.methods({
  giftRemove( giftId ) {
    check( giftId, String );

    try {
      Activity.remove({giftId: giftId});
      Gifts.remove( giftId );
    } catch( exception ) {
      return exception;
    }
  }
});
