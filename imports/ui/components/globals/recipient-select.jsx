import React from 'react';
import Loading from '../../../ui/components/globals/loading';

export default RecipientSelect = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    const subscription = Meteor.subscribe('recipients');
    return {
      isLoading: !subscription.ready(),
      recipients: Recipients.find().fetch()
    }
  },
  renderGenderOptions() {
    return this.data.recipients.map(( recipient, index ) => {
      if ( recipient.gender != 'neutral' ) {
        return <option key={index} value={recipient.name}>{recipient.name}</option>;
      }
    });
  },
  renderFemaleOptions() {
    return this.data.recipients.map(( recipient, index ) => {
      if ( recipient.gender === 'neutral' ) {
        return <option key={index} value={`${recipient.name} (Female)`}>{recipient.name} (Female)</option>;
      }
    });
  },
  renderMaleOptions() {
    return this.data.recipients.map(( recipient, index ) => {
      if ( recipient.gender === 'neutral' ) {
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
          <select id="recipient" className={this.props.className} name="recipient" defaultValue={this.props.value} data-hook="recipient">
            <option value="default">Who is it for?</option>
            {this.renderGenderOptions()}
            {this.renderFemaleOptions()}
            {this.renderMaleOptions()}
          </select>
        </div>
      );
    }
  }
})
