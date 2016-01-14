Meteor.publish( 'user-page', function( userId ) {
  check( userId, String );
    return [
        Activity.find({ 'userId': userId }),
        Gifts.find({$or: [{'userId': userId}, {'wanters': userId}]}, {'limit': 6, sort: {'created': -1}}),
        Meteor.users.find( userId )
    ];
});
