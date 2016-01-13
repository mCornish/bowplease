Meteor.publish( 'singleGift', function( giftId ) {
  check( giftId, String );
  return Gifts.find( giftId );
});
