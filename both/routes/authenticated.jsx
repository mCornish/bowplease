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

authenticatedRoutes.route( '/submit', {
  name: 'submit',
  action() {
    ReactLayout.render( Default, { yield: <GiftSubmit /> } );
  }
});
