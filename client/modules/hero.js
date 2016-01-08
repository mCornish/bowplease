'use strict';
const hero = {
    hideLogin( hero ) {
        _hideLogin( hero );
    },
    showLogin( hero ) {
        _showLogin( hero );
    },
};

const _hideLogin = ( hero ) => {
    $('[data-hook=login]').removeClass('rotate-in').addClass('rotate-out').delay(300).queue(function( next ) {
        $('[data-hook=headline-text]').show(0).removeClass('rotate-out').addClass('rotate-in').delay(100).queue(function( next ) {
            $('[data-hook=login-container]').removeClass('rotate-out').addClass('rotate-in');
            hero.setState({ loggingIn: false });
            next();
        });
        next();
    });
};

const _showLogin = ( hero ) => {
    hero.setState({ loggingIn: true });
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
