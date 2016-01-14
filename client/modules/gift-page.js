const giftPage = {
  trackBuy( e ) {
    _trackBuyClick( e );
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

Modules.client.giftPage = giftPage;
