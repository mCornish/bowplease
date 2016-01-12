ServiceConfiguration.configurations.upsert(
  { service: 'facebook'},
  {
    $set: {
      // TODO Hide key and secret using settings (http://joshowens.me/environment-settings-and-security-with-meteor-js/)
      appId: Meteor.settings.public.facebook.appId,
      loginStyle: 'popup',
      secret: Meteor.settings.private.facebook.secret
    }
  }
);
