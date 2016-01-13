GiftsFilter = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    const subscription = Meteor.subscribe('gifts-filter');
    return {
      isLoading: !subscription.ready(),
      occasions: Occasions.find().fetch(),
      recipients: Recipients.find().fetch()
    }
  },
  trackChange( e ) {
    this.props.reRender();
    Modules.client.giftList.track( e );
  },
  renderOccasions() {
    return this.data.occasions.map(( occasion, index ) => {
      return <option key={index} value={occasion.name}>{occasion.name}</option>;
    });
  },
  renderRecipients() {
    return this.data.recipients.map(( recipient, index ) => {
      return <option key={index} value={recipient.name}>{recipient.name}</option>;
    });
  },
  render() {
    return (
      <div className="browse__filter row">
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-6">
              <a className={`browse__filter-button button col-xs-12 ${FlowHelpers.currentEndpoint( 'new' )}`} href="./new">
                <i className="fa fa-star"> Newest</i>
              </a>
            </div>
            <div className="col-xs-6">
              <a className={`browse__filter-button button col-xs-12 ${FlowHelpers.currentEndpoint( 'top' )}`} href="./top">
                <i className="fa fa-trophy"> Top</i>
              </a>
            </div>
          </div>
        </div>
        <div className="col-xs-12">
          <div className="row row--margin">
            <div className="input-group--select col-xs-12 col-md-4 grp-sm">
              <label htmlFor="created">Submitted</label>
              <select id="created" className="col-xs-12" name="created" defaultValue={null} onChange={this.trackChange}>
                <option value="Today">Today</option>
                <option value="This week">This week</option>
                <option value="This month">This month</option>
                <option value="This year">This year</option>
                <option value={null}>All time</option>
              </select>
            </div>

            <div className="col-xs-12 col-md-8">
              <div className="row">

                <div className="col-xs-6">
                  <label className="input-group__label" htmlFor="min-price">Min Price</label>
                  <div className="input-addon input-prefix">$
                    <input id="min-price" className="input-group__input--addon" name="min-price"  placeholder="0.00" type="number"
                      step="any" min="0" onChange={this.trackChange} required/>
                  </div>
                </div>

                <div className="col-xs-6">
                  <label className="input-group__label" htmlFor="max-price">Max Price</label>
                  <div className="input-addon input-prefix">$
                    <input id="max-price" className="input-group__input--addon" name="max-price" placeholder="0.00" type="number"
                      step="any" min="0" onChange={this.trackChange} required/>
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
                  <select id="recipient" className="col-xs-12" name="recipient" onChange={this.trackChange}>
                    <option>Anyone</option>
                    {this.renderRecipients()}
                  </select>
                </div>

                <div className="input-group--select col-xs-6">
                  <label htmlFor="age">Age</label>
                  <select id="age" className="col-xs-12" name="age" onChange={this.trackChange}>
                    <option>Any</option>
                    <option value="0">Newborn</option>
                    <option value="1">1 - 5</option>
                    <option value="11">11 - 15</option>
                    <option value="16">16 - 20</option>
                    <option value="21">21 - 30</option>
                    <option value="31">31 - 40</option>
                    <option value="41">41 - 50</option>
                    <option value="50">50+</option>
                  </select>
                </div>

              </div>
            </div>

            <div className="input-group--select col-xs-12 col-md-4">
              <label htmlFor="occasion">Occassion</label>
              <select id="occasion" className="col-xs-12" name="occasion" onChange={this.trackChange}>
                <option>Any Occasion</option>
                {this.renderOccasions()}
              </select>
            </div>

          </div>
        </div>
      </div>
    );
  }
});
