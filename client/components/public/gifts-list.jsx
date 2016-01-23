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
    window.history.pushState( {}, '', '/#new' );
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
    this._updateHash( sort );
  },
  _updateHash( hash ) {
    const current = window.location.hash;
    const qLoc = current.indexOf( '?' );
    let query = '';
    if ( qLoc > -1 ) {
      query = current.substr( qLoc );
    }
    window.location.hash = `#${hash}${query}`;
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
          <div className="flex-center">
            <h2 className="browse__filter-button fake-link" onClick={this.showFilter}>Filter</h2>
            <div className={`browse__sort-button button ${FlowHelpers.currentHash( 'new' )}`} data-sort="new" onClick={this.setSort}>
              <i className="fa fa-star"> Newest</i>
            </div>
            <div className={`browse__sort-button button no-spacer ${FlowHelpers.currentHash( 'top' )}`} data-sort="top" onClick={this.setSort}>
              <i className="fa fa-trophy"> Top</i>
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
