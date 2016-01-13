Meteor.publish( 'gift-item', function( userId ) {
  check( userId, String );
  return [
    Meteor.users.find( userId ),
  ];
});
