Meteor.publish( 'user-info', function( userId ) {
  check( userId, String );
  return [
    Meteor.users.find( userId )
  ];
});
