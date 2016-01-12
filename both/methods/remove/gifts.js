Meteor.methods({
  giftRemove( giftId ) {
    check( giftId, String );

    try {
      Gifts.remove( giftId );
    } catch( exception ) {
      return exception;
    }
  }
});
