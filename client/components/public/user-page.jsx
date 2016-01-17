UserPage = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    const userId = FlowRouter.getParam( 'id' ) || Meteor.userId();
    const subscription = Meteor.subscribe( 'user-page', userId );
    return {
      isLoading: !subscription.ready(),
      activity: Activity.find({ 'userId': userId }, { sort: {created: -1}}).fetch(),
      posts: Gifts.find({'userId': userId}, {limit: 3, sort: {created: -1}}).fetch(),
      wants: Gifts.find({'wanters': userId}, {limit: 3, sort: {created: -1}}).fetch(),
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
        <div className="col-xs-12">
          <div className="row">
            {this.data.posts.map(( post, index ) => {
              return (
                <a className="user__gift no-hover col-xs-4" href={`/gifts/${post._id}`} key={index}>
                  <img src={post.image}/>
                </a>
              );
            })}
          </div>
          <div className="row row--margin">
            <a className="col-xs-12 text-center" href="/me/posts">View All</a>
          </div>
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
        <div className="col-xs-12">
          <div className="row">
            {this.data.wants.map(( want, index ) => {
              return (
                <a className="user__gift no-hover col-xs-4" href={`/gifts/${want._id}`} key={index}>
                  <img src={want.image}/>
                </a>
              );
            })}
          </div>
          <div className="row row--margin">
            <a className="col-xs-12 text-center" href="/me/wants">View All</a>
          </div>
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
          <div className="row">
            <a href="/me/profile">
              <div className="col-xs-2">
                <img className="user__profile-image" src={this.data.user.profile.image}/>
              </div>
              <div className="col-xs-6">
                {this.data.user.username}
              </div>
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

          <div className={`tabs__container row ${FlowHelpers.currentHash( 'activity' )}`}>
            <div className="col-xs-12">
              {this.renderActivity()}
            </div>
          </div>
          <div className={`tabs__container row ${FlowHelpers.currentHash( 'shares' )}`}>
            <div className="user__gifts col-xs-12">
              {this.renderPosts()}
            </div>
          </div>
          <div className={`tabs__container row ${FlowHelpers.currentHash( 'wants' )}`}>
            <div className="col-xs-12">
              {this.renderWants()}
            </div>
          </div>
        </div>
      );
    }
  }
});
