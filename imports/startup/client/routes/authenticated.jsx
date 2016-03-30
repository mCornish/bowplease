import { FlowRouter } from 'meteor/kadira:flow-router';

const authenticatedRedirect = () => {
  if ( !Meteor.loggingIn() && !Meteor.userId() ) {
    FlowRouter.go( 'accessDenied' );
  }
};

export default () => {
  const authenticatedRoutes = FlowRouter.group({
    name: 'authenticated',
    triggersEnter: [ authenticatedRedirect ]
  });

  authenticatedRoutes.route( '/me', {
    name: 'me',
    action() {
      ReactLayout.render( Default, { yield: <UserPage /> } );
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

  // MUST COME AFTER OTHER 'ME' ROUTES
  authenticatedRoutes.route( '/me/:giftType', {
    name: 'meGifts',
    action() {
      ReactLayout.render( Default, { yield: <UserGifts /> } );
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
}