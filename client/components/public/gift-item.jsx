GiftItem = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    const subscription = Meteor.subscribe( 'gift-item', this.props.gift.userId );
    return {
      isLoading: !subscription.ready(),
      user: Meteor.users.find( this.props.gift.userId ).fetch()
    }
  },
  getInitialState() {
    return {
      showPage: false
    };
  },
  ageString() {
    const age = this.props.gift.age;
    if ( age && age > 0 ) {
      return ` age ${age}`;
    } else {
      return '';
    }
  },
  closePopup() {
    window.history.pushState( {},"", `/` );
    this.setState({
      showPage: false
    });
  },
  imageClass() {
    return Modules.client.giftList.imageClass( this.props.gift.image );
  },
  showOverlay() {
    this.props.setOverlay(
      <div className="overlay">
        <div className="container">
          <div className="overlay__close" onClick={this.props.hideOverlay}><i className="fa fa-close"></i></div>
          <div className="overlay__shade"></div>
          <GiftPage gift={this.props.gift} />
        </div>
      </div>
    );
    this.props.showOverlay();
    window.history.pushState( {},"", `/gifts/${this.props.gift._id}` );
    this.setState({
      showPage: true
    });
  },
  recipientString() {
    const recipient = this.props.gift.recipient;
    if ( recipient && recipient.indexOf('...') < 0 ) {
      return `For a ${recipient}`;
    } else {
      return 'Recipient';
    }
  },
  renderCommentsCount() {
    if ( this.props.gift.commentsCount ) {
      return (
        <i className="fa fa-comments"> {this.props.gift.commentsCount}</i>
      );
    }
  },
  renderGiftInfo() {
    const recipient = this.props.gift.recipient;
    const age = this.props.gift.age;
    const hasRecipient = recipient && recipient.indexOf('...') < 0;
    const hasAge = age && age > 0;
    if (hasRecipient || hasAge) {
      return (
        <div>
          {this.recipientString()}{this.ageString()}
        </div>
      );
    } else {
      return (
        <span>
          No info provided. <a href={`/gifts/${this.props.gift._id}#info`}>Request more info.</a>
        </span>
      );
    }
  },
  // renderOverlay() {
  //   if ( this.state.showPage ) {
  //     return (
  //       <div className="overlay">
  //         <div className="container">
  //           <div className="overlay__close" onClick={this.props.hideOverlay}><i className="fa fa-close"></i></div>
  //           <div className="overlay__shade"></div>
  //           <GiftPage gift={this.props.gift} />
  //         </div>
  //       </div>
  //     );
  //   }
  // },
  renderWantsCount() {
    if ( this.state.wantsCount ) {
      return (
        <i className="fa fa-gift"> {this.state.wantsCount}</i>
      );
    }
  },
  render() {
    return (
      <div className="grid__item gift" data-hook="gift">
        <div className="no-hover gift__image">
          <img className={`grid__image ${this.imageClass()}`} src={this.props.gift.image} data-id={this.props.gift._id} onClick={this.showOverlay} />
          {/* Want button has to be in this container to provide correct hover affect on image */}
          <div className="gift__want">
            <WantButton counter={false} gift={this.props.gift} modifier={'light'} />
          </div>
          <div className="gift__icons">
            <p className="gift__icon">
              {this.renderWantsCount()}
            </p>
            <p className="gift__icon">
              {this.renderCommentsCount()}
            </p>
          </div>
        </div>

        <div className="grid__container gift__info">
          <div className="gift__icons visible-xs visible-sm">
            <p className="gift__icon">
              {this.renderWantsCount()}
            </p>
            <p className="gift__icon">
              {this.renderCommentsCount()}
            </p>
          </div>
          <div className="text-center">
            {this.renderGiftInfo()}
          </div>
          {/*
          <div className="gift__user">
            <a className="gift__user-name no-hover" href={`user/${this.props.gift.userId}`}>
              <img className="gift__user-image" src={this.data.user.profile.image}} /> {this.data.user.username}
            </a>
          </div>
          */}
        </div>
        {//this.renderOverlay()
        }
    </div>
    );
  }
});
