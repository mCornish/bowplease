Me = React.createClass({
    mixins: [ ReactMeteorData ],
    getMeteorData() {
        const subscription = Meteor.subscribe( 'me' );
        return {
            isLoading: !subscription.ready(),
            activity: Activity.find(),
            posts: Gifts.find({'userId': Meteor.userId()}, {limit: 3, sort: {created: -1}}),
            wants: Gifts.find({'wanters': Meteor.userId()}, {limit: 3, sort: {created: -1}}),
            user: Meteor.user().fetch()
        };
    },
    renderActivity() {
        if ( this.data.activity ) {
            return this.data.activity.map((item) => {
                return <ActivityItem />;
            });
        } else {
            return (
                <p class="text-center">You haven't done anything yet! You should try <a href="/">browsing some gifts</a>.</p>
            );
        }
    },
    renderPosts() {
        if ( this.data.posts ) {
            const posts = this.data.posts.map((post) => {
                return (
                    <a class="user__gift no-hover col-xs-4" href="/gifts/{post._id}">
                        <img src="{post.image}"/>
                    </a>
                );
            });
            return  (
                <div class="col-xs-12">
                    <div class="row">
                        {posts}
                    </div>
                    <div class="row row--margin">
                        <a class="col-xs-12 text-center" href="/me/posts">View All</a>
                    </div>
                </div>
            );
        } else {
            return (
                <p>You haven't shared any gifts. <a href="/submit">Try it out</a>.</p>
            );
        }
    },
    renderWants() {
        if ( this.data.wants ) {
            const wants = this.data.wants.map((want) => {
                return (
                    <a class="user__gift no-hover col-xs-4" href="/gifts/{want._id}">
                        <img src="{want.image}"/>
                    </a>
                );
            });
            return  (
                <div class="col-xs-12">
                    <div class="row">
                        {wants}
                    </div>
                    <div class="row row--margin">
                        <a class="col-xs-12 text-center" href="/me/wants">View All</a>
                    </div>
                </div>
            );
        } else {
            return (
                <p>You don't want anything? Come on, <a href="/">take a look</a>.</p>
            );
        }
    },
    render() {
        if (this.data.isLoading) {
            return <Loading />;
        } else {
            return (
                <div class="me page">
                    <div class="row">
                        <div class="col-xs-6">
                            <a href="/me/profile">
                                <img class="me__user-image" src="{this.data.user.image}"/>
                                {this.data.user.username}
                            </a>
                        </div>
                        <div class="col-xs-6 text-right">
                            <a href="/me/account"><i class="fa fa-cog"> Account</i></a>
                        </div>
                    </div>

                    <div class="tabs__menu row row--margin">
                        <a class="tabs__tab col-xs-4 {this.tabActive( 'activity' )}" href="/me#activity"
                           data-hook="tab" data-tab="activity">Activity</a>
                        <a class="tabs__tab col-xs-4 {this.tabActive( 'shares' )}" href="/me#shares"
                           data-hook="tab" data-tab="shares">Shares</a>
                        <a class="tabs__tab col-xs-4 {this.tabActive( 'wants' )}" href="/me#wants"
                           data-hook="tab" data-tab="wants">Wants</a>
                    </div>

                    <div class="tabs__container {this.tabActive( 'activity' )}">
                        <div class="row">
                            <h1 class="text-center col-xs-12">Activity</h1>
                        </div>
                        {this.renderActivity()}
                    </div>
                    <div class="tabs__container {this.tabActive( 'shares' )}">
                        <h1 class="text-center col-xs-12">You Shared</h1>

                        <div class="user__gifts row">
                            {this.renderPosts()}
                        </div>
                    </div>
                    <div class="tabs__container {this.tabActive( 'wants' )}">
                        <h1 class="text-center col-xs-12">You Want</h1>

                        <div class="user__gifts row">
                            <div class="col-xs-12">
                                {this.renderWants()}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
});
