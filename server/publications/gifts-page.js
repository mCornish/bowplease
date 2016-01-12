Meteor.publish( 'gifts-page', function( giftId ) {
  check( giftId, String );
  return [
    Gifts.find( giftId ),
    Comments.find({ giftId: giftId } ),
    Meteor.users.find()
  ];
});
