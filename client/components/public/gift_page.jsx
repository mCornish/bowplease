GiftPage = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    const propsGift = this.props.gift;
    const id = propsGift ? propsGift._id : FlowRouter.getParam( 'id' );
    const subscription = Meteor.subscribe( 'gifts-page', id );

    return {
      isLoading: !subscription.ready(),
      gift: propsGift || Gifts.findOne( id ),
      comments: Comments.find({ giftId: id }).fetch()
    };
  },
  createdMoment() {
    return moment( this.data.gift.created ).fromNow();
  },
  renderEditButton() {
    if ( Meteor.userId() === this.data.gift.userId ) {
      return (
        <a className="gift-page__edit button button--slim" href={FlowHelpers.pathFor( '/gifts/:id/edit', {id: this.data.gift._id} )}>Edit</a>
      );
    }
  },
  renderCommentForm() {
    if ( Meteor.userId() ) {
      return <CommentSubmit giftId={this.data.gift._id} />;
    } else {
      return (
        <p className="flex-center"><button className="fake-link" onClick={authenticate}>Log in</button> to leave a comment.</p>
      );
    }
  },
  renderComments() {
    return this.data.comments.map(( comment, index ) => {
        return <CommentItem key={index} comment={comment} />;
    });
  },
  renderInfoString() {
    if ( this.data.gift.occasion || this.data.gift.recipient || this.data.gift.age ) {
      let string = '';
      string += this._occasionString();
      string += this._recipientString();
      string += this._ageString();
      return string;
    } else {
      return (
        <span>No gift info. <a href="#info">Request info</a>.</span>
      );
    }
  },
  _occasionString() {
    let string = '';
    if ( this.data.gift.occasion ) {
      string += `A ${this.data.gift.occasion} gift `;
    }
    return string;
  },
  _recipientString() {
    let string = '';
    const recipient = this.data.gift.recipient;
    const occasion = this.data.gift.occasion;
    const age = this.data.gift.age;
    if ( occasion ) {
      string += 'for ';
    } else {
      string += 'For ';
    }
    if ( recipient ) {
      string += `a ${recipient}`;
    } else if ( age > 0 ) {
      string += 'someone';
    }
    return string;
  },
  _ageString() {
    let string = '';
    const age = this.data.gift.age;
    if ( age > 0 ) {
      string += `, age ${age}`;
    }
    return string;
  },
  render() {
    if ( this.data.isLoading ) {
      return <Loading />;
    } else if ( !this.data.gift ) {
      return (
        <div className="page">
          <p className="col-xs-12 text-center">
            This doesn't seem to be a real gift. Maybe you should <a href='/'>look for a different gift</a>.
          </p>
        </div>
      );
    } else {
      return (
        <div className="page">
          <BackButton />
          <a className="flex-center" href={this.data.gift.link} target="_blank">
            <img className="gift-page__image" src={this.data.gift.image}/>
          </a>
          <div className="gift-page__info flex-center">{this.renderInfoString()}</div>
          <div className="flex-center flex-wrap row--margin">
            <BuyButton userId={this.data.gift.userId} link={this.data.gift.link} price={this.data.gift.price} />
            <WantButton counter={false} gift={this.data.gift} />
            {this.renderEditButton()}
          </div>
          <div className="row row--margin">
            <div className="col-xs-12 col-md-6 col-md-offset-3">
              <p>{this.data.gift.description}</p>
              <a href={`/users/${this.data.gift.userId}#activity`}>
                <UserInfo userId={this.data.gift.userId} />
                <span className="comment__submitted"> {this.createdMoment()}</span>
              </a>
            </div>
          </div>
          <div className="row--margin">
            {this.renderCommentForm()}
          </div>
          <div className="row row--margin">
            <div className="col-xs-12 col-md-6 col-md-offset-3">
              {this.renderComments()}
            </div>
          </div>
        </div>
      );
    }
  }
});
