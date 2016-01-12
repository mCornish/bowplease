GiftPage = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    const subscription = Meteor.subscribe( 'gifts-page', FlowRouter.getParam('id') );
    return {
      isLoading: !subscription.ready(),
      gift: Gifts.findOne(),
      comments: [],
      user: Meteor.user()
    };
  },
  createdMoment() {
    return moment( this.data.gift.created ).fromNow();
  },
  linkClass() {
    return '';
  },
  popupClass() {
    return '';
  },
  renderBuyButton() {
    if ( Meteor.userId() === this.data.gift.userId ) {
      return (
        <div>
          <div className="col-xs-3">
            <a className={`gift-page__button button col-xs-12 ${this.linkClass}`} href={this.data.gift.link} target="_blank"
              data-track="buy"><i className="fa fa-dollar"></i></a>
          </div>
          <div className="col-xs-3">
            <a className="gift-page__button button col-xs-12" href={FlowHelpers.pathFor( '/gifts/:id/edit', {id: this.data.gift._id} )}>Edit</a>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col-xs-6 col-sm-4">
          <a className={`gift-page__button button col-xs-12 ${this.linkClass}`} href="{this.data.gift.link}" target="_blank"
            data-track="buy"><i className="fa fa-dollar">Buy</i></a>
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
      return <CommentSubmit />;
    } else {
      return (
        <p className="col-xs-12 text-center">Please log in to leave a comment.</p>
      );
    }
  },
  renderComments() {
    return this.data.comments.map((comment, index) => {
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
    } else {
      return (
        <div className="page">
          <div className={`popup row ${this.popupClass}`}>
            <div className="col-xs-6 col-sm-4 col-sm-offset-2">
              <div className={`gift-page__button want-button button button--addon ${this.wantedClass}`} data-hook="want">
                <div className="row">
                  <div className="button--addon__addon col-xs-6 col-sm-8"><i className="fa fa-gift"></i> <span
                    className="hidden-xs">Want</span>
                  </div>
                  <div className="want-button__count col-xs-6 col-sm-4">{this.data.gift.wants}</div>
                </div>
              </div>
            </div>
            {this.renderBuyButton()}
          </div>

        <div className={`popup__container ${this.popupClass}`}>
            <div className={`popup__image-container ${this.popupClass}`}>
                <a href={this.data.gift.link} target="_blank">
                    <img className="popup__image" src={this.data.gift.image}/>
                </a>
            </div>
            <div className={`popup__content-container ${this.popupClass}`}>
                <p className="gift-page__description">{this.data.gift.description}</p>

                <div className="row">
                  {this.renderPrice()}
                  {this.renderRecipient()}
                  {this.renderAge()}
                  {this.renderOccasion()}
                </div>

                <a className="gift-page__author no-hover" href="/user/{this.data.gift.userId}">
                    <img className="comment__image" src="{this.data.user.profile.image}"/>
                    <span className="comment__author">{this.data.user.username}</span>
                    <span className="comment__submitted"> {this.createdMoment}</span>
                </a>

            </div>
        </div>
        <div className={`popup__container ${this.popupClass}`}>
            <div className={`popup__comments-container ${this.popupClass}`}>
                {this.renderCommentForm()}

                <ul className={`comments-container ${this.popupClass}`}>
                    {this.renderComments()}
                </ul>
            </div>
        </div>
  </div>
      );
    }
  }
});
