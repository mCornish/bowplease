GiftSubmit = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
      const subscription = Meteor.subscribe( 'gift-submit' );
      return {
          occasions: Occasions.find().fetch(),
          recipients: Recipients.find().fetch()
      };
  },
  getInitialState() {
    return {
      want: false
    };
  },
  componentDidMount() {
    Modules.client.giftSubmit.submit( { form: "[data-hook=submit-form]" } );
  },
  handleSubmit( e ) {
    e.preventDefault();
  },
  toggleWant() {
    const state = this.state.want;
    this.setState({
      want: !state
    });
  },
  renderOccasions() {
    return this.data.occasions.map(( occasion, index ) => {
      return <option key={index}>{occasion.name}</option>;
    });
  },
  renderRecipientInfo() {
    if ( !this.state.want ) {
      return (
        <div className="row row--margin">
          <div className="col-xs-6 input-group--select">
              <label htmlFor="recipient">Recipient</label>
              <select id="recipient" className="col-xs-12" name="recipient" data-hook="recipient"
                      data-track="change">
                  <option>This gift is for...</option>
                  {this.renderRecipients()}
              </select>
          </div>

          <div className="col-xs-6">
            <label htmlFor="age">Recipient Age</label>
            <span className="input-addon input-suffix">
              <input name="age" placeholder="##" id="age" type="number" data-track="change"/>years old
            </span>
          </div>
        </div>
      );
    }
  },
  renderRecipients() {
    return this.data.recipients.map(( recipient, index ) => {
      return <option key={index}>{recipient.name}</option>;
    });
  },
  renderSelfAge() {
    if ( this.state.want ) {
      return (
        <div className="col-xs-6">
          <label htmlFor="age">My Age</label>
          <span className="input-addon input-suffix">
            <input name="age" placeholder="##" id="age" type="number" data-track="change"/>years old
          </span>
        </div>
      );
    }
  },
  render() {
    return (
      <div className="page">
        <form className="submit__form row" data-hook="submit-form" onSubmit={this.handleGiftSubmit}>
          <div className="col-xs-12 col-md-6 col-md-offset-3">
            <div className="row">
              <p className="text-center col-xs-12"><strong>Sharing is caring:</strong>
                The more you describe the gift, the more helpful it will be to other gift-givers!</p>
            </div>

            <div className="row row--margin">
              <div className="col-xs-12">
                <ImageInput />
              </div>
            </div>

            <div className="row row--margin">
              <div className="col-xs-12">
                <label htmlFor="description">Description</label>
                <textarea name="description" placeholder="Tell us a little about this gift..."
                  id="description" type="text" rows="5" maxlength="1000" data-track="change"></textarea>
              </div>
            </div>

            <div className="row row--margin">
              <div className="col-xs-6">
                <label htmlFor="is-want" className="inline-block">This is for me</label>
                <input id="is-want" className="inline-block" name="is-want" type="checkbox" data-track="change" onChange={this.toggleWant}/>
              </div>
              {this.renderSelfAge()}
            </div>

            <div className="row row--margin">
              <div className="col-xs-12">
                <label htmlFor="link">Link</label>
                <input className="col-xs-12" name="link" placeholder="Where can someone buy it online?"
                  id="link" type="url" value="" data-track="change"/>
              </div>
            </div>

            <div className="row row--margin">
              <div className="col-xs-6">
                <label htmlFor="price">Price</label>
                <span className="input-addon input-prefix">$
                  <input name="price" placeholder="#.##" id="price" type="number" step="any" min="0" data-track="change"/>
                </span>
              </div>
              <div className="col-xs-6 input-group--select">
                <label htmlFor="occasion">Occasion</label>
                <select id="occasion" className="col-xs-12" name="occasion" data-hook="occasion" data-track="change">
                  <option>I got it because...</option>
                  {this.renderOccasions()}
                </select>
              </div>
            </div>

            {this.renderRecipientInfo()}

            {/* Double row allows for desired button styling */}
            <div className="row row--margin">
              <div className="row row--margin">
                <div className="col-xs-12">
                  <button className="button button--submit col-xs-12" type="submit">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
});
