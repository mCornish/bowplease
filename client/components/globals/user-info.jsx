UserInfo = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    const subscription = Meteor.subscribe( 'user-info', this.props.userId );
    return {
      isLoading: !subscription.ready(),
      user: Meteor.users.findOne( this.props.userId )
    };
  },
  render() {
    if ( this.data.isLoading ) {
      return <Loading />;
    } else {
      return (
        <div>
          <img className="comment__image" src={this.data.user.profile.image} />
          <span className="comment__author">{this.data.user.username}</span>
        </div>
      );
    }
  }
});
