RecipientSelect = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    const subscription = Meteor.subscribe('recipients');
    return {
      isLoading: !subscription.ready(),
      recipients: Recipients.find().fetch()
    }
  },
  renderFemaleOptions() {
    return this.data.recipients.map(( recipient, index ) => {
      if ( recipient.gender != 'neutral' ) {
        return <option key={index} value={recipient.name}>{recipient.name}</option>;
      } else {
        return <option key={index} value={`${recipient.name} (Female)`}>{recipient.name} (Female)</option>;
      }
    });
  },
  renderMaleOptions() {
    return this.data.recipients.map(( recipient, index ) => {
      if ( recipient.gender === 'neutral' ) {
        return <option key={index} value={recipient.name}>{recipient.name}</option>;
      } else {
        return <option key={index} value={`${recipient.name} (Male)`}>{recipient.name} (Male)</option>;
      }
    });
  },
  render() {
    if ( this.data.isLoading ) {
      return <Loading />;
    } else {
      return (
        <div>
          <label htmlFor="recipient">Recipient</label>
          <select id="recipient" className="col-xs-12" name="recipient" defaultValue={this.props.value} data-hook="recipient">
            <option>This gift is for...</option>
            {this.renderFemaleOptions()}
            {this.renderMaleOptions()}
          </select>
        </div>
      );
    }
  }
})
