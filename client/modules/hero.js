'use strict';
const hero = {
    hideLogin() {
        _hideLogin();
    },
    showLogin() {
        _showLogin();
    },
};

const _hideLogin = () => {
    $('[data-hook=login]').removeClass('rotate-in').addClass('rotate-out').delay(300).queue(function( next ) {
        $('[data-hook=headline-text]').show(0).removeClass('rotate-out').addClass('rotate-in').delay(100).queue(function( next ) {
            $('[data-hook=login-container]').removeClass('rotate-out').addClass('rotate-in');
            this.setState({ loggingIn: false });
            next();
        });
        next();
    });
};

const _showLogin = () => {
    $('[data-hook=login-container]').removeClass('rotate-in').addClass('rotate-out').delay(200).queue(function( next ) {
        $('[data-hook=headline-text]').removeClass('rotate-in').addClass('rotate-out').delay(300).queue(function( next ) {
            $(this).hide(0);
            $('[data-hook=login]').attr('class', 'rotate-in');
            next();
        });
        next();
    });
};

Modules.client.hero = hero;
