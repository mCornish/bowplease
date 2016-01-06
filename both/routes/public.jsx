const publicRoutes = FlowRouter.group({
  name: 'public'
});

publicRoutes.route( '/login', {
  name: 'login',
  action() {
    ReactLayout.render( Default, { yield: <Login /> } );
  }
});
