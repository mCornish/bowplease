Me = React.createClass({
    mixins: [ ReactMeteorData ],
    getMeteorData() {
        const subscription = Meteor.subscribe( 'me' );
        return {
            isLoading: !subscription.ready(),
            activity: Activity.find({ 'userId': Meteor.userId() }).fetch(),
            posts: Gifts.find({'userId': Meteor.userId()}, {limit: 3, sort: {created: -1}}).fetch(),
            wants: Gifts.find({'wanters': Meteor.userId()}, {limit: 3, sort: {created: -1}}).fetch(),
            user: Meteor.user()
        };
    },
    componentDidMount() {
        // Set default tab/hash to activity
        if (window.location.hash.length < 1) {
          window.location.hash = '#activity';
        }
    },
    renderActivity() {
        if ( this.data.activity.length > 0 ) {
            return this.data.activity.map(( item, index ) => {
              const gift = Gifts.findOne( item.giftId );
              return <ActivityItem key={index} activity={item} gift={gift} />;
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
                        {this.data.wants.map(( want, key ) => {
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
                        <div className="col-xs-6">
                            <a href="/me/profile">
                                <img className="me__user-image" src={this.data.user.profile.image}/>
                                &nbsp;{this.data.user.username}
                            </a>
                        </div>
                        <div className="col-xs-6 text-right">
                            <a href="/me/account"><i className="fa fa-cog"> Account</i></a>
                        </div>
                    </div>

                    <div className="tabs__menu row row--margin">
                        <a className={ 'tabs__tab col-xs-4 ' + FlowHelpers.currentHash( 'activity' )} href="/me#activity"
                           data-tab="activity">Activity</a>
                        <a className={ 'tabs__tab col-xs-4 ' + FlowHelpers.currentHash( 'shares' )} href="/me#shares"
                            data-tab="shares">Shares</a>
                        <a className={ 'tabs__tab col-xs-4 ' + FlowHelpers.currentHash( 'wants' )} href="/me#wants"
                           data-tab="wants">Wants</a>
                    </div>

                    <div className={'tabs__container ' + FlowHelpers.currentHash( 'activity' )}>
                        <div className="row">
                            <h1 className="text-center col-xs-12">Activity</h1>
                        </div>
                        {this.renderActivity()}
                    </div>
                    <div className={'tabs__container ' + FlowHelpers.currentHash( 'shares' )}>
                        <h1 className="text-center col-xs-12">You Shared</h1>

                        <div className="user__gifts row">
                            {this.renderPosts()}
                        </div>
                    </div>
                    <div className={'tabs__container ' + FlowHelpers.currentHash( 'wants' )}>
                        <h1 className="text-center col-xs-12">You Want</h1>

                        <div className="user__gifts row">
                            <div className="col-xs-12">
                                {this.renderWants()}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
});
