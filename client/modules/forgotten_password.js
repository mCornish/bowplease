'use strict';
let forgPass = {
    submit( options ) {
        _validate( options.form );
    },
    goBack() {
        _goBack();
    }
}

let _validate = ( form ) => {
    $( form ).validate( validation() );
};

let validation = () => {
    return {
        rules: {
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            email: {
                required: 'Please enter your email address.',
                email: 'Please enter a valid email address.'
            }
        },
        submitHandler() { _handleRecovery(); }
    };
};

let _handleRecovery = () => {
    const email = $( '[name="email"]' ).val();
    Meteor.call('sendResetEmail', email, function(err) {
        if (err) {
            Bert.alert(`Password reset failed: ${err.reason}`, 'danger');
        } else {
            Bert.alert('Email sent', 'success');
            _goBack();
        }
    });
};

let _goBack = () => {
    $('.in-right').removeClass('is-active').on('transitionend', function () {
        $(this).off();
        $('.out-left').show(0).removeClass('is-active');
    });
}

Modules.client.forgPass = forgPass;
