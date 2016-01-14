Meteor.publish( 'user-gifts', function( userId, giftType ) {
  check( userId, String );
  check( giftType, String);

  if ( giftType === 'posts' ) {
    return [
      Gifts.find({ 'userId': userId }, { limit: 100, sort: {created: -1} }),
      Meteor.users.find( userId )
    ];
  } else {
    return [
      Gifts.find({ 'wanters': userId }, { limit: 100, sort: {created: -1} }),
      Meteor.users.find( userId )
    ];
  }
});
