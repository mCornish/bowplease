Meteor.publish( 'user-info', function( userId ) {
  check( userId, String );
  const user = Meteor.users.find( userId );
  if ( user ) {
    return [
      Meteor.users.find( userId )
    ];
  } else {
    return this.ready();
  }
});
