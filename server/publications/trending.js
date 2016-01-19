Meteor.publish( 'trending', function() {
  const yesterday = new Date( new Date().getTime() - (24 * 60 * 60 * 1000) );
  return Gifts.find({}, { sort: { wantCount: 1 }, limit: 100 });
});
