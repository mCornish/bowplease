const giftList = {
  filteredGifts( limit, giftSort ) {
    return _getFilteredGifts( limit, giftSort );
  },
  imageClass( imageUrl ) {
    return _getImageClass( imageUrl );
  },
  track( e ) {
    _track( e );
  },
  wantedClass( wanters ) {
    return _getWantedClass( wanters );
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
  if ( _isValidNum( filters.minAge ) && _isValidNum( filters.maxAge ) && filters.minAge >= 0 && filters.maxAge >= 1 ) {
    queries.push({ $and: [ { age: { $gte: filters.minAge } }, { age: { $lte: filters.maxAge }}]});
  }
  if ( _isValidNum( filters.minPrice ) && _isValidNum( filters.maxPrice ) ) {
    queries.push({ $and: [ { price: { $gte: filters.minPrice } }, { price: { $lte: filters.maxPrice }}]});
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
  const ageVal = $('[name=age]').val().toLowerCase();
  if ( minOrMax === 'min' ) {
    switch ( ageVal ) {
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
      return parseInt(ageVal.substr(0, hyphen));
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
      return parseInt(ageVal.substr(hyphen + 1));
      break;
    }
  }
};

_getRecipientVal = () => {
  if ( $('[name=recipient]').length < 1 ) {
    return null;
  }
  const recipientVal = $('[name=recipient]').val().toLowerCase();
  if ( recipientVal === 'Anyone' ) {
    return null;
  } else {
    return recipientVal;
  }
};

_getOccasionVal = () => {
  if ( $('[name=occasion]').length < 1 ) {
    return null;
  }
  const occasionVal = $('[name=occasion]').val().toLowerCase();
  if ( occasionVal === 'Any Occasion' ) {
    return null;
  } else {
    return occasionVal;
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

  // const id = Template.currentData()._id;
  // $image = $('[data-id=' + id + ']');
  // if (imageWidth > imageHeight) {
  //   $image.addClass('is-long');
  // } else {
  //   $image.addClass('is-tall');
  // }
}

_track = ( e ) => {
  const field = $(e.target).attr('name');
  const value = $(e.target).val();
  analytics.track('Gift Filter: ' + field, value);
};

_getWantedClass = ( wanters ) => {
  const userId = Meteor.userId();
  if ( userId && !_.include(wanters, userId) ) {
    return 'wantable';
  } else if ( userId ) {
    return 'unwantable'
  } else {
    return 'disabled';
  }
};

Modules.client.giftList = giftList;
