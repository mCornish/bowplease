const giftList = {
  filteredGifts( limit, giftSort ) {
    return _getFilteredGifts( limit, giftSort );
  },
  imageClass( imageUrl ) {
    return _getImageClass( imageUrl );
  },
  track( e ) {
    _track( e );
  }
};

_getFilteredGifts = ( limit, giftSort ) => {
  const queries = _getQueries();
  let query = {};
  if ( queries.length > 0 ) {
    query = { $and: queries };
  }

  const filteredGifts = Gifts.find( query, {
    limit: limit,
    sort: giftSort
  });

  if ( filteredGifts.count() > 0 ) {
    return filteredGifts;
  } else {
    return null;
  }
};

_getQueries = () => {
  const filters = _getFilters();
  const queries = [];

  if ( filters.created ) {
    queries.push({ created: { $gte: new Date( filters.created )}});
  }
  if ( _isValidNum( filters.minAge ) && filters.minAge >= 0 ) {
    queries.push({ age: { $gte: filters.minAge }});
  }
  if ( _isValidNum( filters.maxAge ) && filters.maxAge >= 1 ) {
    queries.push({ age: { $lte: filters.maxAge }});
  }
  if ( _isValidNum( filters.minPrice ) && filters.minPrice > 0) {
    queries.push({ price: { $gte: filters.minPrice }});
  }
  if ( _isValidNum( filters.maxPrice ) && filters.maxPrice > 0.01 ) {
    queries.push({ price: { $lte: filters.maxPrice }});
  }
  if ( filters.recipient ) {
    queries.push({ recipient: filters.recipient });
  }
  if ( filters.occasion ) {
    queries.push({ occasion: filters.occasion });
  }
  return queries;
};

_getFilters = () => {
  filters = {
    created: _getCreatedVal(),
    minAge: _getAgeVal( 'min' ),
    maxAge: _getAgeVal( 'max' ),
    minPrice: parseFloat( $('[name=min-price]').val() ),
    maxPrice: parseFloat( $('[name=max-price]').val() ),
    recipient: _getRecipientVal(),
    occasion: _getOccasionVal()
  };
  return filters;
};

_getCreatedVal = () => {
  if ( $('[name=created]').length < 1 ) {
    return null;
  }
  const createdVal = $('[name=created]').val().toLowerCase();
  switch ( createdVal ) {
    case 'today':
    return moment().subtract(1, 'days').toDate();
    break;
    case 'this week':
    return moment().subtract(1, 'weeks').toDate();
    break;
    case 'this month':
    return moment().subtract(1, 'months').toDate();
    break;
    case 'this year':
    return moment().subtract(1, 'years').toDate();
    break;
  };
};

_getAgeVal = ( minOrMax ) => {
  if ( $('[name=age]').length < 1 ) {
    return null;
  }
  const ageVal = Session.get( 'ageVal') || $('[name=age]').val();
  Session.set( 'ageVal', null );
  if ( minOrMax === 'min' ) {
    switch ( ageVal.toLowerCase() ) {
      case 'any':
      return null;
      break;
      case 'newborn':
      return 0;
      break;
      case '50+':
      return 51;
      break;
      default:
      const hyphen = ageVal.indexOf('-');
      return parseInt( ageVal.substr(0, hyphen) );
      break;
    }
  } else {
    switch ( ageVal ) {
      case 'any':
      return null;
      break;
      case 'newborn':
      return 1;
      break;
      case '50+':
      return 100;
      break;
      default:
      const hyphen = ageVal.indexOf('-');
      return parseInt( ageVal.substr(hyphen + 1) );
      break;
    }
  }
};

_getRecipientVal = () => {
  if ( $('[name=recipient]').length < 1 ) {
    return null;
  }
  const recipientVal = Session.get( 'recipientVal') || $('[name=recipient]').val();
  Session.set( 'recipientVal', null );
  if ( recipientVal.toLowerCase() === 'default' ) {
    return null;
  } else {
    return recipientVal.toLowerCase();
  }
};

_getOccasionVal = () => {
  if ( $('[name=occasion]').length < 1 ) {
    return null;
  }
  const occasionVal = Session.get( 'occasionVal') || $('[name=occasion]').val();
  Session.set( 'occasionVal', null );
  if ( occasionVal.toLowerCase() === 'default' ) {
    return null;
  } else {
    return occasionVal.toLowerCase();
  }
};

_isValidNum = ( number ) => {
  return number && !isNaN( number);
};

_getImageClass = ( imageUrl ) => {
  const image = new Image();
  image.src = imageUrl;

  const imageWidth = image.width;
  const imageHeight = image.height;

  if (imageWidth > imageHeight) {
    return 'is-long';
  } else {
    return 'is-tall';
  }
}

_track = ( e ) => {
  const field = $(e.target).attr('name');
  const value = $(e.target).val();
  analytics.track('Gift Filter: ' + field, value);
};

Modules.client.giftList = giftList;
