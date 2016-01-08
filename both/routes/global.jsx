FlowRouter.route( '/', {
  name: 'index',
  action() {
    ReactLayout.render( Default, { yield: <Index /> } );
  }
});

FlowRouter.route( '/trending', {
  name: 'trending',
  action() {
    ReactLayout.render( Default, { yield: <Trending /> } );
  }
});
