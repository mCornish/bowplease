Profile = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
      return {
          user: Meteor.user()
      };
  },
  getInitialState() {
    return {
      gender: Meteor.user().profile.gender
    };
  },
  componentDidMount() {
    Modules.client.profile.update( { form: "[data-hook=profile-form]" } );
  },
  handleSubmit( e ) {
    e.preventDefault();
  },
  onGenderChanged( e ) {
    this.setState({
      gender: e.currentTarget.value
    });
  },
  trackChange( e ) {
    Modules.client.profile.track( e );
  },
  renderCountries() {
    return Modules.client.profile.countries().map(( country, index ) => {
      return <option value={country.name} key={index}>{country.name}</option>;
    });
  },
  render() {
    if ( this.data.isLoading ) {
      return <Loading />;
    } else {
      return (
        <div className="page row">
          <form className="col-xs-12 col-md-6 col-md-offset-3" data-hook="profile-form" onSubmit={this.handleSubmit}>
            <div className="row row--margin">
              <div className="col-xs-12">
                <ImageInput source={this.data.user.profile.image} />
              </div>
            </div>

            <div className="row row--margin">
              <div className="col-xs-6">
                <label htmlFor="name">Full Name</label>
                <input id="name" className="col-xs-12" name="name" defaultValue={this.data.user.profile.name} type="text"
                  autocapitalize="words" autocorrect="off" autocomplete="name" onChange={this.trackChange}/>
              </div>
              <div className="col-xs-6">
                <fieldset className="row">
                  <legend>Gender</legend>
                  <div className="col-xs-6">
                    <input className="input-group__radio col-xs-1" name="gender" defaultValue="male"
                      type="radio" id="male" onChange={this.trackChange} onClick={this.onGenderChanged} checked={this.state.gender === 'male'} />
                    <label className="col-xs-11" htmlFor="male">Male</label>
                  </div>
                  <div className="col-xs-6">
                    <input className="input-group__radio col-xs-1" name="gender" defaultValue="female"
                      type="radio" id="female" onChange={this.trackChange} onClick={this.onGenderChanged} checked={this.state.gender === 'female'} />

                    <label className="col-xs-11" htmlFor="female">Female</label>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className="row row--margin">
              <div className="col-xs-6">
                <label className="input-group__label" htmlFor="birthday">Birthday</label>
                <input id="birthday" className="col-xs-12" name="birthday" defaultValue={this.data.user.profile.birthday}
                  data-hook="birthday" type="date" onChange={this.trackChange} />
              </div>
              <div className="col-xs-6">
                <label htmlFor="website">Website</label>
                <input id="website" className="col-xs-12" name="website" placeholder="http://example.com"
                  defaultValue={this.data.user.profile.website} data-hook="website" type="url" onChange={this.trackChange} />
              </div>
            </div>
            <div className="row row--margin">
              <div className="col-xs-6">
                <label htmlFor="country">Country</label>
                <select id="country" className="col-xs-12" name="country" defaultValue={this.data.user.profile.country} data-hook="country"
                  type="text" onChange={this.trackChange}>
                  <option>Select one...</option>
                  {this.renderCountries()}
                </select>
              </div>
              <div className="col-xs-6">
                <label htmlFor="location">Location</label>
                <input id="location" className="col-xs-12" name="location" placeholder="Santa's Workshop"
                  defaultValue={this.data.user.profile.location} data-hook="location" type="text" onChange={this.trackChange} />
              </div>
            </div>

            <div className="row row--margin">
              <button className="button button--submit col-xs-12" type="submit">Update</button>
            </div>
          </form>
        </div>
      );
    }
  }
});
