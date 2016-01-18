GiftsList = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    const subscription = Meteor.subscribe('gifts-list');
    return {
      isLoading: !subscription.ready(),
      occasions: Occasions.find().fetch(),
      recipients: Recipients.find().fetch()
    }
  },
  getInitialState() {
    return {
      filteredGifts: Modules.client.giftList.filteredGifts( 100, {created: -1} ),
      overlay: null,
      showFilter: false,
      showOverlay: false,
      sort: (() => {
        const hash = window.location.hash.substr(1, 4);
        if ( hash === 'top' ) {
          return {wantCount: 1};
        } else {
          if ( hash != 'new' ) {
            window.history.pushState( {},"", '/#new' );
          }
          return {created: -1};
        }
      })()
    };
  },
  filterClass() {
    return this.state.showFilter ? 'is-active' : '';
  },
  hideFilter() {
    this.setState({
      showFilter: false
    });
  },
  hideOverlay() {
    this.setState({
      showOverlay: false
    });
  },
  setFilteredGifts( gifts ) {
    this.setState({
      filteredGifts: gifts
    });
  },
  setOverlay( overlay ) {
    this.setState({
      overlay: overlay
    });
  },
  setSort( e ) {
    const sort = $( e.target ).attr('data-sort') || $( e.target ).parent().attr('data-sort');
    newQuery = {created: -1};
    topQuery = {wantsCount: -1};
    if ( sort === 'new' && this.state.sort != newQuery ) {
      this.setState({
        sort: newQuery
      });
    } else if ( sort === 'top' && this.state.sort != topQuery ) {
      this.setState({
        sort: topQuery
      });
    }
  },
  showFilter() {
    this.setState({
      showFilter: true
    });
  },
  showOverlay() {
    this.setState({
      showOverlay: true
    });
  },
  renderGifts() {
    if ( this.state.filteredGifts ) {
      return this.state.filteredGifts.map((gift, index) => {
        return <GiftItem key={index} gift={gift}
          hideOverlay={this.hideOverlay} showOverlay={this.showOverlay}
          setOverlay={this.setOverlay} />;
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
    } else if ( !this.state.showOverlay ) {
      return (
        <div className="browse page">
          <div className={`browse__filter-container form-inline in-top ${this.filterClass()}`}>
            <div className="container">
              <GiftsFilter setFilteredGifts={this.setFilteredGifts} sort={this.state.sort} />
              <div className="row row--margin">
                <p className="fake-link text-center col-xs-12" onClick={this.hideFilter}>
                  <i className="fa fa-close"> Close</i>
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <h2 className="fake-link text-center col-xs-6" onClick={this.showFilter}>Filter</h2>
            <div className="col-xs-6">
              <div className="row">
                <a className={`browse__filter-button button col-xs-6 ${FlowHelpers.currentHash( 'new' )}`} href="#new" data-sort="new" onClick={this.setSort}>
                  <i className="fa fa-star"> Newest</i>
                </a>
                <a className={`browse__filter-button button col-xs-6 ${FlowHelpers.currentHash( 'top' )}`} href="#top" data-sort="top" onClick={this.setSort}>
                  <i className="fa fa-trophy"> Top</i>
                </a>
              </div>
            </div>
          </div>

          <div className="grid row row--margin" data-hook="gifts">
            {this.renderGifts()}
          </div>
        </div>
      );
    } else {
      return (
        <div>
        {this.state.overlay}
        </div>
      );
    }
  }
});
