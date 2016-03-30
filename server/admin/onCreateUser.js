const testerEmails = Meteor.settings.private.approvedEmails;
Accounts.onCreateUser(function(options, user) {
  if (typeof user.emails === 'undefined') {
    user.emails = [];
  }
  if (user.services.facebook) {
    var facebook = user.services.facebook;
    // if (!process.env.IS_MIRROR && testerEmails.indexOf(facebook.email) < 0) {
    //   throw new Meteor.Error('non-tester', 'Only approved testers may register.')
    // }
    user.emails.push({address: facebook.email, verified: true});
    // convert email to username
    user.username = facebook.email.substr(0, facebook.email.indexOf('@'));
    options.profile.email = facebook.email;
    options.profile.name = facebook.first_name + ' ' + facebook.last_name;
    options.profile.gender = facebook.gender;
    options.profile.locale = facebook.locale;
    options.profile.image = 'http://graph.facebook.com/' + facebook.id + '/picture/?type=large';
    options.profile.service = 'facebook';
  } else {
    // f
    user.emails.push({address: user.username, verified: false});
    if ( !('profile' in options) ) {
      options.profile = {};
    }
    const email = user.emails[0].address;
    options.profile.email = email;
    // convert email to username
    user.username = email.substr(0, email.indexOf('@'));
    options.profile.service = 'email';
  }

  options.profile.generosity = 0;
  if (options.profile) {
    user.profile = options.profile;
  }

  return user;
});
