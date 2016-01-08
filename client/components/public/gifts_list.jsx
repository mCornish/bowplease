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
      showFilter: false
    }
  },
  getFilterActive() {
    return this.state.showFilter ? 'is-active' : '';
  },
  ageActive( age ) {
    return '';
  },
  createdActive( date ) {
    return '';
  },
  renderGifts() {
    if (this.filteredGifts) {
      return this.filteredGifts.map((gift, index) => {
        return <GiftItem key={index} gift={gift} />;
      });
    } else {
      return (
        <div className="row row--margin" data-hook="filter-button">
          <div className="col-xs-12">
            There doesn't appear to be any gifts. Maybe you should try a <span className="fake-link">different filter</span>.
          </div>
        </div>
      );
    }
  },
  renderOccasions() {
    return this.data.occasions.map((occasion, index) => {
      return <option key={index} className={this.occasionActive( occasion.name )}>{occasion.name}</option>;
    });
  },
  renderRecipients() {
    return this.data.recipients.map((recipient, index) => {
      return <option key={index} className={this.recipientActive( recipient.name )}>{recipient.name}</option>;
    });
  },
  render() {
    if (this.data.isLoading) {
      return <Loading />;
    } else {
      return (
        <div className="browse">
          <div className="browse__filter-container form-inline in-top {this.getFilterActive()}">
            <div className="container">
              <div className="browse__filter row">
                <div className="col-xs-12">
                  <div className="row">
                    <div className="col-xs-6">
                      <a className="browse__filter-button button col-xs-12 {FlowHelpers.currentEndpoint( 'new' )}" href="./new">
                        <i className="fa fa-star"> Newest</i>
                      </a>
                    </div>
                    <div className="col-xs-6">
                      <a className="browse__filter-button button col-xs-12 {FlowHelpers.currentEndpoint( 'top' )}"
                      href="./top">
                        <i className="fa fa-trophy"> Top</i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="row row--margin">
                    <div className="input-group--select col-xs-12 col-md-4 grp-sm">
                      <label htmlFor="created">Submitted</label>
                      <select id="created" className="col-xs-12" name="created" data-hook="created" data-track="change">
                        <option selected={this.createdActive( 'Today' )}>Today</option>
                        <option selected={this.createdActive( 'This week' )}>This week</option>
                        <option selected={this.createdActive( 'This month' )}>This month</option>
                        <option selected={this.createdActive( 'This year' )}>This year</option>
                        <option selected={this.createdActive( null )}>All time</option>
                      </select>
                    </div>

                    <div className="col-xs-12 col-md-8">
                      <div className="row">

                        <div className="col-xs-6">
                          <label className="input-group__label" htmlFor="min-price">Min Price</label>
                          <div className="input-addon input-prefix">$
                            <input className="input-group__input input-group__input--addon"
                              data-hook="min-price"
                              name="min-price" id="min-price" placeholder="0.00" type="number"
                              step="any"
                              min="0" value="" data-track="change" required/>
                          </div>
                        </div>

                        <div className="col-xs-6">
                          <label className="input-group__label" htmlFor="max-price">Max Price</label>
                          <div className="input-addon input-prefix">$
                            <input className="input-group__input--addon" data-hook="max-price"
                              name="max-price" id="max-price" placeholder="0.00" type="number"
                              step="any"
                              min="0" value="" data-track="change"
                              required/>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xs-12">
                  <div className="row">

                    <div className="col-xs-12 col-md-8">
                      <div className="row">
                        <div className="input-group--select col-xs-6">
                          <label htmlFor="recipient">Recipient</label>
                          <select id="recipient" className="col-xs-12" name="recipient" data-hook="recipient" data-track="change">
                            <option>Anyone</option>
                            {this.renderRecipients()}
                          </select>
                        </div>

                        <div className="input-group--select col-xs-6">
                          <label htmlFor="age">Age</label>
                          <select id="age" className="col-xs-12" name="age" data-hook="age" data-track="change">
                            <option>Any</option>
                            <option selected={this.ageActive( 0 )}>Newborn</option>
                            <option selected={this.ageActive( 1 )}>1 - 5</option>
                            <option selected={this.ageActive( 11 )}>11 - 15</option>
                            <option selected={this.ageActive( 16 )}>16 - 20</option>
                            <option selected={this.ageActive( 21 )}>21 - 30</option>
                            <option selected={this.ageActive( 31 )}>31 - 40</option>
                            <option selected={this.ageActive( 41 )}>41 - 50</option>
                            <option selected={this.ageActive( 50 )}>50+</option>
                          </select>
                        </div>

                      </div>
                    </div>

                    <div className="input-group--select col-xs-12 col-md-4">
                      <label htmlFor="occasion">Occassion</label>
                      <select id="occasion" className="col-xs-12" name="occasion" data-hook="occasion" data-track="change">
                        <option>Any Occasion</option>
                        {this.renderOccasions()}
                      </select>
                    </div>

                  </div>
                </div>
              </div>
              <div className="row row--margin">
              <p className="fake-link text-center col-xs-12" data-hook="filter-button"><i
              className="fa fa-close">Close</i></p>
              </div>
            </div>
          </div>

          <div className="row">
          <h2 className="fake-link text-center col-xs-12" data-hook="filter-button">Filter</h2>
          </div>

          <div className="grid row row--margin" data-hook="gifts">
            {this.renderGifts()}
          </div>
        </div>
      );
    }
  }
});
