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
      overlay: null,
      showFilter: false,
      showOverlay: false,
      sort: {created: -1}
    };
  },
  filterClass() {
    return this.state.showFilter ? 'is-active' : '';
  },
  filteredGifts() {
    return Modules.client.giftList.filteredGifts( 100, this.state.sort );
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
  setOverlay( overlay ) {
    this.setState({
      overlay: overlay
    });
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
    if ( this.filteredGifts() ) {
      return this.filteredGifts().map((gift, index) => {
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
              <GiftsFilter reRender={this.renderGifts} />
              <div className="row row--margin">
                <p className="fake-link text-center col-xs-12" onClick={this.hideFilter}>
                  <i className="fa fa-close"> Close</i>
                </p>
              </div>
            </div>
          </div>
          <div className="row">
          <h2 className="fake-link text-center col-xs-12" onClick={this.showFilter}>Filter</h2>
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
