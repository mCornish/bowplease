GiftEdit = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    const subscription = Meteor.subscribe( 'gift-edit', FlowRouter.getParam( 'id' ) );
    return {
      isLoading: !subscription.ready(),
      gift: Gifts.findOne( FlowRouter.getParam( 'id' ) ),
      occasions: Occasions.find().fetch(),
      recipients: Recipients.find().fetch()
    };
  },
  componentDidUpdate() {
    Modules.client.giftEdit.submit( { form: "[data-hook=edit-form]", imageUrl: this.data.gift.image } );
  },
  handleSubmit( e ) {
    e.preventDefault();
  },
  deleteGift() {
    Modules.client.giftEdit.remove();
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
    if ( this.data.isLoading ) {
      return <Loading />;
    } else {
      return (
        <div className="page row">
          <form className="edit-form col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3" data-hook="edit-form" onSubmit={this.handleSubmit}>
            <div className="row">
              <p className="text-center">Sharing is caring: The more you describe the gift, the more helpful it will be to other gift-givers!</p>
            </div>

            <div className="row">
              <div className="col-xs-12">
                <a className="button button--submit button--delete col-xs-12" onClick={this.deleteGift}>Delete</a>
              </div>
            </div>

            <div className="row row--margin">
              <div className="col-xs-12">
                <ImageInput source={this.data.gift.image} />
              </div>
            </div>

            <div className="row row--margin">
              <div className="col-xs-12">
                <label htmlFor="description">Description</label>
                <textarea className="input-group__textarea" name="description"
                  placeholder="Tell us a little about this gift..."
                  id="description" type="text" rows="5" maxlength="1000" defaultValue={this.data.gift.description}></textarea>
              </div>
            </div>

            <div className="row row--margin">
              <div className="col-xs-12">
                <label htmlFor="link">Link</label>
                <input className="col-xs-12" name="link" placeholder="Where can someone buy it online?" id="link"
                  type="url" defaultValue={this.data.gift.link}/>
              </div>
            </div>

            <div className="row row--margin">
              <div className="col-xs-6">
                <label htmlFor="price">Price</label>
                <span className="input-addon input-prefix">$
                  <input className="input-group__input input-group" name="price"
                    placeholder="#.##" id="price" type="number" step="any" min="0" defaultValue={this.data.gift.price}
                    required/>
                </span>
              </div>
              <div className="col-xs-6 input-group--select">
                <label htmlFor="occasion">Occasion</label>
                <select id="occasion" className="col-xs-12" name="occasion" defaultValue={this.data.gift.occasion} data-hook="occasion">
                  <option>I got it because...</option>
                  {this.renderOccasions()}
                </select>
              </div>
            </div>

            <div className="row row--margin">
              <div className="col-xs-6 input-group--select">
                <RecipientSelect value={this.data.gift.recipient} />
              </div>

              <div className="col-xs-6">
                <label htmlFor="age">Recipient Age</label>
                <span className="input-addon input-suffix">
                  <input className="input-group__input" name="age" placeholder="##" id="age"
                    type="number" defaultValue={this.data.gift.age} required/>
                  <span className="input-group__bar"></span> years old
                </span>
              </div>
            </div>

            {/* Double row allows for desired button styling */}
            <div className="row row--margin">
              <div className="row row--margin">
                <div className="col-xs-12">
                  <button className="button button--submit col-xs-12" type="submit">Update</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
});
