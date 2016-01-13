getDuration = function($element) {
    return $element.css('transition-duration').slice(0, -1) * 1000;
};

activate = function($element, delay, cb) {
    $element.css('transition-delay', delay + 'ms');
    $element.css('-webkit-transition-delay', delay + 'ms');
    $element.css('-moz-transition-delay', delay + 'ms');
    $element.css('-o-transition-delay', delay + 'ms');

    if (cb) {
        $element.addClass('is-active').on('transitionend', function() {
            cb();
        });
    } else {
        $element.addClass('is-active');
    }
};

deactivate = function($element, delay, cb) {
    $element.css('transition-delay', delay + 'ms');
    $element.css('-webkit-transition-delay', delay + 'ms');
    $element.css('-moz-transition-delay', delay + 'ms');
    $element.css('-o-transition-delay', delay + 'ms');
    if (cb) {
        $element.removeClass('is-active').on('transitionend', function() {
            cb();
        });
    } else {
        $element.removeClass('is-active');
    }
};
