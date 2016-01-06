Login = React.createClass({
    componentDidMount() {
        Modules.client.login.withEmail( { form: "[data-hook=login]", template: Template.instance() } );
    },
    getInitialState() {
        return {
            passText: 'SHOW',
            passType: 'password'
        }
    },
    emailLogin( e ) {
        e.preventDefault();
    },
    facebookLogin() {
        Modules.client.login.withFacebook();
    },
    togglePass() {
        this.setState({
            passText: 'HIDE',
            passType: 'text'
        });
    },
    toForgPass() {
        Modules.client.login.toForgPass()
    },
    render() {
        return (
            <div className="login-form out-left">
                  <div className="row">
                      <div className="col-xs-12 col-md-6 col-md-offset-3">
                          <button className="login__facebook button button--addon col-xs-12" type="button"
                                  onClick={this.facebookLogin()}>
                              <div className="login__icon login__facebook-icon button--addon__addon col-xs-3"><i
                                      className="fa fa-facebook"></i>
                              </div>
                              <span className="col-xs-9">Use Facebook</span>
                          </button>
                      </div>
                  </div>

                  <form className="row row--margin" onSubmit={this.emailLogin}>
                      <div className="col-xs-12 col-md-6 col-md-offset-3">
                          <div className="row row--margin">
                              <div className="col-xs-12">
                                  <label className="input-addon" htmlFor="email">Email:&nbsp;
                                   <input id="email" name="email" data-hook="email" type="email" autocapitalize="off"
                                         autocorrect="off" autocomplete="email" placeholder="santa@northpole.com" required/>
                                  </label>
                              </div>
                          </div>
                          <div className="row row--margin">
                              <div className="col-xs-12">
                                  <label className="input-addon" htmlFor="password">Password:&nbsp;
                                      <input id="password" name="password" data-hook="password" type="{this.state.passType}" required/>
                                      <span className="float-right pointer" onClick={this.togglePass()}><strong>{this.state.passText}</strong></span>
                                  </label>
                              </div>
                          </div>
                      </div>

                      <div className="login__links col-xs-12 col-md-6 col-md-offset-3">
                          <div className="row">
                              <div className="col-xs-12 text-center">
                                  <a className="login__link" onClick={this.toForgPass()}>Forgot Password</a>
                              </div>
                          </div>
                      </div>
                      <div className="col-xs-12">
                          <div className="row row--margin">
                              <div className="col-xs-12 col-md-6 col-md-offset-3">
                                  <button className="button button--submit col-xs-12" type="submit">
                                      <span>Let's Go</span>
                                  </button>
                              </div>
                          </div>
                      </div>
                  </form>
              </div>
              //<forgottenPassword />
        );
    }
});
