Meteor.publish( 'me', function() {
    return [
        Activity.find({'userId': this.userId}),
        Gifts.find({$or: [{'userId': this.userId}, {'wanters': this.userId}]}, {'limit': 6, sort: {'created': -1}}),
    ];
});
