ownsDocument = function(userId, doc) {
    return doc && doc.userId === userId;
};

isAdmin = function(userId) {
    return Roles.userIsInRole( Meteor.userId(), 'admin' );
};
