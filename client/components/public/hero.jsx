Hero = React.createClass({
    getInitialState() {
        return {
            loggingIn: false
        }
    },
    renderLoginForm() {
        if (this.state.loggingIn) {
            <div className="home__login-form is-rotated" data-hook="login">
                <Login />
            </div>
        }
    },
    toggleLogin() {
        if (this.state.loggingIn) {
            this.setState({ loggingIn: false });
            Modules.client.hero.hideLogin();
        } else {
            this.setState({ loggingIn: true });
            Modules.client.hero.showLogin();
        }

    },
    render() {
        return (
            <div className="hero">
                <div className="home__background parallax__layer parallax__layer--back">
                    <div className="home__filter"></div>
                </div>
                <div className="parallax__layer parallax__layer--base">
                    <div className="home__hero">
                        <div className="home__head">
                            <div className="container">
                                <h1 className="home__logo"><a href="/" data-hook="close-login">BP</a></h1>

                                <div className="home__login" data-hook="login-container">
                                    <button className="button" type="button" onClick={this.toggleLogin()}>Login / Register</button>
                                </div>
                            </div>
                        </div>
                        <div className="home__hero-text">
                            <div className="container">
                                <div className="home__headline is-unrotating" data-hook="headline-text">
                                    <div className="row">
                                        <h1 className="home__header col-xs-12 text-center">GIVE SOMETHING SPECTACULAR</h1>

                                        <h2 className="home__subheader col-xs-12 text-center">Find the gift that will show
                                            how much you care</h2>
                                    </div>
                                    <div className="row row--margin">
                                        <homeform />
                                    </div>
                                </div>
                                {this.renderLoginForm()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
