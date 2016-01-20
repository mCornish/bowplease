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
  getInitialState() {
    return {
      initialize: true
    };
  },
  componentDidMount() {
    this.props.setFilteredGifts( Modules.client.giftList.filteredGifts( 100, this.props.sort ) );
  },
  componentWillReceiveProps( nextProps ) {
    // Initialize/Update filtered gifts
    if ( nextProps.sort != this.props.sort ) {
      this.setState({
        initialize: false
      });
      this.props.setFilteredGifts( Modules.client.giftList.filteredGifts( 100, nextProps.sort ) );
    }
  },
  handleChange( e ) {
    this.props.setFilteredGifts( Modules.client.giftList.filteredGifts( 100, this.props.sort ) );
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
            <div className="input-group--select col-xs-12 col-md-4 grp-sm">
              <label htmlFor="created">Submitted</label>
              <select id="created" className="col-xs-12" name="created" defaultValue="All time" onChange={this.handleChange}>
                <option value="Today">Today</option>
                <option value="This week">This week</option>
                <option value="This month">This month</option>
                <option value="This year">This year</option>
                <option value="All time">All time</option>
              </select>
            </div>

            <div className="col-xs-12 col-md-8">
              <div className="row">

                <div className="col-xs-6">
                  <label className="input-group__label" htmlFor="min-price">Min Price</label>
                  <div className="input-addon input-prefix">$
                    <input id="min-price" className="input-group__input--addon" name="min-price"  placeholder="0.00" type="number"
                      step="any" min="0" onChange={this.handleChange} required/>
                  </div>
                </div>

                <div className="col-xs-6">
                  <label className="input-group__label" htmlFor="max-price">Max Price</label>
                  <div className="input-addon input-prefix">$
                    <input id="max-price" className="input-group__input--addon" name="max-price" placeholder="0.00" type="number"
                      step="any" min="0" onChange={this.handleChange} required/>
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
                  <select id="recipient" className="col-xs-12" name="recipient"
                    defaultValue={Session.get('recipientVal')} onChange={this.handleChange}>
                    <option value="default">Anyone</option>
                    {this.renderRecipients()}
                  </select>
                </div>

                <div className="input-group--select col-xs-6">
                  <label htmlFor="age">Age</label>
                  <select id="age" className="col-xs-12" name="age" defaultValue={Session.get('ageVal')} onChange={this.handleChange}>
                    <option value="Any">Any</option>
                    <option value="Newborn">Newborn</option>
                    <option value="1 - 5">1 - 5</option>
                    <option value="11 - 15">11 - 15</option>
                    <option value="16 - 20">16 - 20</option>
                    <option value="21 - 30">21 - 30</option>
                    <option value="31 - 40">31 - 40</option>
                    <option value="41 - 50">41 - 50</option>
                    <option value="50+">50+</option>
                  </select>
                </div>

              </div>
            </div>

            <div className="input-group--select col-xs-12 col-md-4">
              <label htmlFor="occasion">Occassion</label>
              <select id="occasion" className="col-xs-12" name="occasion"
                defaultValue={Session.get('occasionVal')} onChange={this.handleChange}>
                <option value="default">Any Occasion</option>
                {this.renderOccasions()}
              </select>
            </div>

          </div>
        </div>
      </div>
    );
  }
});
