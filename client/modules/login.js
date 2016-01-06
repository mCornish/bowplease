'use strict';
let login = {
    withEmail( options ) {
        _validate( options.form );
    },
    withFacebook() {
        _handleFacebook();
    },
    togglePass() {
        _togglePass();
    },
    toForgPass() {
        _toForgPass();
    },
};


let _validate = ( form ) => {
    $( form ).validate( validation() );
};

let validation = () => {
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
        submitHandler() { _handleLogin(); }
    };
};

let _handleLogin = () => {
    const email = $( '[name="email"]' ).val();
    const password = $( '[name="password"]' ).val();
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
};

let _handleFacebook = () => {
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
};

let _togglePass = () => {
    const state = Session.get('showPass');
    Session.set('showPass', !state);
};

let _toForgPass = () => {
    $('.out-left').addClass('is-active').on('transitionend', function() {
        $(this).hide().off();
        $('.in-right').addClass('is-active');
    });
}

Modules.client.login = login;
