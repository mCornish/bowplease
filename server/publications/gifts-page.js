Meteor.publish( 'gifts-page', function( giftId ) {
  check( giftId, String );
  const gift = Gifts.find( giftId );
  if ( gift ) {
    return [
      Gifts.find( giftId ),
      Comments.find({ giftId: giftId } ),
      Meteor.users.find()
    ];
  } else {
    return this.ready();
  }
});
