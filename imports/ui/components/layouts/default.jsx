import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

export default Default = React.createClass({
  isPublicHome() {
    const isIndex = FlowRouter.current().route.name === 'index';
    return !Meteor.userId() && isIndex;
  },
  containerClass() {
    // Don't render container on public home page
    const isIndex = FlowRouter.current().route.name === 'index';
    return this.isPublicHome() ? '' : 'container';
  },
  renderHeader() {
    // Don't render header on public home page
    if ( !this.isPublicHome() ) {
      return <Header />;
    }
  },
  render() {
    return (
      <div>
        {this.renderHeader()}
        <main className={this.containerClass()}>
          {this.props.yield}
        </main>
      </div>
    );
  }
});
