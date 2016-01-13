Meteor.publish( 'occasions', function() {
  return Occasions.find( {}, { sort: { name: 1 } } ) ;
});
