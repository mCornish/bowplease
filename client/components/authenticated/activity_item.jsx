ActivityItem = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    const subscription = Meteor.subscribe( 'singleGift', this.props.giftId );
    return {
      isLoading: !subscription.ready(),
      gift: Gifts.findOne( this.props.giftId )
    };
  },
  render() {
    if ( this.data.isLoading ) {
      return <Loading />;
    } else {
      return (
        <div className="row row--margin">
          <a href={`/gifts/${this.data.gift._id}`}>
            <img className="col-xs-2" src={this.data.gift.image}/>
          </a>
          <div className="col-xs-10">
            <p>
              {this.props.activity.text}&nbsp;
              <a href={`/gifts/${this.data.gift._id}`}>
                <i className="fa fa-arrow-circle-o-right"></i>
              </a>
            </p>
          </div>
        </div>
      );
    }
  }
});
