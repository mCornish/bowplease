const publicRedirect = () => {
  if ( Meteor.userId() ) {
    FlowRouter.go( 'index' );
  }
};

const publicRoutes = FlowRouter.group({
  name: 'public',
  triggersEnter: [ publicRedirect ]
});

publicRoutes.route( '/login', {
  name: 'login',
  action() {
    ReactLayout.render( Default, { yield: <Login /> } );
  }
});

publicRoutes.route( '/browse', {
  name: 'browse',
  action() {
    ReactLayout.render( Default, { yield: <GiftsList /> } );
  }
});

publicRoutes.route( '/denied', {
  name: 'accessDenied',
  action() {
    ReactLayout.render( Default, { yield: <AccessDenied /> } );
  }
});
