FlowRouter.route( '/', {
  name: 'index',
  action() {
    ReactLayout.render( Default, { yield: <Index /> } );
  }
});

FlowRouter.route( '/agreement', {
  name: 'agreement',
  action() {
    ReactLayout.render( Default, { yield: <Agreement /> } );
  }
});

FlowRouter.route( '/gifts/:id', {
  name: 'giftPage',
  action() {
    ReactLayout.render( Default, { yield: <GiftPage /> } );
  }
});

FlowRouter.route( '/privacy', {
  name: 'privacy',
  action() {
    ReactLayout.render( Default, { yield: <Privacy /> } );
  }
});

FlowRouter.route( '/trending', {
  name: 'trending',
  action() {
    ReactLayout.render( Default, { yield: <Trending /> } );
  }
});
