ActivityItem = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    const subscription = Meteor.subscribe( 'singleGift', this.props.giftId );
    return {
      isLoading: !subscription.ready(),
      gift: Gifts.findOne( this.props.giftId )
    };
  },
  createdMoment() {
    return moment( this.props.activity.created ).fromNow();
  },
  abbrText() {
    let text = this.props.activity.text;
    if (text.length > 140) {
      text = text.substr(140) + '...'
    }
    return text;
  },
  render() {
    if ( this.data.isLoading ) {
      return <Loading />;
    } else {
      return (
        <div className="activity__container row">
          <a className="activity__image-container" href={`/gifts/${this.data.gift._id}`}>
            <img className="activity__image" src={this.data.gift.image} />
          </a>
          <div className="activity__text-container">
            <div><strong>{this.props.activity.title}</strong></div>
            <div className="activity__text">{this.abbrText()}</div>
            <div className="activity__created">{this.createdMoment()}</div>
          </div>
          <a className="activity__link" href={`/gifts/${this.data.gift._id}`}>
            <i className="fa fa-angle-right"></i>
          </a>
        </div>
      );
    }
  }
});
