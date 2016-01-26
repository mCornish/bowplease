UserPage = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    const userId = FlowRouter.getParam( 'id' ) || Meteor.userId();
    const subscription = Meteor.subscribe( 'user-page', userId );
    return {
      isLoading: !subscription.ready(),
      activity: Activity.find({ 'userId': userId }, { sort: {created: -1}}).fetch(),
      posts: Gifts.find({'userId': userId}, {limit: 100, sort: {created: -1}}).fetch(),
      wants: Gifts.find({'wanters': userId}, {limit: 100, sort: {created: -1}}).fetch(),
      user: Meteor.users.findOne( userId )
    };
  },
  renderAccount() {
    if ( !FlowRouter.getParam( 'id' ) ) {
      return (
        <a className="text-center float-right" href="/me/account">
          <i className="fa fa-cog"></i><br/>
          Account
        </a>
      );
    }
  },
  renderActivity() {
    if ( this.data.activity.length > 0 ) {
      return this.data.activity.map(( item, index ) => {
        return <ActivityItem key={index} activity={item} giftId={item.giftId} />;
      });
    } else {
      return (
        <p className="text-center">You haven't done anything yet! You should try <a href="/">browsing some gifts</a>.</p>
      );
    }
  },
  renderPosts() {
    if ( this.data.posts.length > 0 ) {
      return  (
        <div className="user__gifts">
          {this.data.posts.map(( post, index ) => {
            return (
              <a className="user__gift" href={`/gifts/${post._id}`} key={index}>
                <img src={post.image}/>
              </a>
            );
          })}
        </div>
      );
    } else {
        return (
          <p className="col-xs-12 text-center">You haven't shared any gifts. <a href="/submit">Try it out</a>.</p>
        );
    }
  },
  renderWants() {
    if ( this.data.wants.length > 0 ) {
      return  (
        <div className="user__gifts">
          {this.data.wants.map(( want, index ) => {
            return (
              <a className="user__gift" href={`/gifts/${want._id}`} key={index}>
                <img src={want.image}/>
              </a>
            );
          })}
        </div>
      );
    } else {
      return (
        <p className="col-xs-12 text-center">You don't want anything? Come on, <a href="/">take a look</a>.</p>
      );
    }
  },
  render() {
    if (this.data.isLoading) {
      return <Loading />;
    } else {
      return (
        <div className="me page">
          <BackButton />
          <div className="row">
            <a className="user__identity" href="/me/profile">
              <img className="user__profile-image" src={this.data.user.profile.image}/>
              <div className="user__name">{this.data.user.username}</div>
            </a>
          </div>
          <div className="row">
            <div className="col-xs-6">
              <div className="user__text row">
                <div className="text-center col-xs-4">
                  <strong>{this.data.posts.length}</strong><br/>
                  Shares
                </div>
                <div className="text-center col-xs-4">
                  <strong>{this.data.wants.length}</strong><br/>
                  Wants
                </div>
              </div>
            </div>
            <div className="user__text col-xs-6">
              {this.renderAccount()}
            </div>
          </div>

          <div className="tabs__menu row row--margin">
            <a className={ 'tabs__tab col-xs-4 ' + FlowHelpers.currentHash( 'activity' )} href="#activity"
              data-tab="activity">Activity</a>
            <a className={ 'tabs__tab col-xs-4 ' + FlowHelpers.currentHash( 'shares' )} href="#shares"
              data-tab="shares">Shares</a>
            <a className={ 'tabs__tab col-xs-4 ' + FlowHelpers.currentHash( 'wants' )} href="#wants"
              data-tab="wants">Wants</a>
          </div>

          <div className={`tabs__container ${FlowHelpers.currentHash( 'activity' )}`}>
            {this.renderActivity()}
          </div>
          <div className={`tabs__container ${FlowHelpers.currentHash( 'shares' )}`}>
            {this.renderPosts()}
          </div>
          <div className={`tabs__container ${FlowHelpers.currentHash( 'wants' )}`}>
            {this.renderWants()}
          </div>
        </div>
      );
    }
  }
});
