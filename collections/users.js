Meteor.users.allow({
  insert: function(userId) {
    isAdmin(userId);
  },
  update: function(userId, user) {
    return userId == user._id || isAdmin(userId);
  },
  remove: function(userId) {
    return isAdmin(userId);
  }
});

Meteor.users.deny({
  update: function(userId, gift, fieldNames) {
    if (isAdmin(userId)) {
      return (_.without(fieldNames, 'username', 'emails', 'profile', 'services', 'roles').length > 0);
    } else {
      return (_.without(fieldNames, 'profile').length > 0);
    }
  }
});
