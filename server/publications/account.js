Meteor.publish( 'account', function() {
  return [
    Meteor.users.find(this.userId)
  ];
});
