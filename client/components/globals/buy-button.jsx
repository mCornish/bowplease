BuyButton = React.createClass({
  linkClass() {
    return isNull(this.props.link) ? 'is-disabled' : '';
  },
  priceText() {
    if ( this.props.price ) {
      return (
        <span>Buy for <i className="fa fa-dollar">{this.props.price}</i></span>
      );
    } else {
      return (
        <i className="fa fa-dollar"> Buy</i>
      );
    }
  },
  render() {
    if ( Meteor.userId() === this.props.userId ) {
      return (
        <div className="col-xs-3 col-sm-offset-2">
          <a className={`buy-button button col-xs-12 ${this.linkClass()}`} href={this.props.link} target="_blank"
            data-track="buy"><i className="fa fa-dollar"></i></a>
        </div>
      );
    } else {
      return (
        <div className="col-xs-6 col-sm-4 col-sm-offset-2">
          <a className={`buy-button button col-xs-12 ${this.linkClass()}`} href={this.props.link} target="_blank"
            data-track="buy">{this.priceText()}</a>
        </div>
      );
    }
  }
})
