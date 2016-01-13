Meteor.publish( 'recipients', function( gender ) {
  if ( gender ) {
    check( gender, String );
  }
  return Recipients.find( { gender: gender }, { sort: { name: 1 } } ) ;
});
