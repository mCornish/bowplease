import React from 'react';
import HomeForm from '../../../ui/components/public/home_form'

export default Hero = React.createClass({
    getInitialState() {
        return {
            loggingIn: false
        }
    },
    renderLoginForm() {
        if (this.state.loggingIn) {
            return (
                <div className="home__login-form is-rotated" data-hook="login">
                    <Authenticate />
                </div>
            );
        }
    },
    toggleLogin() {
        if (this.state.loggingIn) {
            Modules.client.hero.hideLogin( this );
        } else {
            Modules.client.hero.showLogin( this );
        }
    },
    render() {
        return (
            <div className="home__hero">
                <div className="home__head">
                    <div className="container">
                        <h1 className="home__logo"><a href="/" onClick={this.toggleLogin}>BP</a></h1>

                        <div className="home__login-button" data-hook="login-container">
                            <button className="button" type="button" onClick={this.toggleLogin}>Login / Register</button>
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
                                <HomeForm />
                            </div>
                        </div>
                        {this.renderLoginForm()}
                    </div>
                </div>
            </div>
        );
    }
});
