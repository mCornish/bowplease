AuthenticatedNav = React.createClass({
    beginSubmit() {
        Modules.client.nav.beginSubmit();
    },
    trackClick( e ) {
        Modules.client.nav.trackClick( e );
    },
    render() {
        return (
            <nav className="menu row" role="navigation">
                <div className="container">
                    <div className="col-xs-12">
                        <div className="row">
                            <a className="menu__button button col-xs-3 {FlowHelpers.currentRoute( 'home' )}" href="/"
                            data-page="Home" onClick={this.trackClick}>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <i className="fa fa-home"></i>
                                    </div>
                                    <span className="col-xs-12">Home</span>
                                </div>
                            </a>
                            <div className="menu__button button col-xs-3 {FlowHelpers.currentRoute( 'submit' )}" data-page="Submit" onClick={this.trackClick}>
                                <label htmlFor="image" className="row">
                                    <div className="col-xs-12">
                                        <i className="fa fa-camera"></i>
                                    </div>
                                    <span className="col-xs-12">Submit</span>
                                </label>
                                <input id="image" className="file-input" name="image" placeholder="Image" type="file" onChange={this.beginSubmit} />
                            </div>
                            <a className="menu__button button col-xs-3 {FlowHelpers.currentRoute( 'trending' )}" href="/trending"
                            data-page="Trending" onClick={this.trackClick}>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <i className="fa fa-bar-chart"></i>
                                    </div>
                                    <span className="col-xs-12">Trending</span>
                                </div>
                            </a>
                            <a className="menu__button button col-xs-3 {FlowHelpers.currentRoute( 'me' )}" href="/me"
                            data-page="Me" onClick={this.trackClick}>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <i className="fa fa-user"></i>
                                    </div>
                                    <span className="col-xs-12">Me</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
});
