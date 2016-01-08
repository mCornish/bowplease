Meteor.publish( 'gifts-list', function() {
  return [
    Meteor.gifts.find(),
    Meteor.users.find(),
    Occasions.find({}, {sort: {name: 1}}),
    Recipients.find({}, {sort: {name: 1}})
  ];
});
