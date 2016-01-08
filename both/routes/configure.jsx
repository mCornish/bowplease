FlowRouter.route( '/', {
  name: 'index',
  action() {
    ReactLayout.render( Default, { yield: <Index /> } );
  }
});

FlowRouter.notFound = {
  action() {
    ReactLayout.render( Default, { yield: <NotFound /> } );
  }
};
