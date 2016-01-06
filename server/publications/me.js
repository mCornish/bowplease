Meteor.publish( 'me', function() {
    return [
        Activity.find({'userId': this.userId}),
        Gifts.find({'userId': this.userId}, {limit: 3, sort: {created: -1}}),
        Gifts.find({'wanters': this.userId}, {limit: 3, sort: {created: -1}})
    ];
});
