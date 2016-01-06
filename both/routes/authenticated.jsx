const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated'
});

authenticatedRoutes.route( '/', {
  name: 'index',
  action() {
    ReactLayout.render( Default, { yield: <Index /> } );
  }
});

authenticatedRoutes.route( '/me', {
  name: 'me',
  action() {
    ReactLayout.render( Default, { yield: <Me /> } );
  }
});
