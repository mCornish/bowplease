BuyButton = React.createClass({
  linkClass() {
    return isNull(this.props.link) ? 'is-disabled' : '';
  },
  text() {
    if ( !this.props.link ) {
      return (
        <span>No link provided</span>
      );
    } else if ( this.props.price ) {
      return (
        <span>Buy for <i className="fa fa-dollar">{this.props.price}</i></span>
      );
    } else {
      return (
        <i className="fa fa-dollar"> Buy</i>
      );
    }
  },
  track( e ) {
    const link = $( e.target ).attr( 'href' );
    const url = link.replace('http://', '').replace('https://', '').replace('www.', '');
    const slashLoc = url.indexOf('/');
    let merchant = url;
    if (slashLoc > -1) {
      merchant = url.slice(0, slashLoc);
    }

    // Capitalize it to make it look nice
    merchant = merchant.charAt(0).toUpperCase() + merchant.slice(1);

    analytics.track('Buy clicked', {link: link});
    analytics.track(merchant + ' clicked', {link: link});
  },
  render() {
    if ( Meteor.userId() === this.props.userId ) {
      return (
        <a className={`buy-button button ${this.linkClass()}`} href={this.props.link} target="_blank"
          onClick={this.track}><i className="fa fa-dollar"></i></a>
      );
    } else {
      return (
        <a className={`buy-button button col-xs-12 ${this.linkClass()}`} href={this.props.link} target="_blank"
          onClick={this.track}>{this.text()}</a>
      );
    }
  }
})
