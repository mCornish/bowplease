Account = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
      const subscription = Meteor.subscribe( 'account' );
      return {
          user: Meteor.user()
      };
  },
  getInitialState() {
    return {
      changingUsername: false,
      changingEmail: false,
      changingPassword: false,
      passText: 'SHOW',
      passType: 'password'
    };
  },
  togglePass() {
      if (this.state.passText === 'SHOW') {
          this.setState({
              passText: 'HIDE',
              passType: 'text'
          });
      } else {
          this.setState({
              passText: 'SHOW',
              passType: 'password'
          });
      }
  },
  changeUsername() {
    this.setState({
      changingUsername: true
    });
  },
  changeEmail() {
    this.setState({
      changingEmail: true
    });
  },
  changePassword() {
    this.setState({
      changingPassword: true
    });
  },
  getEmail() {
    // Find valid email address
    if (this.data.user.emails && this.data.user.emails.length === 1) {
      return typeof this.data.user.emails[0] === 'string' ? this.data.user.emails[0] : this.data.user.emails[0].address;
    } else {
      const email1 = this.data.user.emails[0].address;
      const email2 = this.data.user.emails[1].address;
      const email3 = this.data.user.emails[0];
      if (typeof email1 === 'string') {
        return email1;
      } else if (typeof email2 === 'string') {
        return email2;
      } else {
        return email3;
      }
    }
  },
  submitUsername( e, comp ) {
    e.preventDefault();
    Modules.client.account.changeUsername( e );
    this.setState({
      changingUsername: false
    });
  },
  submitEmail( e ) {
    e.preventDefault();
    Modules.client.account.changeEmail( e );
    this.setState({
      changingEmail: false
    });
  },
  submitPassword( e ) {
    e.preventDefault();
    Modules.client.account.changePassword( e );
    this.setState({
      changingPassword: false
    });
  },
  logout() {
    Modules.client.account.logout();
  },
  renderUsername() {
    if ( !this.state.changingUsername ) {
      return (
        <div className="row row--margin">
          <div className="col-xs-12"><strong>Username:</strong> {this.data.user.username}</div>
          <div className="col-xs-12">
            <button className="button col-xs-12" type="button" onClick={this.changeUsername}>
              Change Username
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <form className="row row--margin" onSubmit={this.submitUsername}>
          <div className="col-xs-12">
            <label htmlFor="username">Change Username</label>
            <input id="username" className="col-xs-12" type="text" name="username" placeholder="Username"
            defaultValue={this.data.user.username}/>
          </div>
          <div className="col-xs-12">
            <button className="button button--submit col-xs-12" type="submit">Change</button>
          </div>
        </form>
      );
    }
  },
  renderEmail() {
    if ( !this.state.changingEmail ) {
      return (
        <div className="row row--margin">
          <div className="col-xs-12"><strong>Email:</strong> {this.getEmail()}</div>
          <div className="col-xs-12">
            <button className="button col-xs-12" type="button" onClick={this.changeEmail}>
              Change Email
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <form className="row row--margin" onSubmit={this.submitEmail}>
          <div className="col-xs-12">
            <label htmlFor="email">Change Email</label>
            <input id="email" className="col-xs-12" type="email" name="email" placeholder="Email" defaultValue={this.getEmail()}/>
          </div>
          <div className="col-xs-12">
            <button className="button button--submit col-xs-12" type="submit">Update</button>
          </div>
        </form>
      );
    }
  },
  renderPassword() {
    if ( !this.state.changingPassword ) {
      return (
        <div className="row row--margin">
          <div className="col-xs-12">
            <button className="button col-xs-12" type="button" onClick={this.changePassword}>
              Change Password
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <form className="row row--margin" onSubmit={this.submitPassword}>
          <div className="col-xs-12">
            <label htmlFor="current-pass">Current Password</label>
            <div className="input-addon">
              <input id="current-pass" name="old-password" type={this.state.passType}/>
              <span className="float-right" onClick={this.togglePass}><strong>{this.state.passText}</strong></span>
            </div>
            <label htmlFor="password">New Password</label>
            <div className="input-addon">
              <input id="password" name="password" type={this.state.passType} required/>
              <span className="float-right" onClick={this.togglePass}><strong>{this.state.passText}</strong></span>
            </div>
            <button className="button button--submit col-xs-12" type="submit">Change</button>
          </div>
        </form>
      );
    }
  },
  render() {
    if (this.data.isLoading) {
      return <Loading />;
    } else {
      return (
        <div className="page">
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              {this.renderUsername()}
            </div>
            <div className="col-xs-12 col-sm-6">
              {this.renderEmail()}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              {this.renderPassword()}
            </div>
            <div className="col-xs-12 col-sm-6">
              <div className="row row--margin">
                <div className="col-xs-12">
                  <button className="button col-xs-12" type="button" onClick={this.logout}>Logout</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <div className="row row--margin">
                <div className="col-xs-12">
                  <a className="button col-xs-12" href="/privacy">Privacy Policy</a>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6">
              <div className="row row--margin">
                <div className="col-xs-12">
                  <a className="button col-xs-12" href="/agreement">Agreement</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
});
