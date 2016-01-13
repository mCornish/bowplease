const giftPage = {
  trackBuy( e ) {
    _trackBuyClick( e );
  },
  want( e, giftId ) {
    _handleWantClick( e, giftId );
  }
}

const _trackBuyClick = ( e ) => {
  const link = $( e.target ).attr( 'href' );
  let merchant = _getMerchant( link );

  // Capitalize it to make it look nice
  merchant = merchant.charAt(0).toUpperCase() + merchant.slice(1);

  analytics.track('Buy clicked', {link: link});
  analytics.track(merchant + ' clicked', {link: link});
};

const _getMerchant = () => {
  const url = link.replace('http://', '').replace('https://', '').replace('www.', '');
  const slashLoc = url.indexOf('/');
  let merchant = url;
  if (slashLoc > -1) {
    merchant = url.slice(0, slashLoc);
  }
  return merchant;
}

const _handleWantClick = ( e, giftId ) => {
  const wantable = $( e.target ).hasClass( 'wantable' )
    || $( e.target ).parent().hasClass( 'wantable' );
  if ( wantable ) {
    Meteor.call('want', giftId, function( err ) {
      if ( err ) {
        Bert.alert( `Want failed: ${err.reason}`, danger );
      }
    });
  } else {
    Meteor.call('unwant', giftId, function( err ) {
      if ( err ) {
        Bert.alert( `Unwant failed: ${err.reason}`, danger );
      }
    });
  }
};

Modules.client.giftPage = giftPage;
