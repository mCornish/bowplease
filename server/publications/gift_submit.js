Meteor.publish( 'gifts-submit', function() {
  return [
    Occasions.find({}, {sort: {name: 1}}),
    Recipients.find({}, {sort: {name: 1}})
  ];
});
