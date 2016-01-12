Meteor.publish( 'gift-edit', function( giftId ) {
  check( giftId, String );
  return [
    Gifts.find( giftId ),
    Occasions.find({}, {sort: {name: 1}}),
    Recipients.find({}, {sort: {name: 1}})
  ];
});
