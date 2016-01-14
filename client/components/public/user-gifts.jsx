UserGifts = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    const userId = FlowRouter.getParam( 'id' ) || Meteor.userId();
    const giftType = FlowRouter.getParam( 'giftType' );
    const query = giftType === 'posts' ? {'userId': userId} : {'wanters': userId};

    const subscription = Meteor.subscribe( 'user-gifts', userId, giftType );
    return {
      gifts: Gifts.find(query, {limit: 100, sort: {created: -1}}).fetch(),
      user: Meteor.users.findOne( userId )
    };
  },
  giftType() {
    return FlowRouter.getParam( 'giftType' );
  },
  renderGifts() {
    if ( this.data.gifts ) {
      return this.data.gifts.map((gift, index) => {
        return <GiftItem key={index} gift={gift} />;
      });
    } else {
      return (
        <div className="row row--margin" onClick={this.showFilter}>
          <div className="col-xs-12">
            There doesn't appear to be any gifts. Maybe you should try a <span className="fake-link">different filter</span>.
          </div>
        </div>
      );
    }
  },
  render() {
    if ( this.data.isLoading ) {
      return <Loading />;
    } else {
      return (
        <div className="page">
          <h1>{this.data.user.username}'s {this.giftType()}</h1>
          <div className="grid row row--margin" data-hook="gifts">
            {this.renderGifts()}
          </div>
        </div>
      );
    }
  }
})
