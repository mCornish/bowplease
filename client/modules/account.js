'use strit';
const account = {
  changeUsername( e ) {
    _changeUsername( e );
  },
  changeEmail( e ) {
    _changeEmail( e );
  },
  changePassword( e ) {
    _changePassword( e );
  },
  logout() {
    _logout();
  }
};

const _changeUsername = ( e ) => {
  const username = $(e.target).find('[name=username]').val();
  Meteor.call('changeUsername', username, function( err ) {
    if ( err ) {
      Bert.alert(`Username update failed: ${err.reason}`, 'danger');
    } else {
      Bert.alert('Username updated', 'success');
    }
  });
};

const _changeEmail = ( e ) => {
  const newEmail = $(e.target).find('[name=email]').val();
  Meteor.call('changeEmail', newEmail, _getOldEmail(), function( err ) {
    if ( err ) {
      Bert.alert(`Email update failed: ${err.reason}`, 'danger');
    } else {
      Bert.alert('Email updated', 'success');
    }
  });
};

const _getOldEmail = () => {
  if (Meteor.user().emails.length === 1) {
    return typeof Meteor.user().emails[0] === 'string' ? Meteor.user().emails[0] : Meteor.user().emails[0].address;
  } else {
    const email1 = Meteor.user().emails[0].address;
    const email2 = Meteor.user().emails[1].address;
    const email3 = Meteor.user().emails[0];
    if (typeof email1 === 'string') {
      return email1;
    } else if (typeof email2 === 'string') {
      return email2;
    } else {
      return email3;
    }
  }
}

const _changePassword = ( e ) => {
  const password = $(e.target).find('[name=password]').val();
  const oldPassword = $(e.target).find('[name=old-password]').val();
  Meteor.call('changePassword', oldPassword, password, function(err) {
    if (err) {
      Bert.alert(`Password update failed: ${err.reason}`, 'danger');
    } else {
      Bert.alert('Password updated', 'success');
    }
  });
};

const _logout = () => {
  Meteor.logout(function(err) {
    if (err) {
      Bert.alert(`Logout failed: ${err.reason}`, 'danger');
    } else {
      FlowRouter.go('/');
    }
  });
}

Modules.client.account = account;
