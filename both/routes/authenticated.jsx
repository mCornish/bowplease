const authenticatedRedirect = () => {
  if ( !Meteor.loggingIn() && !Meteor.userId() ) {
    FlowRouter.go( 'accessDenied' );
  }
};

const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [ authenticatedRedirect ]
});

authenticatedRoutes.route( '/me', {
  name: 'me',
  action() {
    ReactLayout.render( Default, { yield: <Me /> } );
  }
});

authenticatedRoutes.route( '/me/account', {
  name: 'account',
  action() {
    ReactLayout.render( Default, { yield: <Account /> } );
  }
});

authenticatedRoutes.route( '/me/profile', {
  name: 'profile',
  action() {
    ReactLayout.render( Default, { yield: <Profile /> } );
  }
});

authenticatedRoutes.route( '/gifts/:id/edit', {
  name: 'giftEdit',
  action() {
    ReactLayout.render( Default, { yield: <GiftEdit /> } );
  }
});

authenticatedRoutes.route( '/submit', {
  name: 'giftSubmit',
  action() {
    ReactLayout.render( Default, { yield: <GiftSubmit /> } );
  }
});
