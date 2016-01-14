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
  popupClass() {
    return '';
  },
  renderEditButton() {
    if ( Meteor.userId() === this.data.gift.userId ) {
      return (
        <div className="col-xs-3">
          <a className="gift-page__button button col-xs-12" href={FlowHelpers.pathFor( '/gifts/:id/edit', {id: this.data.gift._id} )}>Edit</a>
        </div>
      );
    }
  },
  renderPrice() {
    if ( this.data.gift.price > 0 ) {
      return (
        <p className="col-xs-12 col-sm-6 col-md-3"><strong>Price:</strong> ${this.data.gift.price.toFixed(2)}</p>
      );
    }
  },
  renderRecipient() {
    if ( this.data.gift.recipient ) {
      return (
        <p className="col-xs-12 col-sm-6 col-md-3"><strong>Recipient:</strong> {this.data.gift.recipient}</p>
      );
    }
  },
  renderAge() {
    if ( this.data.gift.age > 0 ) {
      return (
        <p className="col-xs-12 col-sm-6 col-md-3"><strong>Age:</strong> {this.data.gift.age}</p>
      );
    }
  },
  renderCommentForm() {
    if ( Meteor.userId() ) {
      return <CommentSubmit giftId={this.data.gift._id} />;
    } else {
      return (
        <p className="col-xs-12 text-center">Please log in to leave a comment.</p>
      );
    }
  },
  renderComments() {
    return this.data.comments.map(( comment, index ) => {
        return <CommentItem key={index} comment={comment} />;
    });
  },
  renderOccasion() {
    if ( this.data.gift.occasion ) {
      return (
        <p className="col-xs-12 col-sm-6 col-md-3"><strong>Occasion:</strong> {this.data.gift.occasion}</p>
      );
    }
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
          <div className={`popup__container ${this.popupClass()}`}>
            <div className={`popup__image-container ${this.popupClass()}`}>
                <a href={this.data.gift.link} target="_blank">
                    <img className="popup__image" src={this.data.gift.image}/>
                </a>
            </div>
            <div className="popup row row--margin">
              <BuyButton userId={this.data.gift.userId} link={this.data.gift.link} price={this.data.gift.price} />
              <div className="col-xs-3">
                <WantButton counter={false} gift={this.data.gift} />
              </div>
              {this.renderEditButton()}
            </div>
            <div className={`popup__content-container ${this.popupClass()}`}>
                <p className="gift-page__description">{this.data.gift.description}</p>

                <div className="row">
                  {this.renderPrice()}
                  {this.renderRecipient()}
                  {this.renderAge()}
                  {this.renderOccasion()}
                </div>

                <a className="gift-page__author no-hover" href={`/users/${this.data.gift.userId}`}>
                    <UserInfo userId={this.data.gift.userId} />
                    <span className="comment__submitted"> {this.createdMoment()}</span>
                </a>

            </div>
        </div>
        <div className={`popup__container ${this.popupClass()}`}>
            <div className={`popup__comments-container ${this.popupClass()}`}>
                {this.renderCommentForm()}

                <ul className={`comments-container ${this.popupClass()}`}>
                    {this.renderComments()}
                </ul>
            </div>
        </div>
  </div>
      );
    }
  }
});
