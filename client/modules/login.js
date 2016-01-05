'use strict';
let login = ( options ) => {
    _validate( options.form, options.template );
};

let _validate = ( form, template ) => {
    $( form ).validate( validation( template ) );
};

let validation = ( template ) => {
    return {
        rules: {
            'email': {
                required: true,
                email: true
            },
            'password': {
                required: true
            }
        },
        messages: {
            username: {
                required: 'Please enter an email address.',
                email: 'Please enter a valid email address.'
            },
            password: {
                required: 'Please enter a password.'
            }
        },
        submitHandler() { _handleLogin( template ); }
    };
};

let _handleLogin = ( template ) => {
    const email = template.find( '[name="email"]' ).value;
    const password = template.find( '[name="password"]' ).value;
    Meteor.loginWithPassword( email, password, ( err ) => {
        if ( err ) {
            if ( err.reason === 'User not found' ) {
                createUser(email, password);
            } else {
                analytics.track('Login Failure', {
                    user: email,
                    error: err.reason,
                    service: 'email'
                });
                Bert.alert(`Login failed: ${err.reason}`, 'danger');
            }
        } else {
            analytics.track('Login', {
                id: Meteor.userId(),
                service: 'email'
            });
            FlowRouter.go('/');
        }
    });
};

let _createUser = ( email, password ) => {
    const create = confirm('It looks like you\'re new. Are you ready to jump in?');
    if ( create ) {
        const user = {
            username: email,
            password: password,
            profile: {
                image: 'http://thesocietypages.org/socimages/files/2009/05/vimeo.jpg',
                created: new Date(),
                generosity: 0
            }
        };
        Accounts.createUser(user, function( err ) {
            if ( err ) {
                analytics.track('Registration Failure', {
                    email: email,
                    error: err.reason
                });
                Bert.alert(`Couldn't create user: ${err.reason}`, 'danger');
            } else {
                analytics.track('Registration', {
                    email: email,
                    profile: user.profile,
                    service: 'email'
                });
                FlowRouter.go('/');
            }
        });
    } else {
        analytics.track('Registration Cancel', {
            email: email
        });
    }
}

let handleFacebook = ( template ) => {
    Meteor.loginWithFacebook(function( err ) {
        if ( err ) {
            Bert.alert(`Facebook login failed: ${err.reason}`, 'danger');
            analytics.track('Login Failure', {
                error: err.reason,
                service: 'facebook'
            });
        } else {
            analytics.track('Login', {
                id: Meteor.userId(),
                service: 'facebook'
            });
            FlowRouter.go('/');
        }
    });
}

let _toggle

Modules.client.login = login;
Modules.client.handleFacebook = handleFacebook;
