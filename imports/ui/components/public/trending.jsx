Trending = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    const subscription = Meteor.subscribe( 'trending' );
    const yesterday = new Date( new Date().getTime() - ( 24 * 60 * 60 * 1000 ));
    const lastWeek = new Date( new Date().getTime() - ( 7 * 24 * 60 * 60 * 1000 ));

    return {
      isLoading: !subscription.ready(),
      topGift: Gifts.findOne({}, { sort: { wantCount: 1 }}),
      topToday: Gifts.find({ created: { $gte: yesterday }}, { sort: { wantCount: 1 }, limit: 3 }).fetch(),
      topWeek: Gifts.find({ created: { $gte: lastWeek }}, { sort: { wantCount: 1 }, limit: 3 }).fetch(),
    };
  },
  renderToday() {
    if ( this.data.topToday.length < 1 ) {
      if ( Meteor.userId() ) {
        return (
          <p>Be the first to <a href="/submit">post a gift</a> today!</p>
        );
      } else {
        return (
          <p>No gifts yet today. <button className="fake-link" onClick={authenticate}>Sign in</button> to post one.</p>
        );
      }
    } else {
      return (
        <div className="flex-center">
          {this.data.topToday.map(( gift, index ) => {
            return (
              <a className="user__gift" href={`/gifts/${gift._id}`} key={index}>
                <img src={gift.image} />
              </a>
            );
          })}
        </div>
      );
    }
  },
  renderWeek() {
    if ( this.data.topWeek.length < 1 ) {
      if ( Meteor.userId() ) {
        return (
          <p>Be the first to <a href="/submit">post a gift</a> this week!</p>
        );
      } else {
        return (
          <p>No gifts yet this week. <button className="fake-link" onClick={authenticate}>Sign in</button> to post one.</p>
        );
      }
    } else {
      return (
        <div className="flex-center">
          {this.data.topWeek.map(( gift, index ) => {
            return (
              <a className="user__gift" href={`/gifts/${gift._id}`} key={index}>
                <img src={gift.image} />
              </a>
            );
          })}
        </div>
      );
    }
  },
  render() {
    if ( this.data.isLoading ) {
      return <Loading />;
    } else {
      return (
        <div className="page flex-center-col">
          <h2>Top Trend</h2>
          <a className="user__gift" href={`/gifts/${this.data.topGift._id}`}>
            <img src={this.data.topGift.image} />
          </a>

          <h2>Today's Trends</h2>
          {this.renderToday()}

          <h2>This Week's Trends</h2>
          {this.renderWeek()}
        </div>
      );
    }
  }
});
