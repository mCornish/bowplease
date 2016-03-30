ForgottenPassword = React.createClass({
    componentDidMount() {
        Modules.client.forgPass.sendEmail( { form: "[data-hook=forg-pass]" } );
    },
    handleSubmit( e ) {
        e.preventDefault();
    },
    goBack() {
        Modules.client.forgPass.goBack();
    },
    render() {
        return (
            <div className="row" data-hook="password-form">
                <div className="col-xs-12 col-md-6 col-md-offset-3">
                    <a className="login__link" onClick={this.goBack}><i className="fa fa-angle-left"> Back to Login</i></a>
                    <div className="row row--margin">
                        <h2 className="text-center">What is your email address?</h2>
                        <form data-hook="forg-pass" onSubmit={this.handleSubmit}>
                            <div className="col-xs-12">
                                <input className="col-xs-12" name="email" data-hook="email" type="email" autocapitalize="off" autocorrect="off" autocomplete="email" placeholder="Email" required/>
                            </div>
                            <div className="col-xs-12">
                                <div className="row row--margin">
                                    <div className="col-xs-12">
                                        <button className="button button--submit col-xs-12" type="submit">Email Me</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});
