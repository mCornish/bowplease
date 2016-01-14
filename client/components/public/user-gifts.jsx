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
  render() {
    if ( this.data.isLoading ) {
      return <Loading />;
    } else {
      return (
        <h1>{this.data.user.username}'s {this.giftType()}</h1>
      );
    }
  }
})
