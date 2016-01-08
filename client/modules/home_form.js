const homeForm = {
    filterGifts() {
        _filterGifts();
    }
};

_filterGifts = ( e ) => {
    const recipientValue = $(e.target).find('[name=recipient]').val();
    const ageValue = $(e.target).find('[name=age]').val().toLocaleLowerCase();
    const occasionValue = $(e.target).find('[name=occasion]').val();

    const recipient = recipientValue === 'Who is it for?' ? null : recipientValue;
    Session.set('recipient', recipient);

    let minAge = null,
        maxAge = null,
        hyphen = null;

    switch ( ageValue ) {
        case 'any':
            minAge = null;
            maxAge = null;
            break;
        case 'newborn':
            minAge = 0;
            maxAge = 1;
            break;
        case '50+':
            minAge = 51;
            maxAge = 100;
            break;
        default:
            hyphen = ageValue.indexOf('-');
            minAge = parseInt(ageValue.substr(0, hyphen));
            maxAge = parseInt(ageValue.substr(hyphen + 1));
            break;
    }

    Session.set('minAge', minAge);
    Session.set('maxAge', maxAge);

    const occasion = occasionValue === 'The occasion?' ? null : occasionValue;

    Session.set('occasion', occasion);
    // Set created time frame to "all time"
    Session.set('created', null);

    FlowRouter.go('browse');
}

Modules.client.homeForm = homeForm;
