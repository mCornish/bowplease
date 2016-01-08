Meteor.publish( 'home-form', function() {
  return [
    Occasions.find(),
    Recipients.find()
  ];
});
